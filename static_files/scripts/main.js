var main = {

    // Functions
    onload: function () {
        // Prevents some stupid refresh bugs of the browser
        htmlInteraction.enableButtonClass("home_button");

        lootbox.onload();
        business.onload();
        pirate.onload();
        cow.onload();
        farm.onload();
        marketer.onload();
        eldergod.onload();

        // First actions
        window.setInterval(this.secInterval.bind(this), 1000);
        window.setInterval(this.autoOpen.bind(this), 100);
        //cookie.cookiehandler = window.setInterval(cookie.autoSave, 1000);
    },


    secInterval: function () {
        lootbox.Increase(lootbox.boxesPerSecond);
    },

    autoOpen: function () {
        if (htmlInteraction.getElement("auto_open_checkbox").checked)
            lootbox.open(lootbox.boxesPerSecond / 9);
    }

};

window.onload = main.onload.bind(main);