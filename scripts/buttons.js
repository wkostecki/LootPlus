var buttons = {

    // Variables

    homeButtonsDisabled: false, // Block any enabling home button process when true

    // Functions

    enableHomeButtons: function () {
        if (this.homeButtonsDisabled == true) {
            this.homeButtonsDisabled = false;
            htmlInteraction.enableButtonClass("home_button");
            this.checkHomeEnabled();
        }
    },

    enableButton: function (name) {
        // If the home buttons are enabled or our button isn't a home button
        if (this.homeButtonsDisabled == false || htmlInteraction.getElement(name).className != "home_button") {
            htmlInteraction.enableButton(name);
        }
    },

    disableButton: function (name) {
        // If the home buttons are enabled or our button isn't a home button
        if (this.homeButtonsDisabled == false || htmlInteraction.getElement(name).className != "home_button") {
            htmlInteraction.disableButton(name);
        }
    },

    checkLootbox: function () {
        // Show the eat button
        if (lootbox.numberOwned >= 1) {
            htmlInteraction.showButton("open");
            this.enableButton("open");
        }
        else htmlInteraction.disableButton("open");
    },

    checkHomeEnabled: function () {
        //this.checkEatAndThrowButtons();
    },

    checkPurchaseableBuildings: function () {

        var name = "business";
        //business
        htmlInteraction.setInnerHtml(name, "Start a business (" + business.cost + " " + business.purchaseType + ")");
        if (lootbox.junk >= business.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        else if (lootbox.junk >= business.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //pirate
        name = "pirate";
        htmlInteraction.setInnerHtml(name, "Hire a Pirate (" + pirate.cost + " " + pirate.purchaseType + ")");
        if (lootbox.common >= pirate.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        else if (lootbox.common >= pirate.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);
    },

};