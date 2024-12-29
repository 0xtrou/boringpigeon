// Solana wallet and donation handling
class DonationManager {
    constructor() {
        this.connection = new solanaWeb3.Connection(
            "https://withered-patient-breeze.solana-mainnet.quiknode.pro/eaba6829409baa79ba7a5ff73bca08a1310e945c",
            "confirmed",
        );
        this.recipientAddress = "3w7cSEWY7LSFefWq2bx2v3nEjGXHtZL6EFch96uqeujT";
        this.provider = null;
        this.initialize();
    }

    async initialize() {
        try {
            // Check if Phantom wallet is installed
            const isPhantomInstalled = window.solana && window.solana.isPhantom;
            if (isPhantomInstalled) {
                this.provider = window.solana;
                await this.setupEventListeners();

                // Try to connect if already authorized
                if (this.provider) {
                    try {
                        await this.provider.connect({ onlyIfTrusted: true });
                    } catch (err) {
                        console.log("Wallet needs manual approval");
                    }
                }
            } else {
                console.log("Phantom wallet not found");
                document.getElementById("connectWalletModal").textContent =
                    "Install Phantom";
                document
                    .getElementById("connectWalletModal")
                    .addEventListener("click", () => {
                        window.open("https://phantom.app/", "_blank");
                    });
            }
        } catch (error) {
            console.error("Error initializing donation manager:", error);
        }
    }

    async setupEventListeners() {
        const connectBtn = document.getElementById("connectWalletModal");
        const donationButtons = document.querySelectorAll(".donation-btn");
        const messageModal = document.getElementById("messageModal");
        const messageInput = document.getElementById("messageInput");
        const charCounter = document.querySelector(".char-counter");
        const walletModal = document.getElementById("walletModal");

        connectBtn?.addEventListener("click", () => this.connectWallet());

        // Close wallet modal function
        window.closeWalletModal = () => {
            walletModal.style.display = "none";
        };

        donationButtons?.forEach((btn) => {
            btn.addEventListener("click", async () => {
                if (!this.provider?.publicKey) {
                    walletModal.style.display = "flex";
                    return;
                }

                if (btn.dataset.item === "message") {
                    messageModal.style.display = "flex";
                } else {
                    await this.handleDonation(
                        btn.dataset.item,
                        parseFloat(btn.dataset.cost),
                    );
                }
            });
        });

        document
            .getElementById("cancelMessage")
            ?.addEventListener("click", () => {
                messageModal.style.display = "none";
                messageInput.value = "";
            });

        document
            .getElementById("sendMessage")
            ?.addEventListener("click", async () => {
                const message = messageInput.value.trim();
                if (message) {
                    await this.handleDonation("message", 0.004, message);
                    messageModal.style.display = "none";
                    messageInput.value = "";
                }
            });

        messageInput?.addEventListener("input", () => {
            const length = messageInput.value.length;
            charCounter.textContent = `${length}/24`;
        });

        // Close modal when clicking outside
        messageModal?.addEventListener("click", (e) => {
            if (e.target === messageModal) {
                messageModal.style.display = "none";
                messageInput.value = "";
            }
        });

        walletModal?.addEventListener("click", (e) => {
            if (e.target === walletModal) {
                walletModal.style.display = "none";
            }
        });
    }

    async connectWallet() {
        try {
            if (!this.provider) {
                window.open("https://phantom.app/", "_blank");
                return;
            }

            await this.provider.connect();
            console.log(
                "Connected with Public Key:",
                this.provider.publicKey.toString(),
            );
            closeWalletModal();
        } catch (error) {
            console.error("Error connecting wallet:", error);
            const connectBtn = document.getElementById("connectWalletModal");
            if (connectBtn) {
                connectBtn.textContent = "Connection Failed";
                setTimeout(() => {
                    connectBtn.textContent = "Connect Phantom";
                }, 2000);
            }
        }
    }

    async handleDonation(item, amount, message = "") {
        try {
            if (!this.provider?.publicKey) {
                walletModal.style.display = "flex";
                return;
            }

            const connection = new solanaWeb3.Connection(
                "https://methodical-quick-tree.solana-mainnet.quiknode.pro/0051e06d64042ad6a7ae2c97457ae12d53c6aff7",
            );

            // Create simple transfer transaction
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: this.provider.publicKey,
                    toPubkey: new solanaWeb3.PublicKey(this.recipientAddress),
                    lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
                }),
            );

            // Get emoji based on donation type
            let emoji = "";
            switch (item) {
                case "grass":
                    emoji = "🌿";
                    break;
                case "evergreen":
                    emoji = "🌲";
                    break;
                case "fist":
                    emoji = "🐟";
                    break;
                case "launch":
                    emoji = "🚀";
                    break;
                case "rose":
                    emoji = "🌹";
                    break;
                case "bird":
                    emoji = "🐦";
                    break;
                case "heart":
                    emoji = "❤️";
                    break;
                case "message":
                    emoji = "📢";
                    break;
            }

            transaction.add(
                new solanaWeb3.TransactionInstruction({
                    keys: [
                        {
                            pubkey: this.provider.publicKey,
                            isSigner: true,
                            isWritable: true,
                        },
                    ],
                    data: Buffer.from(
                        `boringpigeon.fun-${emoji}-${amount}-${message}`,
                        "utf-8",
                    ),
                    programId: new solanaWeb3.PublicKey(
                        "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
                    ),
                }),
            );

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = this.provider.publicKey;

            // Sign and send transaction
            const signature =
                await this.provider.signAndSendTransaction(transaction);
            console.log("Transaction sent:", signature);
        } catch (error) {
            console.error("Error processing donation:", error);
        }
    }
}

// Initialize donation manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    window.donationManager = new DonationManager();
});
