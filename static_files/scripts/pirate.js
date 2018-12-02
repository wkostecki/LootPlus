var pirate = {

    cost: 100,
    purchaseType: "common",
    lbps: 3,
    totalOwned: 0,
    initialCost: 43,
    costIncPer: 1.29,

    onload: function () {
        this.totalOwned = 0;
        this.cost = this.initialCost;
    },

    buy: function () {
        if (lootbox.common >= this.cost) {
            lootbox.common -= this.cost;
            this.totalOwned += 1;
            lootbox.boxesPerSecond += this.lbps;
            this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
        }
        buttons.checkPurchaseableBuildings();
    },
    setTotal: function (amount) {
        this.totalOwned = amount;
        this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
    }

};