class AccessoryManager {
    constructor() {
        if (AccessoryManager.instance) {
            return AccessoryManager.instance;
        }
        AccessoryManager.instance = this;
        this.initialized = false;
        this.pet = null;
        this.selectors = {
            hat: "#hatSelect",
            necklace: "#necklaceSelect",
            jacket: "#jacketSelect",
        };

        // Add queue system
        this.accessoryQueue = [];
        this.lastChangeTime = 0;
        this.cooldownPeriod = 6000; // 6 seconds cooldown
        this.processingQueue = false;
    }

    initialize(pet) {
        if (this.initialized) {
            console.log("AccessoryManager already initialized");
            return;
        }

        this.pet = pet;
        this.initializeSelects();
        this.setupEventListeners();
        this.initialized = true;
        console.log("AccessoryManager initialized");

        // Start queue processing
        this.processQueueInterval = setInterval(() => this.processQueue(), 100);
    }

    async processQueue() {
        if (this.processingQueue || this.accessoryQueue.length === 0) {
            return;
        }

        const now = Date.now();
        if (now - this.lastChangeTime < this.cooldownPeriod) {
            return;
        }

        this.processingQueue = true;

        try {
            const change = this.accessoryQueue.shift();
            const response = this.pet.equip(change.type, change.accessoryId);

            if (response) {
                if (window.PigeonReactions) {
                    const reaction =
                        window.PigeonReactions.getAccessoryReaction(
                            change.type,
                            change.accessoryId,
                        );
                    console.log(`Showing ${change.type} reaction: ${reaction}`);
                    await this.pet.showReaction(reaction);
                }
                this.updateUI();
                this.lastChangeTime = now;
            } else {
                console.log(`Failed to equip ${change.type}, skipping`);
            }
        } catch (error) {
            console.error("Error processing accessory queue:", error);
        } finally {
            this.processingQueue = false;
        }
    }

    queueAccessoryChange(type, accessoryId, isUserAction = false) {
        if (isUserAction) {
            // Clear any pending autonomous changes for this slot
            this.accessoryQueue = this.accessoryQueue.filter(
                (change) => !(change.type === type && !change.isUserAction),
            );
            // Process user action immediately
            this.processUserAction(type, accessoryId);
        } else {
            this.accessoryQueue.push({ type, accessoryId, isUserAction });
        }
    }

    async processUserAction(type, accessoryId) {
        console.log(
            `Processing immediate user action: ${type} -> ${accessoryId}`,
        );
        const response = this.pet.equip(type, accessoryId);

        if (response) {
            if (window.PigeonReactions) {
                const reaction = window.PigeonReactions.getAccessoryReaction(
                    type,
                    accessoryId,
                );
                console.log(`Showing ${type} reaction: ${reaction}`);
                await this.pet.showReaction(reaction);
            }
            this.updateUI();
            this.lastChangeTime = Date.now();
        } else {
            console.log(`Failed to equip ${type}`);
        }
    }

    async handleAccessoryChange(type, select) {
        const newValue = select.value;
        const previousValue = this.pet.accessories[type];

        console.log(
            `${type} change attempted: ${previousValue} -> ${newValue}`,
        );

        if (previousValue === newValue) {
            console.log(`No change in ${type} value, ignoring`);
            return;
        }

        // Queue the change as a user action
        this.queueAccessoryChange(type, newValue, true);
    }

    setupEventListeners() {
        Object.entries(this.selectors).forEach(([type, selector]) => {
            const select = document.querySelector(selector);
            if (select) {
                // Remove any existing event listeners
                const newSelect = select.cloneNode(true);
                select.parentNode.replaceChild(newSelect, select);

                // Add new event listener
                newSelect.addEventListener("change", () =>
                    this.handleAccessoryChange(type, newSelect),
                );
                console.log(`Event listener added for ${type} select`);
            }
        });
    }

    getAccessoryPixels(type) {
        const accessoryId = this.pet.accessories[type];
        if (!accessoryId) return [];

        const category = type + "s";
        const accessory = this.pet.availableAccessories[category]?.find(
            (a) => a.id === accessoryId,
        );
        return accessory ? accessory.pixels : [];
    }

    getAllAccessoryPixels() {
        const pixels = {
            hat: this.getAccessoryPixels("hat"),
            necklace: this.getAccessoryPixels("necklace"),
            jacket: this.getAccessoryPixels("jacket"),
        };
        return pixels;
    }

    updateUI() {
        Object.entries(this.selectors).forEach(([type, selector]) => {
            const select = document.querySelector(selector);
            if (select) {
                select.value = this.pet.accessories[type] || "";
            }
        });

        // Update stats display
        const hungerStat = document.getElementById("hungerStat");
        const energyStat = document.getElementById("energyStat");
        const happinessStat = document.getElementById("happinessStat");
        const tempStat = document.getElementById("tempStat");

        try {
            if (hungerStat)
                hungerStat.textContent = Math.round(this.pet.stats.hunger);
            if (energyStat)
                energyStat.textContent = Math.round(this.pet.stats.energy);
            if (happinessStat)
                happinessStat.textContent = Math.round(
                    this.pet.stats.happiness,
                );
            if (tempStat && this.pet.weather?.temperature !== null) {
                tempStat.textContent = Math.round(this.pet.weather.temperature);
            }
        } catch (error) {
            console.error("Error updating stats display:", error);
        }
    }

    initializeSelects() {
        Object.entries(this.selectors).forEach(([type, selector]) => {
            const select = document.querySelector(selector);
            if (!select) {
                console.error(
                    `Select element not found for ${type}:`,
                    selector,
                );
                return;
            }

            // Clear existing options except "None"
            while (select.options.length > 1) {
                select.remove(1);
            }

            // Add new options
            const accessories = this.pet.availableAccessories[type + "s"];
            if (accessories) {
                accessories.forEach((accessory) => {
                    const option = document.createElement("option");
                    option.value = accessory.id;
                    option.textContent = `${accessory.name}${accessory.season ? ` (${accessory.season})` : ""}`;
                    select.appendChild(option);
                });
                console.log(`Added ${accessories.length} options for ${type}`);
            }

            // Set current value
            select.value = this.pet.accessories[type] || "";
            console.log(`Initialized ${type} select with value:`, select.value);
        });
    }
}

// Create and export singleton instance
window.accessoryManager = new AccessoryManager();
