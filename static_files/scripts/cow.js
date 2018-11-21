var cow = {

    cost: 100,
    purchaseType: "uncommon",
    lbps: 10,
    totalOwned: 0,
    initialCost: 30,
    costIncPer: 1.18,

    onload: function () {
        this.totalOwned = 0;
        this.cost = this.initialCost;
    },

    buy: function () {
        if (lootbox.uncommon >= this.cost) {
            lootbox.uncommon -= this.cost;
            this.totalOwned += 1;
            lootbox.boxesPerSecond += this.lbps;
            this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
        }
        buttons.checkPurchaseableBuildings();
    },

};