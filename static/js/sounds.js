class PetSounds {
    constructor() {
        // Initialize Tone.js
        this.initialized = false;
        this.synth = new Tone.PolySynth().toDestination();
        this.synth.volume.value = -10; // Reduce overall volume

        // Create effects
        this.reverb = new Tone.Reverb(1.5).toDestination();
        this.filter = new Tone.Filter(2000, "lowpass").connect(this.reverb);
        this.synth.connect(this.filter);

        // Cooing sound - gentle oscillating notes
        this.cooingPattern = [
            { note: "G4", duration: "16n" },
            { note: "E4", duration: "8n" },
            { note: "G4", duration: "16n" }
        ];

        // Eating sound - short pecking notes
        this.eatingPattern = [
            { note: "C5", duration: "32n" },
            { note: "C5", duration: "32n" }
        ];

        // Cleaning sound - soft rustling
        this.cleaningPattern = [
            { note: "F5", duration: "32n" },
            { note: "G5", duration: "32n" },
            { note: "A5", duration: "32n" }
        ];

        // Sleeping sound - quiet purring
        this.sleepingPattern = [
            { note: "C3", duration: "8n" },
            { note: "E3", duration: "8n" }
        ];

        // Hunting sound - excited flutter
        this.huntingPattern = [
            { note: "G4", duration: "16n" },
            { note: "A4", duration: "16n" },
            { note: "B4", duration: "16n" },
            { note: "C5", duration: "16n" }
        ];
    }

    async initialize() {
        if (!this.initialized) {
            await Tone.start();
            this.initialized = true;
        }
    }

    async playPattern(pattern, tempo = 1) {
        await this.initialize();
        const now = Tone.now();
        let time = now;

        pattern.forEach(({ note, duration }) => {
            this.synth.triggerAttackRelease(note, duration, time);
            time += Tone.Time(duration).toSeconds() * tempo;
        });
    }

    async playCoo() {
        await this.playPattern(this.cooingPattern, 1.5);
    }

    async playEating() {
        await this.playPattern(this.eatingPattern, 0.8);
    }

    async playCleaning() {
        await this.playPattern(this.cleaningPattern, 1);
    }

    async playSleeping() {
        await this.playPattern(this.sleepingPattern, 2);
    }

    async playHunting() {
        await this.playPattern(this.huntingPattern, 0.7);
    }
}

// Create a global instance
window.petSounds = new PetSounds();