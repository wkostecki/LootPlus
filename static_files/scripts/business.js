var business = {

    cost: 100,
    purchaseType: "junk",
    lbps: 1,
    totalOwned: 0,
    initialCost: 100,
    costIncPer: 1.18,

    onload: function () {
        this.totalOwned = 0;
        this.cost = this.initialCost;
    },

    buy: function () {
        if (lootbox.junk >= this.cost) {
            lootbox.junk -= this.cost;
            this.totalOwned += 1;
            lootbox.boxesPerSecond += this.lbps;
            this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
        }
        buttons.checkPurchaseableBuildings();
    },

};