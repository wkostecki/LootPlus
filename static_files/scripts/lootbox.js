var lootbox = {

    // Variables
    boxesOwned: 0,
    boxesPerSecond: 1,
    junk: 0,
    common: 0,
    uncommon: 0,
    rare: 0,
    superRare: 0,
    ultraRare: 0,
    uberRare: 0,

    // Functions
    onload: function () {
        this.numberOwned = 0;
        this.boxesPerSecond = 1;

    },

    open: function (opens) {

        if (opens > this.boxesOwned)
            opens = this.boxesOwned;

        for (var i = 0; i < opens; i++) {
            if (this.boxesOwned >= 1) {

                this.boxesOwned -= 1;
                var allChance = 101000;
                var junkChance = allChance;
                var commonChance = allChance / 2;
                var uncommonChance = allChance / 10;
                var rareChance = allChance / 100;
                var superRareChance = allChance / 1000;
                var ultraRareChance = allChance / 10000;
                var uberRareChance = allChance / 300000;
                //junk
                var openChance = Math.floor(Math.random() * allChance);
                if (openChance <= junkChance) {
                    this.junk += 1;
                }


                //common
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= commonChance) {
                    this.common += 1;
                }

                //uncommon
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= uncommonChance) {
                    this.uncommon += 1;
                }

                //rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= rareChance) {
                    this.rare += 1;
                }

                //super rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= superRareChance) {
                    this.superRare += 1;
                }

                //ultra rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= ultraRareChance) {
                    this.ultraRare += 1;
                }

                //uber rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= uberRareChance) {
                    this.uberRare += 1;
                }
            }
        }
        this.UpdateText();
        buttons.checkLootbox();
        buttons.checkPurchaseableBuildings();
        buttons.checkAdventure();
    },


    Increase: function (value) {
        this.boxesOwned += value;
        this.UpdateText();
        buttons.checkLootbox();
        buttons.checkPurchaseableBuildings();
        buttons.checkAdventure();
        buttons.checkAutoOpen();
    },

    UpdateText: function () {

        //lbps display for testing
        htmlInteraction.setInnerHtml("lbps", "lbps: " + this.boxesPerSecond);

        //lootboxes
        if (this.boxesOwned != 1) htmlInteraction.setInnerHtml("lootboxCount", "You have " + this.boxesOwned + " lootboxes.");
        else htmlInteraction.setInnerHtml("lootboxCount", "You have 1 lootbox.");

        //junk
        if (this.junk > 0)
            if (this.totalJunk != 1) htmlInteraction.setInnerHtml("junkCount", "You have " + this.junk + " junks.");
            else htmlInteraction.setInnerHtml("junkCount", "You have 1 junk.");

        //common
        if (this.common > 0)
            if (this.totalCommon != 1) htmlInteraction.setInnerHtml("commonCount", "You have " + this.common + " commons.");
            else htmlInteraction.setInnerHtml("commonCount", "You have 1 common.");

        //uncommon
        if (this.uncommon > 0)
            if (this.totalUncommon != 1) htmlInteraction.setInnerHtml("uncommonCount", "You have " + this.uncommon + " uncommons.");
            else htmlInteraction.setInnerHtml("uncommonCount", "You have 1 uncommon.");

        //rare
        if (this.rare > 0)
            if (this.totalRare != 1) htmlInteraction.setInnerHtml("rareCount", "You have " + this.rare + " rares.");
            else htmlInteraction.setInnerHtml("rareCount", "You have 1 rare.");

        //super rare
        if (this.superRare > 0)
            if (this.totalSuperRare != 1) htmlInteraction.setInnerHtml("superRareCount", "You have " + this.superRare + " super rares.");
            else htmlInteraction.setInnerHtml("superRareCount", "You have 1 super rare.");

        //ultra rare
        if (this.ultraRare > 0)
            if (this.totalUltraRare != 1) htmlInteraction.setInnerHtml("ultraRareCount", "You have " + this.ultraRare + " ultra rares.");
            else htmlInteraction.setInnerHtml("ultraRareCount", "You have 1 ultra rare.");

        //uber rare
        if (this.uberRare > 0)
            if (this.totalUberRare != 1) htmlInteraction.setInnerHtml("uberRareCount", "You have " + this.uberRare + " uber rares.");
            else htmlInteraction.setInnerHtml("uberRareCount", "You have 1 uber rare.");
    },

    save: function () {
        var string = "";

        //lootboxes info
        string += this.boxesOwned + "a"
            + this.junk + "b" + this.common + "c"
            + this.uncommon + "d" + this.rare + "e"
            + this.superRare + "f" + this.ultraRare + "g"
            + this.uberRare + "h";

        //buildings
        string += business.totalOwned + "i" + pirate.totalOwned + "j"
            + cow.totalOwned + "k" + farm.totalOwned + "l"
            + marketer.totalOwned + "m" + eldergod.totalOwned + "n";

        //adventure
        string += adventuresTaken + "o";

        console.log(string);

    },

    load: function (string) {
        //parse lootbox
        var values = string.split("a")
        this.boxesOwned = Number(values[0]);
        console.log("loaded lootbox of " + this.boxesOwned);

        //parse junk
        values = values[1].split("b");
        this.junk = Number(values[0]);
        console.log("loaded junk of " + this.junk);

        //parse common
        values = values[1].split("c");
        this.common = Number(values[0]);
        console.log("loaded common of " + this.common);

        //parse uncommon
        values = values[1].split("d");
        this.uncommon = Number(values[0]);
        console.log("loaded uncommon of " + this.uncommon);

        //parse rare
        values = values[1].split("e");
        this.rare = Number(values[0]);
        console.log("loaded rare of " + this.rare);

        //parse super rare
        values = values[1].split("f");
        this.superRare = Number(values[0]);
        console.log("loaded superrare of " + this.superRare);

        //parse ultra rare
        values = values[1].split("g");
        this.ultraRare = Number(values[0]);
        console.log("loaded ultra rare of " + this.ultraRare);

        //parse uber rare
        values = values[1].split("h");
        this.uberRare = Number(values[0]);
        console.log("loaded uber rare of " + this.uberRare);

        //bus pir cow far mar god
        //parse business
        values = values[1].split("i");
        business.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (business.lbps * business.totalOwned);
        console.log("loaded business of " + business.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse pirate
        values = values[1].split("j");
        pirate.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (pirate.lbps * pirate.totalOwned);
        console.log("loaded pirate of " + pirate.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse cow
        values = values[1].split("k");
        cow.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (cow.lbps * cow.totalOwned);
        console.log("loaded cow of " + cow.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse farm
        values = values[1].split("l");
        farm.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (farm.lbps * farm.totalOwned);
        console.log("loaded farm of " + farm.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse marketer
        values = values[1].split("m");
        marketer.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (marketer.lbps * marketer.totalOwned);
        console.log("loaded marketer of " + marketer.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse eldergod
        values = values[1].split("n");
        eldergod.totalOwned = Number(values[0]);
        this.boxesPerSecond = this.boxesPerSecond + (eldergod.lbps * eldergod.totalOwned);
        console.log("loaded eldergod of " + eldergod.totalOwned + " new lbps " + this.boxesPerSecond);

        values = values[1].split("o");
        adventuresTaken = Number(values[0]);
        setAdventuresTaken();
        lootbox.open(0);
    }

};