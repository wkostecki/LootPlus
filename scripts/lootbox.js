var lootbox = {

    // Variables
    numberOwned: 0,
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
    onload : function(){
        this.numberOwned = 0;
        this.totalNumberOwned = 0;
        this.boxesPerSecond = 1;

    },
    
    open: function () {
        var totalOpens = 1;
        if (htmlInteraction.getElement("open_all_checkbox").checked)
            totalOpens = this.numberOwned;
        
        for (var i = 0; i < totalOpens; i++)
        {
            if (this.numberOwned >= 1) {

                this.numberOwned -= 1;
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
    },
    
    
    Increase : function(value){
        this.numberOwned += value;
        this.UpdateText();
        buttons.checkLootbox();
        buttons.checkPurchaseableBuildings();
    },

    UpdateText: function () {

        //lbps display for testing
        htmlInteraction.setInnerHtml("lbps", "lbps: " + this.boxesPerSecond);

        //lootboxes
        if (this.numberOwned != 1) htmlInteraction.setInnerHtml("lootboxCount", "You have " + this.numberOwned + " lootboxes.");
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
    }
  
};