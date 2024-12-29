function initializeGame() {
    console.log("Initializing game...");
    // Initialize canvas and core objects
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }

    window.transactionMonitor = new TransactionMonitor();
    window.transactionMonitor.start();

    // Initialize transaction history
    window.transactionHistory = new TransactionHistory();

    try {
        // Initialize pet and animations only after canvas is confirmed
        console.log("Creating Pet and Animations instances...");
        const pet = new Pet();
        const animations = new PetAnimations(canvas);
        console.log("Pet and Animations created successfully");

        // Make pet globally available for transaction monitor
        window.pet = pet;

        // Initialize AccessoryManager with pet instance
        accessoryManager.initialize(pet);
        accessoryManager.initializeSelects();

        // Cache for mood state
        let cachedMood = null;
        let lastMoodUpdate = 0;
        const MOOD_UPDATE_INTERVAL = 20000; // Update mood every 20 seconds

        // Reset functionality
        let resetKeyPresses = [];
        const RESET_KEY_TIMEOUT = 1000; // 1 second window for triple press
        document.addEventListener("keydown", (event) => {
            if (event.key.toLowerCase() === "r") {
                const now = Date.now();
                resetKeyPresses = resetKeyPresses.filter(
                    (time) => now - time < RESET_KEY_TIMEOUT,
                );
                resetKeyPresses.push(now);

                if (resetKeyPresses.length >= 3) {
                    localStorage.clear();
                    pet.stats = {
                        hunger: 100,
                        energy: 100,
                        happiness: 100,
                    };
                    pet.accessories = {
                        hat: null,
                        necklace: null,
                        jacket: null,
                    };
                    pet.state = "idle";
                    pet.weather = {
                        temperature: pet.getRandomTemp([-5, 15]),
                        condition: "clear",
                        lastUpdate: Date.now(),
                        lastWeatherChange: Date.now(),
                    };
                    pet.saveState();
                    resetKeyPresses = [];
                    accessoryManager.updateUI();
                }
            }
        });

        // Button Controls with null checks
        document
            .getElementById("feedBtn")
            ?.addEventListener("click", async () => {
                const response = await pet.feed();
                if (response) {
                    accessoryManager.updateUI();
                }
            });

        document
            .getElementById("sleepBtn")
            ?.addEventListener("click", async () => {
                const response = await pet.sleep();
                if (response) {
                    accessoryManager.updateUI();
                }
            });

        document
            .getElementById("cleanBtn")
            ?.addEventListener("click", async () => {
                const response = await pet.clean();
                if (response) {
                    accessoryManager.updateUI();
                }
            });

        document
            .getElementById("roarBtn")
            ?.addEventListener("click", async () => {
                const response = await pet.coo();
                if (response) {
                    accessoryManager.updateUI();
                }
            });

        document
            .getElementById("huntBtn")
            ?.addEventListener("click", async () => {
                const response = await pet.hunt();
                if (response) {
                    accessoryManager.updateUI();
                }
            });

        function getMoodState() {
            try {
                const now = Date.now();
                if (
                    !cachedMood ||
                    now - lastMoodUpdate > MOOD_UPDATE_INTERVAL
                ) {
                    cachedMood = pet.getMood();
                    lastMoodUpdate = now;
                }
                return cachedMood;
            } catch (error) {
                console.error("Error in getMoodState: ", error);
                return {
                    state: "neutral",
                    emoji: "😐",
                    message: "Your pigeon is doing okay.",
                    reasons: [],
                };
            }
        }

        const moodInterval = setInterval(() => {
            try {
                getMoodState();
            } catch (error) {
                console.error("Error in moodInterval: ", error);
            }
        }, MOOD_UPDATE_INTERVAL);

        setTimeout(() => {
            try {
                getMoodState();
            } catch (error) {
                console.error("Error in initial tooltip: ", error);
            }
        }, 2000);

        let lastFrameTime = performance.now();
        async function gameLoop(currentTime) {
            try {
                const deltaTime = (currentTime - lastFrameTime) / 1000;
                lastFrameTime = currentTime;

                // Update pet stats and UI
                pet.updateStats();
                accessoryManager.updateUI();

                // Skip rendering if canvas or animations are not available
                if (!canvas || !animations) {
                    console.error("Canvas or animations not initialized");
                    requestAnimationFrame(gameLoop);
                    return;
                }

                // Clear canvas before drawing new frame
                animations.clear();

                // Draw weather effects
                if (pet.weather) {
                    animations.drawWeather(pet.weather);
                }

                // Handle different animation states
                switch (pet.state) {
                    case "idle":
                        animations.drawIdle(animations.frameCount, pet);
                        break;
                    case "eating":
                        animations.drawEating(animations.frameCount, pet);
                        break;
                    case "sleeping":
                        animations.drawSleeping(animations.frameCount, pet);
                        break;
                    case "cleaning":
                        animations.drawCleaning(animations.frameCount, pet);
                        break;
                    case "cooing":
                        animations.drawCooing(animations.frameCount, pet);
                        break;
                    case "hunting":
                        animations.drawHunting(animations.frameCount, pet);
                        break;
                    default:
                        console.warn(`Unknown pet state: ${pet.state}`);
                        animations.drawIdle(animations.frameCount, pet);
                        break;
                }

                animations.frameCount++;
            } catch (error) {
                console.error("Error in gameLoop:", error);
            }

            // Continue the animation loop
            requestAnimationFrame(gameLoop);
        }

        // Start the game loop
        requestAnimationFrame(gameLoop);
    } catch (error) {
        console.error("Error during game initialization:", error);
        const loadingScreen = document.createElement("div");
        loadingScreen.className = "loading-screen";
        loadingScreen.innerHTML = `
            <div style="text-align: center; color: var(--secondary-color);">
                <p>Error loading game resources.</p>
                <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 10px;">
                    Retry
                </button>
            </div>
        `;
        document.body.appendChild(loadingScreen);
        return;
    }
}

