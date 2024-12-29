class TransactionMonitor {
    constructor() {
        this.connection = new solanaWeb3.Connection(
            "https://withered-patient-breeze.solana-mainnet.quiknode.pro/eaba6829409baa79ba7a5ff73bca08a1310e945c",
        );
        this.donationWallet = "3w7cSEWY7LSFefWq2bx2v3nEjGXHtZL6EFch96uqeujT";
        this.lastSignature = null;
        this.isMonitoring = false;
        this.monitorInterval = null;

        this.checkNewTransactions();
    }

    async start() {
        if (this.isMonitoring) return;
        this.isMonitoring = true;

        // Start monitoring for new transactions
        this.monitorInterval = setInterval(
            () => this.checkNewTransactions(),
            5000,
        );
    }

    stop() {
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
        this.isMonitoring = false;
    }

    async checkNewTransactions() {
        try {
            const transactions = await this.connection.getSignaturesForAddress(
                new solanaWeb3.PublicKey(this.donationWallet),
                { limit: 10 },
            );

            if (
                transactions.length > 0 &&
                this.lastSignature !== transactions[0].signature
            ) {
                // Process new transactions
                for (let i = transactions.length - 1; i >= 0; i--) {
                    const tx = transactions[i];
                    const txDetails =
                        await this.connection.getParsedTransaction(
                            tx.signature,
                            {
                                maxSupportedTransactionVersion: 0,
                            },
                        );

                    if (txDetails && txDetails.meta && !txDetails.meta.err) {
                        await this.processTransaction(txDetails);
                    }
                }
            }
        } catch (error) {
            console.error("Error checking transactions:", error);
        }
    }

    async processTransaction(txDetails) {
        // Look for memo instruction
        const memoInstr = txDetails.transaction.message.instructions.find(
            (instr) =>
                instr.programId.toBase58() ===
                "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
        );

        if (memoInstr && memoInstr.parsed) {
            const memoData = memoInstr.parsed;
            if (memoData.startsWith("boringpigeon.fun-")) {
                const content = memoData.split("-");
                await this.handleDonationMessage(content, txDetails);
            }
        }
    }

    async handleDonationMessage(content, txDetails) {
        // Extract emoji and message
        const [label, emoji, amount, message] = content;
        const signer = txDetails.transaction.message.accountKeys.find(
            (a) => a.signer,
        );

        const txHash = txDetails.transaction.signatures[0];

        // Create transaction record
        const transaction = {
            hash: txHash,
            emoji,
            message: message || "",
            amount,
            timestamp: txDetails.blockTime * 1000,
            signer: signer.pubkey.toBase58(),
        };

        // Add to transaction history
        window.transactionHistory.addTransaction(transaction);

        // Generate pigeon's response based on the donation
        let response;
        switch (emoji) {
            case "🌿":
                response = "Mmm, fresh grass! *pecks happily* 🌿";
                break;
            case "🌹":
                response = "A beautiful rose! How romantic~ 🌹";
                break;
            case "🐦":
                response = "Bird feed! My favorite! *excited coo* 🐦";
                break;
            case "❤️":
                response = "Aww, I love you too! *happy wing flaps* ❤️";
                break;
            case "📢":
                response = `*listens intently to "${message}"* 📢 Coo coo!`;
                break;
            default:
                response = "Thank you for the gift! *happy coo* 🎁";
        }

        const thankyou = `Thanks ${signer.pubkey.toBase58().slice(0, 6)} (${amount} SOL)`;
        response = `${thankyou} ${response}`;

        // Display the response
        if (window.pet) {
            if (Date.now() - transaction.timestamp <= 30_000) {
                // Get pet stats for contextual response
                const pet = window.pet;
                const petStats = {
                    hunger: pet.stats.hunger,
                    energy: pet.stats.energy,
                    happiness: pet.stats.happiness,
                };

                // Get AI response for donation
                try {
                    const aiResponse = await fetch(
                        "/api/generate-donation-response",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                amount: amount,
                                stats: petStats,
                                from_address: transaction.signer,
                                message: message,
                            }),
                        },
                    );

                    if (aiResponse.ok) {
                        const data = await aiResponse.json();
                        response = `${thankyou} ${data.response}`;
                    } else {
                        console.error("AI response error:", aiResponse.status);
                    }
                } catch (error) {
                    console.error("Error getting AI response:", error);
                }

                await pet.addReaction(
                    "idle",
                    3000,
                    async () => await window.petSounds.playCoo(),
                    response,
                    "high",
                );
            }

            this.lastSignature = txDetails.signature;
        }
    }
}
