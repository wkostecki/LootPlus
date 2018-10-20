var main = {

    // Functions
    onload: function () {
        // Prevents some stupid refresh bugs of the browser
        htmlInteraction.enableButtonClass("home_button");

        lootbox.onload();
        business.onload();

        // First actions
        window.setInterval(this.secInterval.bind(this), 1000);
        //cookie.cookiehandler = window.setInterval(cookie.autoSave, 1000);
    },


    secInterval: function () {
        lootbox.Increase(lootbox.boxesPerSecond);
    },

};

window.onload = main.onload.bind(main);