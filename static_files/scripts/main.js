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

        if (gameLoad.innerHTML != "") {
            lootbox.load(gameLoad.innerHTML); 
        }

        // First actions
        window.setInterval(this.secInterval.bind(this), 1000);
        window.setInterval(this.autoOpen.bind(this), 100);
        if (document.getElementById("saveGameButton") != null)
            window.setInterval(this.server.bind(this), 30000);
        //cookie.cookiehandler = window.setInterval(cookie.autoSave, 1000);
    },


    secInterval: function () {
        lootbox.Increase(lootbox.boxesPerSecond);
    },

    autoOpen: function () {
        if (htmlInteraction.getElement("auto_open_checkbox").checked)
            lootbox.open(lootbox.boxesPerSecond / 9);
    },
    server: function () {
        var string = lootbox.save();
        var request = createCORSRequest("GET", "http://localhost:3000/game/" + string);
        request.send();
        console.log("saved");
        htmlInteraction.setElementVisibility("autosaved", true);
        setTimeout(function(){ htmlInteraction.setElementVisibility("autosaved", false); }, 2000);

    }
};

window.onload = main.onload.bind(main);

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}