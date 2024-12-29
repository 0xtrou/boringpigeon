// Disclaimer content and configuration
const DisclaimerConfig = {
    title: "Important Disclaimer",
    mainText: "Please read this disclaimer carefully before proceeding:",
    description: "The $PIGEON token is exclusively designed for in-game utility within The Boring Pigeon virtual pet environment. It serves only to enhance your gameplay experience through:",
    usageBullets: [
        "Purchasing virtual accessories",
        "Feeding your virtual pet",
        "Unlocking gameplay features"
    ],
    importantNotes: [
        "$PIGEON has NO monetary value",
        "$PIGEON is NOT an investment vehicle",
    ],
    warning: "We strongly discourage making any financial decisions based on any connections formed with this virtual pet game.",
    buttons: {
        cancel: "Cancel",
        proceed: "I Understand, Proceed"
    },
    links: {
        marketplace: "https://boringpigeon.fun/#"
    }
};

class DisclaimerModal {
    constructor() {
        this.modal = document.getElementById('disclaimerModal');
        this.tokenButton = document.getElementById('tokenButton');
        this.init();
    }

    init() {
        // Create modal content
        this.createModalContent();
        
        // Add event listeners
        this.tokenButton?.addEventListener('click', (e) => {
            e.preventDefault();
            this.show();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    createModalContent() {
        const content = `
            <div class="modal-content">
                <h2>${DisclaimerConfig.title}</h2>
                <div class="disclaimer-text">
                    <p>${DisclaimerConfig.mainText}</p>
                    <p>${DisclaimerConfig.description}</p>
                    <ul>
                        ${DisclaimerConfig.usageBullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                    <p><strong>Important Notes:</strong></p>
                    <ul>
                        ${DisclaimerConfig.importantNotes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
                    <p class="warning">${DisclaimerConfig.warning}</p>
                </div>
                <div class="modal-buttons">
                    <button class="modal-btn cancel-btn" id="cancelToken">${DisclaimerConfig.buttons.cancel}</button>
                    <button class="modal-btn proceed-btn" id="proceedToken">${DisclaimerConfig.buttons.proceed}</button>
                </div>
            </div>
        `;

        this.modal.innerHTML = content;

        // Add button event listeners
        document.getElementById('cancelToken')?.addEventListener('click', () => this.hide());
        document.getElementById('proceedToken')?.addEventListener('click', () => {
            window.open(DisclaimerConfig.links.marketplace, '_blank');
            this.hide();
        });
    }

    show() {
        this.modal.style.display = 'flex';
    }

    hide() {
        this.modal.style.display = 'none';
    }
}

// Initialize disclaimer modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.disclaimerModal = new DisclaimerModal();
});
