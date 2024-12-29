class TransactionHistory {
    constructor() {
        this.storageKey = "transaction_history";
        this.maxTransactions = 50; // Store more than we display for history purposes
        this.transactions = this.loadTransactions();

        this.saveTransactions();
        this.updateUI();
    }

    loadTransactions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            const r = stored ? JSON.parse(stored) : [];
            r.sort((a, b) => b.timestamp - a.timestamp);
            return r;
        } catch (error) {
            console.error("Error loading transactions:", error);
            return [];
        }
    }

    saveTransactions() {
        try {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.transactions),
            );
        } catch (error) {
            console.error("Error saving transactions:", error);
        }
    }

    addTransaction(transaction) {
        // Add new transaction at the beginning
        if (!!this.transactions.find((t) => t.hash === transaction.hash)) {
            return;
        }
        this.transactions.unshift(transaction);

        // Keep only the latest maxTransactions
        if (this.transactions.length > this.maxTransactions) {
            this.transactions = this.transactions.slice(
                0,
                this.maxTransactions,
            );
        }

        this.saveTransactions();
        this.updateUI();
    }

    getLatestTransactions(limit = 10) {
        return this.transactions.slice(0, limit);
    }

    updateUI() {
        const donationsList = document.getElementById("donationsList");
        if (!donationsList) return;

        // Clear current list
        donationsList.innerHTML = "";

        // Add latest transactions
        const latestTransactions = this.getLatestTransactions();
        latestTransactions.forEach((tx) => {
            const donationItem = document.createElement("div");
            donationItem.className = "donation-item";
            donationItem.innerHTML = `
            <div class="donation-signer">${tx.signer.slice(0, 6)}</div>
                <a href="https://solscan.io/tx/${tx.hash}" target="_blank">
                    <div class="donation-hash">${tx.hash.slice(0, 6)}</div>
                    </a>
                <div class="donation-message">${tx.emoji} ${tx.message || "Donated"}</span>
                <span class="donation-amount">${tx.amount} SOL</span>
            `;
            donationsList.appendChild(donationItem);
        });
    }
}
