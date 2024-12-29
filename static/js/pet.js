class Pet {
    constructor() {
        this.stats = {
            hunger: 100,
            energy: 100,
            happiness: 100,
        };
        this.state = "idle";
        this.lastUpdate = Date.now();
        this.accessories = {
            hat: null,
            necklace: null,
            jacket: null,
        };
        this.lastAction = {
            type: null,
            time: 0,
            isAutonomous: false, // Added to track autonomous actions
        };
        this.autonomousMode = true;
        this.actionCooldown = 10000;

        // Add reaction queue
        this.reactionQueue = [];
        this.isProcessingReaction = false;

        this.availableAccessories = {
            hats: [
                {
                    id: "tophat",
                    name: "Top Hat",
                    pixels: [
                        [-1, -9, "#333333"],
                        [0, -9, "#333333"],
                        [1, -9, "#333333"],
                        [-2, -8, "#333333"],
                        [-1, -8, "#333333"],
                        [0, -8, "#333333"],
                        [1, -8, "#333333"],
                        [2, -8, "#333333"],
                    ],
                    season: "formal",
                },
                {
                    id: "bow",
                    name: "Bow",
                    pixels: [
                        [-1, -8, "#FF69B4"],
                        [1, -8, "#FF69B4"],
                        [0, -9, "#FF69B4"],
                    ],
                    season: "formal",
                },
                {
                    id: "sunhat",
                    name: "Sun Hat",
                    pixels: [
                        [-2, -9, "#FFE4C4"],
                        [-1, -9, "#FFE4C4"],
                        [0, -9, "#FFE4C4"],
                        [1, -9, "#FFE4C4"],
                        [2, -9, "#FFE4C4"],
                        [-3, -8, "#FFE4C4"],
                        [-2, -8, "#FFE4C4"],
                        [-1, -8, "#FFE4C4"],
                        [0, -8, "#FFE4C4"],
                        [1, -8, "#FFE4C4"],
                        [2, -8, "#FFE4C4"],
                        [3, -8, "#FFE4C4"],
                    ],
                    season: "summer",
                    weatherBonus: { clear: 15, partly_cloudy: 10 },
                },
                {
                    id: "woolhat",
                    name: "Wool Hat",
                    pixels: [
                        [-1, -9, "#8B4513"],
                        [0, -9, "#8B4513"],
                        [1, -9, "#8B4513"],
                        [-2, -8, "#8B4513"],
                        [-1, -8, "#8B4513"],
                        [0, -8, "#8B4513"],
                        [1, -8, "#8B4513"],
                        [2, -8, "#8B4513"],
                    ],
                    season: "winter",
                    weatherBonus: { snow: 20, clear: 15 },
                },
            ],
            necklaces: [
                {
                    id: "bowtie",
                    name: "Bow Tie",
                    pixels: [
                        [0, -4, "#FF0000"],
                        [-1, -3, "#FF0000"],
                        [1, -3, "#FF0000"],
                    ],
                    season: "formal",
                },
                {
                    id: "pendant",
                    name: "Pendant",
                    pixels: [[0, -3, "#FFD700"]],
                    season: "formal",
                },
                {
                    id: "scarf",
                    name: "Warm Scarf",
                    pixels: [
                        [-1, -4, "#FF6B6B"],
                        [0, -4, "#FF6B6B"],
                        [1, -4, "#FF6B6B"],
                        [0, -3, "#FF6B6B"],
                        [1, -3, "#FF6B6B"],
                    ],
                    season: "winter",
                    weatherBonus: { snow: 15, clear: 10 },
                },
            ],
            jackets: [
                {
                    id: "winter_jacket",
                    name: "Winter Jacket",
                    pixels: [
                        // Body of jacket (warm brown color)
                        [-3, -2, "#8B4513"],
                        [-2, -2, "#8B4513"],
                        [-1, -2, "#8B4513"],
                        [0, -2, "#8B4513"],
                        [1, -2, "#8B4513"],
                        [2, -2, "#8B4513"],
                        [3, -2, "#8B4513"],
                        [-3, -1, "#8B4513"],
                        [-2, -1, "#8B4513"],
                        [-1, -1, "#8B4513"],
                        [0, -1, "#8B4513"],
                        [1, -1, "#8B4513"],
                        [2, -1, "#8B4513"],
                        [3, -1, "#8B4513"],
                        [-3, 0, "#8B4513"],
                        [-2, 0, "#8B4513"],
                        [-1, 0, "#8B4513"],
                        [0, 0, "#8B4513"],
                        [1, 0, "#8B4513"],
                        [2, 0, "#8B4513"],
                        [3, 0, "#8B4513"],
                        // Jacket collar (slightly darker)
                        [-2, -3, "#654321"],
                        [-1, -3, "#654321"],
                        [1, -3, "#654321"],
                        [2, -3, "#654321"],
                    ],
                    season: "winter",
                    weatherBonus: { snow: 25, clear: 20 },
                },
                {
                    id: "rain_jacket",
                    name: "Rain Jacket",
                    pixels: [
                        // Body of jacket (yellow color)
                        [-3, -2, "#FFD700"],
                        [-2, -2, "#FFD700"],
                        [-1, -2, "#FFD700"],
                        [0, -2, "#FFD700"],
                        [1, -2, "#FFD700"],
                        [2, -2, "#FFD700"],
                        [3, -2, "#FFD700"],
                        [-3, -1, "#FFD700"],
                        [-2, -1, "#FFD700"],
                        [-1, -1, "#FFD700"],
                        [0, -1, "#FFD700"],
                        [1, -1, "#FFD700"],
                        [2, -1, "#FFD700"],
                        [3, -1, "#FFD700"],
                        [-3, 0, "#FFD700"],
                        [-2, 0, "#FFD700"],
                        [-1, 0, "#FFD700"],
                        [0, 0, "#FFD700"],
                        [1, 0, "#FFD700"],
                        [2, 0, "#FFD700"],
                        [3, 0, "#FFD700"],
                        // Hood outline
                        [-2, -3, "#FFC500"],
                        [-1, -3, "#FFC500"],
                        [1, -3, "#FFC500"],
                        [2, -3, "#FFC500"],
                    ],
                    season: "spring",
                    weatherBonus: { rain: 25, storm: 20 },
                },
                {
                    id: "light_jacket",
                    name: "Light Summer Jacket",
                    pixels: [
                        // Light and breezy jacket
                        [-2, -2, "#E6E6FA"],
                        [-1, -2, "#E6E6FA"],
                        [0, -2, "#E6E6FA"],
                        [1, -2, "#E6E6FA"],
                        [2, -2, "#E6E6FA"],
                        [-2, -1, "#E6E6FA"],
                        [-1, -1, "#E6E6FA"],
                        [0, -1, "#E6E6FA"],
                        [1, -1, "#E6E6FA"],
                        [2, -1, "#E6E6FA"],
                    ],
                    season: "summer",
                    weatherBonus: { clear: 15, partly_cloudy: 10 },
                },
            ],
        };

        this.weatherSequence = [
            { condition: "clear", tempRange: [-5, 15] },
            { condition: "partly_cloudy", tempRange: [10, 25] },
            { condition: "cloudy", tempRange: [15, 25] },
            { condition: "rain", tempRange: [10, 20] },
            { condition: "storm", tempRange: [15, 30] },
            { condition: "snow", tempRange: [-10, 5] },
        ];
        this.currentWeatherIndex = 0;
        this.weather = {
            temperature: this.getRandomTemp(this.weatherSequence[0].tempRange),
            condition: this.weatherSequence[0].condition,
            lastUpdate: Date.now(),
            lastWeatherChange: Date.now(),
        };

        this.loadState();
        setInterval(() => this.updateWeather(), 20000);

        this.moodStates = {
            excellent: {
                emoji: "🥰",
                messages: [
                    "Your pigeon is absolutely delighted!",
                    "Cooing with pure joy!",
                    "Living their best pigeon life!",
                ],
            },
            happy: {
                emoji: "😊",
                messages: [
                    "Your pigeon is quite content!",
                    "Happily pecking around!",
                    "Having a wonderful time!",
                ],
            },
            neutral: {
                emoji: "😐",
                messages: [
                    "Your pigeon is doing okay.",
                    "Just another day in pigeon life.",
                    "Could use some attention...",
                ],
            },
            unhappy: {
                emoji: "😢",
                messages: [
                    "Your pigeon is feeling a bit down.",
                    "Could use some care and attention.",
                    "Needs some cheering up!",
                ],
            },
            miserable: {
                emoji: "😭",
                messages: [
                    "Your pigeon really needs help!",
                    "Please take care of me!",
                    "Emergency pigeon care needed!",
                ],
            },
        };

        // Add debug flag for logging
        this.debug = true;
        this.log("Pet initialized");
    }

    getRandomTemp([min, max]) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    log(message) {
        if (this.debug) {
            console.log(`[Pet ${new Date().toISOString()}] ${message}`);
        }
    }

    // Improved tooltip management
    async showTooltip(message, duration = 3000, priority = "normal") {
        console.log({
            message,
            duration,
            priority,
        });
        const tooltip = document.querySelector(".tooltip");
        if (!tooltip) {
            this.log("Warning: Tooltip element not found");
            return;
        }
        // do not interuppt existing tooltip
        if (tooltip.classList.contains("show") && priority === "normal") {
            return;
        }

        this.log(`Showing tooltip: ${message}`);

        // Clear any existing show class and timeout
        tooltip.classList.remove("show");
        tooltip.innerHTML = message;

        // Force a reflow to ensure the removal is processed
        void tooltip.offsetWidth;
        if (priority === "high") {
            tooltip.classList.add("show");
            tooltip.classList.add("message-high-priority");
        } else {
            tooltip.classList.add("show");
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                tooltip.classList.remove("show");
                tooltip.classList.remove("message-high-priority");

                this.log("Tooltip hidden");
                resolve();
            }, duration);
        });
    }

    updateWeather() {
        this.currentWeatherIndex =
            (this.currentWeatherIndex + 1) % this.weatherSequence.length;
        const newWeather = this.weatherSequence[this.currentWeatherIndex];

        const oldCondition = this.weather.condition;
        const oldTemp = this.weather.temperature;

        this.weather = {
            temperature: this.getRandomTemp(newWeather.tempRange),
            condition: newWeather.condition,
            lastUpdate: Date.now(),
            lastWeatherChange: Date.now(),
        };

        let weatherResponse = this.getWeatherResponse(oldCondition, oldTemp);
        this.showTooltip(weatherResponse);
        this.saveState();
    }

    getWeatherResponse(oldCondition, oldTemp) {
        const condition = this.weather.condition;
        const temp = this.weather.temperature;

        // Get contextual weather reaction
        let message = PigeonReactions.getWeatherReaction(condition, this.stats);

        // Add temperature change context
        if (oldTemp) {
            const tempDiff = temp - oldTemp;
            if (Math.abs(tempDiff) > 5) {
                message +=
                    tempDiff > 0
                        ? "\nIt's getting warmer! 📈"
                        : "\nBrr... it's getting colder! 📉";
            }
        }

        // Add accessory suggestions based on weather
        if (condition === "snow" && !this.accessories.jacket) {
            message += "\nMaybe a warm jacket would help?";
        } else if (condition === "rain" && !this.accessories.jacket) {
            message += "\nA rain jacket would keep your pigeon dry!";
        } else if (
            condition === "clear" &&
            temp > 25 &&
            !this.accessories.hat
        ) {
            message += "\nA sun hat would be nice in this heat!";
        }

        return message;
    }

    getContextualResponse(action) {
        const avgStats =
            (this.stats.hunger + this.stats.energy + this.stats.happiness) / 3;
        let intensity;

        this.log(
            `Getting contextual response for action: ${action}, avgStats: ${avgStats}`,
        );

        switch (action) {
            case "feed":
                if (this.stats.hunger < 30) intensity = "hungry";
                else if (this.stats.hunger < 90) intensity = "satisfied";
                else intensity = "full";
                break;
            case "sleep":
                if (this.stats.energy < 30) intensity = "exhausted";
                else if (this.stats.energy < 90) intensity = "tired";
                else intensity = "energetic";
                break;
            case "clean":
                if (this.stats.happiness < 40) intensity = "dirty";
                else if (this.stats.happiness < 80) intensity = "normal";
                else intensity = "clean";
                break;
            case "coo":
                if (avgStats > 70) intensity = "happy";
                else if (avgStats > 40) intensity = "neutral";
                else intensity = "sad";
                break;
            case "hunt":
                if (this.stats.hunger < 50) intensity = "eager";
                else if (this.stats.energy < 50) intensity = "tired";
                else intensity = "playful";
                break;
        }

        const response = PigeonReactions.getActivityReaction(action, intensity);
        this.log(`Generated response: ${response}`);
        return response;
    }

    saveState() {
        localStorage.setItem(
            "petStats",
            JSON.stringify({
                stats: this.stats,
                accessories: this.accessories,
                weather: this.weather,
            }),
        );
    }

    loadState() {
        const savedState = localStorage.getItem("petStats");
        if (savedState) {
            const state = JSON.parse(savedState);
            this.stats = state.stats || this.stats;
            this.accessories = state.accessories || this.accessories;
            this.weather = state.weather || this.weather;
        }
    }

    calculateSeasonalBonuses() {
        let bonuses = {
            happiness: 0,
            energy: 0,
        };

        for (const [slot, accessoryId] of Object.entries(this.accessories)) {
            if (accessoryId) {
                const category = slot + "s";
                const accessory = this.availableAccessories[category]?.find(
                    (a) => a.id === accessoryId,
                );

                if (accessory?.weatherBonus?.[this.weather.condition]) {
                    const bonus =
                        accessory.weatherBonus[this.weather.condition];
                    bonuses.happiness += bonus * 0.5;
                    bonuses.energy += bonus * 0.3;
                }
            }
        }

        return bonuses;
    }

    updateStats() {
        const now = Date.now();
        const timeDiff = (now - this.lastUpdate) / 1000;

        const bonuses = this.calculateSeasonalBonuses();

        this.stats.hunger = Math.max(0, this.stats.hunger - timeDiff * 0.1);
        this.stats.energy = Math.max(
            0,
            Math.min(100, this.stats.energy - timeDiff * 0.05 + bonuses.energy),
        );
        this.stats.happiness = Math.max(
            0,
            Math.min(
                100,
                this.stats.happiness - timeDiff * 0.03 + bonuses.happiness,
            ),
        );

        if (
            !this.weather.lastWeatherChange ||
            now - this.weather.lastWeatherChange >= 20000
        ) {
            this.updateWeather();
        }

        this.autonomousAction();

        this.lastUpdate = now;
        this.saveState();
    }

    equip(slot, accessoryId) {
        this.log(`Attempting to equip ${accessoryId} in slot ${slot}`);

        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log(
                `Cannot equip - pet is not idle (current state: ${this.state})`,
            );
            return false;
        }

        if (accessoryId === "") {
            this.log(`Removing accessory from ${slot}`);
            this.accessories[slot] = null;
            this.saveState();
            return true;
        }

        const category = slot + "s";
        const accessory = this.availableAccessories[category]?.find(
            (a) => a.id === accessoryId,
        );
        if (accessory) {
            this.log(`Successfully equipped ${accessory.name} in ${slot}`);
            this.accessories[slot] = accessoryId;
            this.saveState();
            return true;
        }

        this.log(`Failed to equip - accessory not found: ${accessoryId}`);
        return false;
    }

    unequip(slot) {
        if (this.state !== "idle") return false;
        if (this.accessories[slot] !== null) {
            this.accessories[slot] = null;
            this.saveState();
            return `The pigeon looks more natural without the ${slot}`;
        }
        return false;
    }

    getEquippedAccessories() {
        if (!window.accessoryManager) {
            console.error("AccessoryManager not initialized");
            return {};
        }
        return window.accessoryManager.getAllAccessoryPixels();
    }

    getAccessoryById(slot, id) {
        const category = slot + "s";
        return this.availableAccessories[category]?.find((a) => a.id === id);
    }

    async addReaction(
        action,
        duration,
        soundCallback,
        message,
        priority = "normal",
    ) {
        // Clear existing reactions for immediate response
        if (action !== "idle") {
            this.reactionQueue = [];
            this.isProcessingReaction = false;
        }

        this.log(`Adding reaction: ${action} with message: ${message}`);

        // Set state immediately for user-triggered actions
        this.state = action;

        // Create the reaction object
        const reaction = {
            action,
            duration: duration || 3000, // Default duration
            soundCallback,
            message,
            priority,
            timestamp: Date.now(),
        };

        // Play sound immediately if available
        if (soundCallback) {
            try {
                await soundCallback();
            } catch (error) {
                console.error("Error playing sound:", error);
            }
        }

        this.reactionQueue.push(reaction);

        if (!this.isProcessingReaction) {
            await this.processNextReaction();
        }

        return true;
    }

    async processNextReaction() {
        if (this.reactionQueue.length === 0) {
            this.log("Reaction queue empty, returning to idle state");
            this.isProcessingReaction = false;
            this.state = "idle";
            return;
        }

        this.isProcessingReaction = true;
        const reaction = this.reactionQueue.shift();

        this.log(
            `Processing reaction: ${reaction.action}, Queue length: ${this.reactionQueue.length}`,
        );

        try {
            // Show message if available
            if (reaction.message) {
                this.log(`Showing reaction message: ${reaction.message}`);
                await this.showTooltip(
                    reaction.message,
                    reaction.duration,
                    reaction.priority,
                );
            }

            // Wait for animation duration
            this.log(`Waiting for animation duration: ${reaction.duration}ms`);
            await new Promise((resolve) =>
                setTimeout(resolve, reaction.duration),
            );
        } catch (error) {
            this.log(`Error processing reaction: ${error.message}`);
            console.error("Error processing reaction:", error);
        } finally {
            this.state = "idle";
            this.isProcessingReaction = false;
        }

        // Process next reaction in queue
        await this.processNextReaction();
    }

    async showReaction(message) {
        if (!message) {
            this.log("No reaction message provided");
            return false;
        }

        this.log(`Showing reaction: ${message}`);
        try {
            // Add reaction to queue with a standard duration
            await this.addReaction("idle", 3000, null, message);
            this.log("Reaction added successfully");
            return true;
        } catch (error) {
            this.log(`Error showing reaction: ${error.message}`);
            console.error("Error in showReaction:", error);
            return false;
        }
    }

    async feed() {
        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log("Cannot feed - pet is busy");
            return false;
        }

        const response = this.getContextualResponse("feed");
        this.stats.hunger = Math.min(100, this.stats.hunger + 30);
        this.stats.happiness = Math.min(100, this.stats.happiness + 10);
        this.saveState();

        // Set lastAction immediately for user-triggered action
        this.lastAction = {
            type: "feed",
            time: Date.now(),
            isAutonomous: false,
        };

        const success = await this.addReaction(
            "eating",
            3000,
            async () => await window.petSounds?.playEating(),
            response,
        );

        return success ? response : false;
    }

    async sleep() {
        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log("Cannot sleep - pet is busy");
            return false;
        }

        const response = this.getContextualResponse("sleep");
        this.stats.energy = Math.min(100, this.stats.energy + 50);
        this.saveState();

        // Set lastAction immediately for user-triggered action
        this.lastAction = {
            type: "sleep",
            time: Date.now(),
            isAutonomous: false,
        };

        const success = await this.addReaction(
            "sleeping",
            5000,
            async () => await window.petSounds?.playSleeping(),
            response,
        );

        return success ? response : false;
    }

    async clean() {
        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log("Cannot clean - pet is busy");
            return false;
        }

        const response = this.getContextualResponse("clean");
        this.stats.happiness = Math.min(100, this.stats.happiness + 20);
        this.saveState();

        // Set lastAction immediately for user-triggered action
        this.lastAction = {
            type: "clean",
            time: Date.now(),
            isAutonomous: false,
        };

        const success = await this.addReaction(
            "cleaning",
            2000,
            async () => await window.petSounds?.playCleaning(),
            response,
        );

        return success ? response : false;
    }

    async coo() {
        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log("Cannot coo - pet is busy");
            return false;
        }

        const response = this.getContextualResponse("coo");
        this.stats.happiness = Math.min(100, this.stats.happiness + 15);
        this.stats.energy = Math.max(0, this.stats.energy - 10);
        this.saveState();

        // Set lastAction immediately for user-triggered action
        this.lastAction = {
            type: "coo",
            time: Date.now(),
            isAutonomous: false,
        };

        const success = await this.addReaction(
            "cooing",
            2000,
            async () => await window.petSounds?.playCoo(),
            response,
        );

        return success ? response : false;
    }

    async hunt() {
        if (this.state !== "idle" && !this.isProcessingReaction) {
            this.log("Cannot hunt - pet is busy");
            return false;
        }

        const response = this.getContextualResponse("hunt");
        this.stats.hunger = Math.min(100, this.stats.hunger + 40);
        this.stats.energy = Math.max(0, this.stats.energy - 30);
        this.stats.happiness = Math.min(100, this.stats.happiness + 25);
        this.saveState();

        // Set lastAction immediately for user-triggered action
        this.lastAction = {
            type: "hunt",
            time: Date.now(),
            isAutonomous: false,
        };

        const success = await this.addReaction(
            "hunting",
            4000,
            async () => await window.petSounds?.playHunting(),
            response,
        );

        return success ? response : false;
    }

    getMood() {
        const avgStats =
            (this.stats.hunger + this.stats.energy + this.stats.happiness) / 3;

        let moodState;
        if (avgStats >= 90) {
            moodState = "excellent";
        } else if (avgStats >= 70) {
            moodState = "happy";
        } else if (avgStats >= 50) {
            moodState = "neutral";
        } else if (avgStats >= 30) {
            moodState = "unhappy";
        } else {
            moodState = "miserable";
        }

        const mood = this.moodStates[moodState];
        const message =
            mood.messages[Math.floor(Math.random() * mood.messages.length)];

        return {
            state: moodState,
            emoji: mood.emoji,
            message: message,
            reasons: this.getMoodReasons(),
        };
    }

    getMoodReasons() {
        const reasons = [];

        if (this.stats.hunger < 50) {
            reasons.push("Feeling hungry");
        }
        if (this.stats.energy < 50) {
            reasons.push("Tired");
        }
        if (this.stats.happiness < 50) {
            reasons.push("Needs more fun");
        }

        return reasons;
    }

    async autonomousAction() {
        if (!this.autonomousMode || this.state !== "idle") return null;

        try {
            const now = Date.now();
            const AUTONOMOUS_COOLDOWN = 6000; // 6 seconds cooldown

            // Check if we're still in cooldown period after a user action
            if (
                this.lastAction.time &&
                now - this.lastAction.time < AUTONOMOUS_COOLDOWN
            ) {
                return null;
            }

            this.handleWeatherClothing();

            let response = null;

            if (this.stats.hunger < 70) {
                response = await this.hunt();
                if (response) {
                    this.lastAction = {
                        type: "hunt",
                        time: now,
                        isAutonomous: true,
                    };
                    return response;
                }
            }

            if (this.stats.energy < 70) {
                response = await this.sleep();
                if (response) {
                    this.lastAction = {
                        type: "sleep",
                        time: now,
                        isAutonomous: true,
                    };
                    return response;
                }
            }

            if (this.stats.happiness < 70) {
                response = await this.clean();
                if (response) {
                    this.lastAction = {
                        type: "clean",
                        time: now,
                        isAutonomous: true,
                    };
                    return response;
                }
            }

            if (
                this.stats.hunger >= 70 &&
                this.stats.energy >= 70 &&
                this.stats.happiness >= 70
            ) {
                const actions = [
                    this.hunt.bind(this),
                    this.sleep.bind(this),
                    this.clean.bind(this),
                    this.coo.bind(this),
                    () => this.randomizeAccessory(),
                ];

                const randomAction =
                    actions[Math.floor(Math.random() * actions.length)];
                response = await randomAction();
                if (response) {
                    this.lastAction = {
                        type: randomAction.name || "random",
                        time: now,
                        isAutonomous: true,
                    };
                    return response;
                }
            }

            return null;
        } catch (error) {
            console.error("Error in autonomous action:", error);
            return null;
        }
    }

    randomizeAccessory() {
        const slots = ["hat", "necklace", "jacket"];
        const randomSlot = slots[Math.floor(Math.random() * slots.length)];

        const category = randomSlot + "s";
        const accessories = this.availableAccessories[category];

        if (Math.random() < 0.2) {
            window.accessoryManager.queueAccessoryChange(randomSlot, "", false);
        } else {
            const randomAccessory =
                accessories[Math.floor(Math.random() * accessories.length)];
            window.accessoryManager.queueAccessoryChange(
                randomSlot,
                randomAccessory.id,
                false,
            );
        }
    }

    handleWeatherClothing() {
        if (this.state !== "idle") return;

        const weather = this.weather.condition;
        const temp = this.weather.temperature;

        const weatherClothing = {
            snow: {
                hat: "woolhat",
                necklace: "scarf",
                jacket: "winter_jacket",
            },
            rain: {
                jacket: "rain_jacket",
            },
            clear: {
                hat: temp > 20 ? "sunhat" : null,
                jacket: temp > 25 ? "light_jacket" : null,
            },
            partly_cloudy: {
                hat: temp > 20 ? "sunhat" : null,
                jacket: temp > 25 ? "light_jacket" : null,
            },
        };

        const recommendedClothing = weatherClothing[weather] || {};

        Object.entries(recommendedClothing).forEach(([slot, itemId]) => {
            if (this.accessories[slot] !== itemId) {
                window.accessoryManager.queueAccessoryChange(
                    slot,
                    itemId || "",
                    false,
                );
            }
        });
    }
}
