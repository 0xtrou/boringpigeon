class PetAnimations {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.frameCount = 0;

        // Set canvas size to match CSS width while maintaining pixel ratio
        const containerWidth = this.canvas.parentElement.clientWidth - 40; // Account for padding
        this.canvas.width = containerWidth;
        this.canvas.height = containerWidth;

        // Calculate pixel size based on canvas width
        this.pixelSize = Math.floor(containerWidth / 64); // 64 pixels across for good detail

        // Calculate center position
        this.centerX = Math.floor(containerWidth / (2 * this.pixelSize));
        this.centerY = Math.floor(containerWidth / (2 * this.pixelSize));

        this.colors = {
            body: "#C0C0C0",
            wing: "#A9A9A9",
            head: "#D3D3D3",
            beak: "#FFB6C1",
            eye: "#000000",
            white: "#FFFFFF",
            bug: "#8B4513",
            // Weather colors
            sun: "#FFD700",
            cloud: "#E6E6FA",
            rain: "#4682B4",
            snow: "#F0FFFF",
        };

        // Initialize weather particles
        this.weatherParticles = [];
        this.initWeatherParticles();

        // Initialize hunting-related properties with centered coordinates
        this.bugPosition = {
            x: this.centerX + Math.floor(Math.random() * 20 - 10),
            y: this.centerY + Math.floor(Math.random() * 20 - 10),
        };
        this.pigeonPosition = {
            x: this.centerX,
            y: this.centerY,
        };
        this.huntingState = "seeking";

        // Add resize handler
        window.addEventListener("resize", () => this.handleResize());
    }

    handleResize() {
        const containerWidth = this.canvas.parentElement.clientWidth - 40;
        this.canvas.width = containerWidth;
        this.canvas.height = containerWidth;
        this.pixelSize = Math.floor(containerWidth / 64);
        // Update center position on resize
        this.centerX = Math.floor(containerWidth / (2 * this.pixelSize));
        this.centerY = Math.floor(containerWidth / (2 * this.pixelSize));
        // Update pigeon position to new center
        if (this.huntingState === "seeking") {
            this.pigeonPosition = {
                x: this.centerX,
                y: this.centerY,
            };
        }
    }

    drawPixel(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize,
        );
    }

    initWeatherParticles() {
        // Create 50 particles for weather effects
        for (let i = 0; i < 50; i++) {
            this.weatherParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speed: 1 + Math.random() * 2,
                size: 1 + Math.random() * 2,
            });
        }
    }

    drawWeather(weather) {
        // Draw weather background effects based on condition
        switch (weather.condition) {
            case "clear":
                this.drawSun();
                break;
            case "cloudy":
                this.drawClouds();
                break;
            case "rain":
                this.drawRain();
                break;
            case "snow":
                this.drawSnow();
                break;
        }
    }

    drawSun() {
        const centerX = this.canvas.width * 0.8;
        const centerY = this.canvas.height * 0.2;
        const radius = 20;

        this.ctx.fillStyle = this.colors.sun;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawClouds() {
        this.ctx.fillStyle = this.colors.cloud;
        for (let cloud of this.weatherParticles.slice(0, 5)) {
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.size * 5, 0, Math.PI * 2);
            this.ctx.fill();

            // Move clouds slowly
            cloud.x = (cloud.x + cloud.speed * 0.1) % this.canvas.width;
        }
    }

    drawRain() {
        this.ctx.fillStyle = this.colors.rain;
        for (let drop of this.weatherParticles) {
            this.ctx.fillRect(drop.x, drop.y, 1, 5);

            // Move rain drops
            drop.y = (drop.y + drop.speed * 3) % this.canvas.height;
            if (drop.y === 0) {
                drop.x = Math.random() * this.canvas.width;
            }
        }
    }

    drawSnow() {
        this.ctx.fillStyle = this.colors.snow;
        for (let flake of this.weatherParticles) {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Move snowflakes
            flake.y = (flake.y + flake.speed) % this.canvas.height;
            flake.x += Math.sin(flake.y / 30) * 0.5;
            if (flake.y === 0) {
                flake.x = Math.random() * this.canvas.width;
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBug(x, y) {
        // Draw bug body
        this.drawPixel(x, y, this.colors.bug);
        this.drawPixel(x + 1, y, this.colors.bug);
        // Draw bug legs
        this.drawPixel(x, y + 1, this.colors.bug);
        this.drawPixel(x + 1, y - 1, this.colors.bug);
    }

    drawPigeonAtPosition(x, y, headBobOffset = 0, pet = null) {
        // Draw body pixels - made wider and rounder
        for (let i = -4; i <= 4; i++) {
            for (let j = -3; j <= 3; j++) {
                if (Math.abs(i) + Math.abs(j) <= 6) {
                    // Rounder body shape
                    this.drawPixel(x + i, y + j, this.colors.body);
                }
            }
        }

        // Draw head pixels - made bigger and rounder
        for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
                if (Math.abs(i) + Math.abs(j) <= 4) {
                    // Rounder head shape
                    this.drawPixel(
                        x + i,
                        y - 7 + j + headBobOffset,
                        this.colors.head,
                    );
                }
            }
        }

        // Draw bigger eyes
        this.drawPixel(x - 2, y - 8 + headBobOffset, this.colors.eye);
        this.drawPixel(x - 2, y - 7 + headBobOffset, this.colors.eye);
        this.drawPixel(x + 2, y - 8 + headBobOffset, this.colors.eye);
        this.drawPixel(x + 2, y - 7 + headBobOffset, this.colors.eye);

        // Add eye shine for cuteness
        this.drawPixel(x - 2, y - 8 + headBobOffset, this.colors.white);
        this.drawPixel(x + 2, y - 8 + headBobOffset, this.colors.white);

        // Draw beak
        this.drawPixel(x, y - 6 + headBobOffset, this.colors.beak);
        this.drawPixel(x, y - 5 + headBobOffset, this.colors.beak);

        // Draw equipped accessories if pet is provided
        if (pet && window.accessoryManager) {
            const accessoryPixels = pet.getEquippedAccessories();

            // Draw each type of accessory
            Object.entries(accessoryPixels).forEach(([type, pixels]) => {
                if (Array.isArray(pixels)) {
                    pixels.forEach(([px, py, color]) => {
                        if (
                            typeof px === "number" &&
                            typeof py === "number" &&
                            color
                        ) {
                            const finalX = x + px;
                            const finalY = y + py + headBobOffset;
                            this.drawPixel(finalX, finalY, color);
                        }
                    });
                }
            });
        } else {
            console.log("No accessories to render:", {
                hasPet: !!pet,
                hasAccessoryManager: !!window.accessoryManager,
            });
        }
    }

    drawIdle(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }

        // Add weather-based animations
        let headBob = Math.sin(frame * 0.1) * 1;
        let bodyOffset = 0;

        // Modify animation based on weather
        switch (pet.weather.condition) {
            case "rain":
            case "storm":
                bodyOffset = Math.sin(frame * 0.05) * 0.5;
                headBob *= 0.5;
                break;
            case "snow":
                bodyOffset = Math.sin(frame * 0.3) * 0.3;
                break;
            case "clear":
                headBob = Math.sin(frame * 0.15) * 1.2;
                break;
        }

        this.drawPigeonAtPosition(
            this.centerX,
            this.centerY + bodyOffset,
            headBob,
            pet,
        );

        // Draw weather-appropriate wing positions
        const wingOffset = Math.sin(frame * 0.05) * 0.5;
        if (
            pet.weather.condition === "rain" ||
            pet.weather.condition === "storm"
        ) {
            // Wings closer to body for protection
            for (let i = 0; i < 4; i++) {
                this.drawPixel(
                    this.centerX - 4 + i,
                    this.centerY + wingOffset,
                    this.colors.wing,
                );
                this.drawPixel(
                    this.centerX + 4 - i,
                    this.centerY + wingOffset,
                    this.colors.wing,
                );
            }
        } else {
            // Normal wing spread
            for (let i = 0; i < 6; i++) {
                this.drawPixel(
                    this.centerX - 6 + i,
                    this.centerY + wingOffset,
                    this.colors.wing,
                );
                this.drawPixel(
                    this.centerX + 6 - i,
                    this.centerY + wingOffset,
                    this.colors.wing,
                );
            }
        }
    }

    drawEating(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }
        this.drawPigeonAtPosition(this.centerX, this.centerY, 1, pet);
        const progress = (frame % 60) / 60; // Complete cycle every 60 frames
        const targetX = this.centerX; // Beak position X
        const targetY = this.centerY - 3; // Beak position Y
        this.bugPosition.x = this.centerX + 20 - 20 * progress; // Move from right to beak
        this.bugPosition.y = this.centerY + 11 - 11 * progress; // Move from bottom to beak
        if (progress < 0.9) {
            this.drawBug(
                Math.floor(this.bugPosition.x),
                Math.floor(this.bugPosition.y),
            );
        }
        const isPecking = frame % 20 < 10;
        if (isPecking) {
            this.drawPixel(this.centerX, this.centerY - 3, this.colors.beak);
            this.drawPixel(this.centerX, this.centerY - 2, this.colors.beak);
        }
    }

    drawSleeping(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }
        this.drawPigeonAtPosition(this.centerX, this.centerY, 0, pet);
        this.drawPixel(this.centerX - 2, this.centerY - 7, this.colors.body);
        this.drawPixel(this.centerX - 1, this.centerY - 7, this.colors.body);
        this.drawPixel(this.centerX + 1, this.centerY - 7, this.colors.body);
        this.drawPixel(this.centerX + 2, this.centerY - 7, this.colors.body);
        const zOffset = Math.floor(frame / 15) % 3;
        for (let i = 0; i < zOffset + 1; i++) {
            const x = this.centerX + 6 + i * 2;
            const y = this.centerY - 15 - i * 2;
            this.drawPixel(x, y, this.colors.eye);
            this.drawPixel(x - 1, y, this.colors.eye);
        }
    }

    drawCooing(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }
        this.drawPigeonAtPosition(this.centerX, this.centerY, 0, pet);
        const cooScale = 1 + Math.sin(frame * 0.2) * 0.3;
        for (let i = -4; i <= 4; i++) {
            for (let j = -3; j <= 3; j++) {
                const scale = Math.floor(j * cooScale);
                this.drawPixel(
                    this.centerX + i,
                    this.centerY + scale,
                    this.colors.body,
                );
            }
        }
        this.drawPixel(this.centerX - 2, this.centerY - 7, this.colors.eye);
        this.drawPixel(this.centerX - 1, this.centerY - 6, this.colors.eye);
        this.drawPixel(this.centerX + 1, this.centerY - 6, this.colors.eye);
        this.drawPixel(this.centerX + 2, this.centerY - 7, this.colors.eye);
        this.drawPixel(this.centerX - 2, this.centerY - 7, this.colors.white);
        this.drawPixel(this.centerX + 2, this.centerY - 7, this.colors.white);
        this.drawPixel(this.centerX - 1, this.centerY - 4, this.colors.beak);
        this.drawPixel(this.centerX + 1, this.centerY - 4, this.colors.beak);

        const wingFlap = Math.sin(frame * 0.15) * 3;
        for (let i = 0; i < 8; i++) {
            this.drawPixel(
                this.centerX - 6 + i,
                this.centerY + wingFlap,
                this.colors.wing,
            );
            this.drawPixel(
                this.centerX + 6 - i,
                this.centerY + wingFlap,
                this.colors.wing,
            );
            this.drawPixel(
                this.centerX - 6 + i,
                this.centerY + 1 + wingFlap,
                this.colors.wing,
            );
            this.drawPixel(
                this.centerX + 6 - i,
                this.centerY + 1 + wingFlap,
                this.colors.wing,
            );
        }
    }

    drawHunting(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }
        if (this.huntingState === "seeking") {
            const dx = this.bugPosition.x - this.pigeonPosition.x;
            const dy = this.bugPosition.y - this.pigeonPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 2) {
                this.huntingState = "catching";
            } else {
                this.pigeonPosition.x += (dx / distance) * 0.3;
                this.pigeonPosition.y += (dy / distance) * 0.3;
            }
        } else if (this.huntingState === "catching") {
            if (frame % 30 === 0) {
                this.huntingState = "eating";
            }
        } else if (this.huntingState === "eating") {
            if (frame % 60 === 0) {
                this.huntingState = "seeking";
                this.bugPosition.x =
                    this.centerX + Math.floor(Math.random() * 20 - 10);
                this.bugPosition.y =
                    this.centerY + Math.floor(Math.random() * 20 - 10);
                this.pigeonPosition = { x: this.centerX, y: this.centerY };
            }
        }
        if (this.huntingState === "seeking") {
            this.drawBug(this.bugPosition.x, this.bugPosition.y);
        }
        const bounce = Math.sin(frame * 0.1) * 1;
        this.drawPigeonAtPosition(
            Math.floor(this.pigeonPosition.x),
            Math.floor(this.pigeonPosition.y),
            bounce,
            pet,
        );
        const wingFlap = Math.sin(frame * 0.2) * 2;
        for (let i = 0; i < 8; i++) {
            this.drawPixel(
                Math.floor(this.pigeonPosition.x - 7 + i),
                Math.floor(this.pigeonPosition.y + wingFlap),
                this.colors.wing,
            );
            this.drawPixel(
                Math.floor(this.pigeonPosition.x + 7 - i),
                Math.floor(this.pigeonPosition.y + wingFlap),
                this.colors.wing,
            );
        }
    }

    drawCleaning(frame, pet) {
        this.clear();
        if (pet.weather) {
            this.drawWeather(pet.weather);
        }
        this.drawPigeonAtPosition(this.centerX, this.centerY, 0, pet);
        const cleanAngle = (Math.sin(frame * 0.1) * Math.PI) / 4;
        const wingX = this.centerX + Math.cos(cleanAngle) * 6;
        const wingY = this.centerY + Math.sin(cleanAngle) * 6;
        for (let i = 0; i < 6; i++) {
            this.drawPixel(
                Math.round(wingX + i),
                Math.round(wingY),
                this.colors.wing,
            );
            this.drawPixel(
                Math.round(wingX + i),
                Math.round(wingY + 1),
                this.colors.wing,
            );
        }
        const sparkleFrame = Math.floor(frame / 10) % 4;
        if (sparkleFrame < 2) {
            this.drawPixel(
                this.centerX - 5 + sparkleFrame * 10,
                this.centerY - 7,
                this.colors.white,
            );
            this.drawPixel(
                this.centerX - 5 + sparkleFrame * 10,
                this.centerY + 7,
                this.colors.white,
            );
        }
    }
}
