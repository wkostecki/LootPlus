var building = {

    cost,
    purchaseType,
    lbps,
    totalOwned,
    initialCost,
    costIncPer: 1.15,

    onload: function () {
        this.totalOwned = 0;
        this.cost = this.initialCost;
        htmlInteraction.setInnerHtml("business", "Start a business (100 " + this.purchaseType + ")");
    },

    buy: function () {
        if (lootbox.junk >= this.cost) {
            lootbox.junk -= this.cost;
            this.totalOwned += 1;
            lootbox.boxesPerSecond += this.lbps;
            this.cost = this.initialCost * (Math.pow(this.costIncPer, this.totalOwned));
        }
        buttons.checkPurchaseableBuildings();
    }

};