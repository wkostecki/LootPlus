var farm = {

    cost: 100,
    purchaseType: "rare",
    lbps: 50,
    totalOwned: 0,
    initialCost: 35,
    costIncPer: 1.18,

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
    setTotal: function (amount) {
        this.totalOwned = amount;
        this.cost = Math.floor(this.initialCost * (Math.pow(this.costIncPer, this.totalOwned)));
    }

};