const loadGame = () => {
    // Hide the start button
    const startScreen = document.getElementById("start-screen");
    if (startScreen) {
        startScreen.style.display = "none";
    }

    document.getElementById("gcontainer").style.visibility = "hidden"; // Hide game container initially

    // Create loading screen
    const loadingScreen = document.createElement("div");
    loadingScreen.className = "loading-screen";
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    loadingScreen.appendChild(spinner);
    document.body.appendChild(loadingScreen);

    // Track required scripts
    const requiredScripts = [
        "pet.js",
        "animations.js",
        "sounds.js",
        "reactions.js",
        "accessoryManager.js",
        "transactionMonitor.js",
        "transactionHistory.js",
    ];
    const loadedScripts = new Set();

    // Function to check if all scripts are loaded
    function areAllScriptsLoaded() {
        return requiredScripts.every((script) => loadedScripts.has(script));
    }

    // Function to handle script load
    function handleScriptLoad(scriptName) {
        console.log(`Script loaded: ${scriptName}`);
        loadedScripts.add(scriptName);
        if (areAllScriptsLoaded()) {
            // Add a small delay to ensure everything is ready
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                // Remove loading screen after fade out animation
                setTimeout(() => {
                    loadingScreen.remove();
                    document.getElementById("gcontainer").style.visibility =
                        "inherit"; // Show game container after load
                    initializeGame();
                }, 500);
            }, 1000);
        }
    }

    // Load scripts dynamically in sequence
    async function loadScripts() {
        try {
            console.log("Starting script loading sequence...");
            // Wait for Tone.js to be ready
            if (typeof Tone === "undefined") {
                console.log("Waiting for Tone.js to load...");
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            console.log("Tone.js is ready");

            // Load scripts sequentially
            for (const script of requiredScripts) {
                try {
                    await loadScript(script);
                } catch (error) {
                    console.error(`Error loading script ${script}:`, error);
                    throw error;
                }
            }
        } catch (error) {
            console.error("Error loading scripts:", error);
            loadingScreen.innerHTML = `
                <div style="text-align: center; color: var(--secondary-color);">
                    <p>Error loading game resources.</p>
                    <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 10px;">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    // Load script helper function
    function loadScript(scriptName) {
        return new Promise((resolve, reject) => {
            console.log(`Loading script: ${scriptName}`);
            const script = document.createElement("script");
            script.src = `/static/js/${scriptName}`;
            script.onload = () => {
                handleScriptLoad(scriptName);
                resolve();
            };
            script.onerror = (error) => {
                console.error(`Error loading script ${scriptName}:`, error);
                reject(error);
            };
            document.head.appendChild(script);
        });
    }

    // Start loading scripts
    loadScripts();
};

// Wait for the start button click instead of auto-starting
document.getElementById("refresh")?.addEventListener("click", () => {
    loadGame();
});
