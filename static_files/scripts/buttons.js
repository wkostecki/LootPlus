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
        if (lootbox.boxesOwned >= 1) {
            htmlInteraction.showButton("open");
            this.enableButton("open");
        }
        else htmlInteraction.disableButton("open");
    },

    checkHomeEnabled: function () {
        //this.checkEatAndThrowButtons();
    },

    checkAutoOpen: function () {
        if (lootbox.boxesPerSecond >= 10) {
            htmlInteraction.setElementVisibility("auto_open_checkbox", true);
            htmlInteraction.setElementVisibility("auto_open_checkbox_label", true);

        }
    },
    checkAdventure: function () {
        if (lootbox.uberRare > 0)
            htmlInteraction.setElementVisibility("adventureAvailable", true);
        else
            htmlInteraction.setElementVisibility("adventureAvailable", false);
    },

    checkPurchaseableBuildings: function () {

        var name = "business";
        //business
        htmlInteraction.setInnerHtml(name, "Start a Business (" +
            business.cost + " " + business.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "You have " +
            business.totalOwned + " businesses earning " +
            (business.totalOwned * business.lbps) +
            " lootboxes per second");
        if (business.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalJunk >= business.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.junk >= business.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //pirate
        name = "pirate";
        htmlInteraction.setInnerHtml(name, "Hire a Pirate (" + pirate.cost + " " + pirate.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "You have " +
            pirate.totalOwned + " pirates stealing " +
            (pirate.totalOwned * pirate.lbps) +
            " lootboxes per second");
        if (pirate.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalCommon >= pirate.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.common >= pirate.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //cows
        name = "cow";
        htmlInteraction.setInnerHtml(name, "Buy a Cow (" + cow.cost + " " + cow.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "You have " +
            cow.totalOwned + " cows being milked for " +
            (cow.totalOwned * cow.lbps) +
            " lootboxes per second");
        if (cow.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalUncommon >= cow.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.uncommon >= cow.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //farm
        name = "farm";
        htmlInteraction.setInnerHtml(name, "Plant a Farm (" + farm.cost + " " + farm.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "You have " +
            farm.totalOwned + " farms growing " +
            (farm.totalOwned * farm.lbps) +
            " lootboxes per second");
        if (farm.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalRare >= farm.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.rare >= farm.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //marketer
        name = "marketer";
        htmlInteraction.setInnerHtml(name, "Hire a Marketer (" + marketer.cost + " " + marketer.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "You have " +
            marketer.totalOwned + " marketers tricking people into giving you " +
            (marketer.totalOwned * marketer.lbps) +
            " lootboxes per second");
        if (marketer.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalSuperRare >= marketer.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.superRare >= marketer.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);

        //cthulhu
        name = "eldergod";
        htmlInteraction.setInnerHtml(name, "Gaze into the Abyss (" + eldergod.cost + " " + eldergod.purchaseType + "s)");
        htmlInteraction.setInnerHtml(name + "blurb", "Cthulhu has granted you dominion over " +
            eldergod.totalOwned + " unspeakable horrors that extract " +
            (eldergod.totalOwned * eldergod.lbps) +
            " lootboxes from their victims per second");
        if (eldergod.totalOwned > 0)
            htmlInteraction.setElementVisibility(name + "blurb", true);
        if (lootbox.totalUltraRare >= eldergod.cost && !htmlInteraction.isElementVisible(name)) {
            htmlInteraction.showButton(name);
            this.enableButton(name);
        }
        if (lootbox.ultraRare >= eldergod.cost) {
            this.enableButton(name);
        }
        else
            this.disableButton(name);
    }

};