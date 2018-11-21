var eldergod = {

    cost: 100,
    purchaseType: "ultra rare",
    lbps: 500,
    totalOwned: 0,
    initialCost: 100,
    costIncPer: 1.15,

    onload: function () {
        this.totalOwned = 0;
        this.cost = this.initialCost;
    },

    buy: function () {
        if (lootbox.rare >= this.cost) {
            lootbox.rare -= this.cost;
            this.totalOwned += 1;
            lootbox.boxesPerSecond += this.lbps;
            this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
        }
        buttons.checkPurchaseableBuildings();
    },

};