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

    totalNumberOwned: 0,
    totalJunk: 0,
    totalCommon: 0,
    totalUncommon: 0,
    totalRare: 0,
    totalSuperRare: 0,
    totalUltraRare: 0,
    totalUberRare: 0,

    // Functions
    onload: function () {
        this.numberOwned = 0;
        this.totalNumberOwned = 0;
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
                var uberRareChance = allChance / 100000;
                //junk
                var openChance = Math.floor(Math.random() * allChance);
                if (openChance <= junkChance) {
                    this.junk += 1;
                    this.totalJunk += 1;
                }


                //common
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= commonChance) {
                    this.common += 1;
                    this.totalCommon += 1;
                }

                //uncommon
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= uncommonChance) {
                    this.uncommon += 1;
                    this.totalUncommon += 1;
                }

                //rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= rareChance) {
                    this.rare += 1;
                    this.totalRare += 1;
                }

                //super rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= superRareChance) {
                    this.superRare += 1;
                    this.totalSuperRare += 1;
                }

                //ultra rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= ultraRareChance) {
                    this.ultraRare += 1;
                    this.totalUltraRare += 1;
                }

                //uber rare
                openChance = Math.floor(Math.random() * allChance);
                if (openChance <= uberRareChance) {
                    this.uberRare += 1;
                    this.totalUberRare += 1;
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
        this.totalNumberOwned += value;
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
        if (this.totalJunk > 0)
            if (this.totalJunk != 1) htmlInteraction.setInnerHtml("junkCount", "You have " + this.junk + " junks.");
            else htmlInteraction.setInnerHtml("junkCount", "You have 1 junk.");

        //common
        if (this.totalCommon > 0)
            if (this.totalCommon != 1) htmlInteraction.setInnerHtml("commonCount", "You have " + this.common + " commons.");
            else htmlInteraction.setInnerHtml("commonCount", "You have 1 common.");

        //uncommon
        if (this.totalUncommon > 0)
            if (this.totalUncommon != 1) htmlInteraction.setInnerHtml("uncommonCount", "You have " + this.uncommon + " uncommons.");
            else htmlInteraction.setInnerHtml("uncommonCount", "You have 1 uncommon.");

        //rare
        if (this.totalRare > 0)
            if (this.totalRare != 1) htmlInteraction.setInnerHtml("rareCount", "You have " + this.rare + " rares.");
            else htmlInteraction.setInnerHtml("rareCount", "You have 1 rare.");

        //super rare
        if (this.totalSuperRare > 0)
            if (this.totalSuperRare != 1) htmlInteraction.setInnerHtml("superRareCount", "You have " + this.superRare + " super rares.");
            else htmlInteraction.setInnerHtml("superRareCount", "You have 1 super rare.");

        //ultra rare
        if (this.totalUltraRare > 0)
            if (this.totalUltraRare != 1) htmlInteraction.setInnerHtml("ultraRareCount", "You have " + this.ultraRare + " ultra rares.");
            else htmlInteraction.setInnerHtml("ultraRareCount", "You have 1 ultra rare.");

        //uber rare
        if (this.totalUberRare > 0)
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

        string
            += this.totalJunk + "i" + this.totalCommon + "k"
            + this.totalUncommon + "l" + this.totalRare + "m"
            + this.totalSuperRare + "n" + this.totalUltraRare + "o"
            + this.totalUberRare + "p";
        //buildings
        string += business.totalOwned + "q" + pirate.totalOwned + "r"
            + cow.totalOwned + "s" + farm.totalOwned + "t"
            + marketer.totalOwned + "u" + eldergod.totalOwned + "v";

        //adventure
        string += adventuresTaken + "w";

        return string;

    },

    load: function (string) {
        //parse lootbox
        var values = string.split("a"); 
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

        //parse total junk
        values = values[1].split("i");
        this.totalJunk = Number(values[0]);
        console.log("loaded total junk of " + this.totalJunk);

        //parse total common
        values = values[1].split("k");
        this.totalCommon = Number(values[0]);
        console.log("loaded total common of " + this.totalCommon);
        //parse total uncommon
        values = values[1].split("l");
        this.totalUncommon = Number(values[0]);
        console.log("loaded total uncommon of " + this.totalUncommon);

        //parse total rare
        values = values[1].split("m");
        this.totalRare = Number(values[0]);
        console.log("loaded total rare of " + this.totalRare);

        //parse total super rare
        values = values[1].split("n");
        this.superRare = Number(values[0]);
        console.log("loaded total superrare of " + this.superRare);

        //parse total ultra rare
        values = values[1].split("o");
        this.totalUltraRare = Number(values[0]);
        console.log("loaded total ultra rare of " + this.totalUltraRare);

        //parse total common
        values = values[1].split("p");
        this.totalUberRare = Number(values[0]);
        console.log("loaded total uber rare of " + this.totalUberRare);
        //bus pir cow far mar god
        
        //parse business
        values = values[1].split("q");
        business.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (business.lbps * business.totalOwned);
        console.log("loaded business of " + business.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse pirate
        values = values[1].split("r");
        pirate.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (pirate.lbps * pirate.totalOwned);
        console.log("loaded pirate of " + pirate.totalOwned + " new lbps " + this.boxesPerSecond);
        //parse cow
        values = values[1].split("s");
        cow.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (cow.lbps * cow.totalOwned);
        console.log("loaded cow of " + cow.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse farm
        values = values[1].split("t");
        farm.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (farm.lbps * farm.totalOwned);
        console.log("loaded farm of " + farm.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse marketer
        values = values[1].split("u");
        marketer.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (marketer.lbps * marketer.totalOwned);
        console.log("loaded marketer of " + marketer.totalOwned + " new lbps " + this.boxesPerSecond);

        //parse eldergod
        values = values[1].split("v");
        eldergod.setTotal(Number(values[0]));
        this.boxesPerSecond = this.boxesPerSecond + (eldergod.lbps * eldergod.totalOwned);
        console.log("loaded eldergod of " + eldergod.totalOwned + " new lbps " + this.boxesPerSecond);

        values = values[1].split("w");
        adventuresTaken = Number(values[0]);
        setAdventuresTaken();
        this.open(0);

        this.Increase(0);
    }

};