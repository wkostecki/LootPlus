// var walls;
// var projectiles;
// var projectilesDmg;
// var player;
// var playerMoveSpeed = 2;
// var enemies;
// var end;
// var fr = 30;

// //shoot ability costs
// const cost1 = 10;
// const cost2 = 50;
// const cost3 = 200;
// const cost4 = 800;
// const cost5 = 800;
// const cost6 = 500;

// var cooldown = fr;
// const cooldownTime = fr / 3;
// const ooo = false;
// const WWW = true;
// const enm = 2;
// const pic = 3;
// const spriteScale = 40;
// const mapLayout = [
//     [WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW],
//     [WWW, ooo, ooo, ooo, WWW, ooo, ooo, enm, ooo, ooo, ooo, WWW],
//     [WWW, ooo, WWW, ooo, WWW, ooo, WWW, WWW, WWW, WWW, ooo, WWW],
//     [WWW, ooo, WWW, ooo, ooo, ooo, WWW, ooo, WWW, WWW, ooo, WWW],
//     [WWW, ooo, WWW, ooo, WWW, WWW, ooo, enm, ooo, WWW, ooo, WWW],
//     [WWW, ooo, WWW, enm, WWW, WWW, ooo, WWW, ooo, WWW, enm, WWW],
//     [WWW, ooo, WWW, ooo, WWW, WWW, ooo, WWW, pic, WWW, ooo, WWW],
//     [WWW, ooo, WWW, WWW, WWW, WWW, ooo, WWW, WWW, WWW, ooo, WWW],
//     [WWW, ooo, WWW, ooo, ooo, ooo, ooo, ooo, ooo, WWW, ooo, WWW],
//     [WWW, ooo, WWW, ooo, WWW, WWW, WWW, WWW, enm, WWW, ooo, WWW],
//     [WWW, ooo, WWW, ooo, ooo, ooo, ooo, WWW, ooo, ooo, ooo, WWW],
//     [WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW],
// ];
"use strict";

class Adventure {
    constructor(mapLayout, enemyhp) {
        this.walls;
        this.projectiles;
        this.projectilesDmg;
        this.player;
        this.playerMoveSpeed = 2;
        this.enemies;
        this.end;
        this.fr = 30;

        //shoot ability costs
        this.cost1 = 50;
        this.cost2 = 50;
        this.cost3 = 50;
        this.cost4 = 50;
        this.cost5 = 50;
        this.cost6 = 100;

        this.cooldown = this.fr;
        this.cooldownTime = this.fr / 3;
        this.ooo = false;
        this.WWW = true;
        this.enm = 2;
        this.pic = 3;
        this.spriteScale = 40;
        this.mapLayout = mapLayout;
        this.enemyHP = enemyhp;
    }

    setup() {
        //var cnv = createCanvas(this.mapLayout.length * this.spriteScale, this.mapLayout[0].length * this.spriteScale);
        //var adv = adventure_canvas.getBoundingClientRect();
        //cnv.position(adv.left, adv.top + cnv.height / 2);
        frameRate(this.fr);

        //groups of sprites for iterations
        this.walls = new Group();
        this.projectiles = new Group();
        this.projectilesDmg = new Array();
        this.enemies = new Group();

        //player
        this.player = createSprite(this.spriteScale * (this.mapLayout.length - 11) + this.spriteScale / 2, this.spriteScale * (this.mapLayout[this.mapLayout.length - 1].length - 2) + this.spriteScale / 2, this.spriteScale * 0.5, this.spriteScale * 0.5);
        this.player.shapeColor = color(0, 255, 0);

        //goal
        this.end = createSprite(this.spriteScale * (this.mapLayout.length - 6) + this.spriteScale / 2, this.spriteScale * (this.mapLayout[this.mapLayout.length - 1].length - 2) + this.spriteScale / 2, this.spriteScale * 0.75, this.spriteScale * 0.75);
        this.end.shapeColor = color(0, 0, 255);

        //generate map
        for (var i = 0; i < this.mapLayout.length; i++) {
            for (var j = 0; j < this.mapLayout[i].length; j++) {

                //WALLS
                if (this.mapLayout[i][j] == this.WWW) {
                    var w = createSprite(j * this.spriteScale + this.spriteScale / 2, i * this.spriteScale + this.spriteScale / 2,
                        this.spriteScale, this.spriteScale);
                    w.shapeColor = color(99, 71, 51);
                    this.walls.add(w);
                }

                //ENEMIES
                if (this.mapLayout[i][j] == this.enm) {
                    var e = createSprite(j * this.spriteScale + this.spriteScale / 2, i * this.spriteScale + this.spriteScale / 2,
                        this.spriteScale * 0.75, this.spriteScale * 0.75);
                    e.shapeColor = color(255, 0, 0);
                    this.enemies.add(e);
                }
            }
        }
    }

    draw() {
        background(180);
        this.cooldown++;
        //player movement
        if (keyDown('A'))
            this.player.position.x -= this.playerMoveSpeed;
        else if (keyDown('D'))
            this.player.position.x += this.playerMoveSpeed;

        if (keyDown('W'))
            this.player.position.y -= this.playerMoveSpeed;
        else if (keyDown('S'))
            this.player.position.y += this.playerMoveSpeed;

        if (keyDown('1') && lootbox.junk >= this.cost1 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 5);
            lootbox.junk -= this.cost1;
            this.cooldown = 0;
        }
        else if (keyDown('2') && lootbox.common >= this.cost2 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 50);
            lootbox.common -= this.cost2;
            this.cooldown = 0;
        }
        else if (keyDown('3') && lootbox.uncommon >= this.cost3 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 100);
            lootbox.uncommon -= this.cost3;
            this.cooldown = 0;
        }
        else if (keyDown('4') && lootbox.rare >= this.cost4 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 200);
            lootbox.rare -= this.cost4;
            this.cooldown = 0;
        }
        else if (keyDown('5') && lootbox.superRare >= this.cost5 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 500);
            lootbox.superRare -= this.cost5;
            this.cooldown = 0;
        }
        else if (keyDown('6') && lootbox.ultraRare >= this.cost6 && this.cooldown > this.cooldownTime) {
            this.shoot(this.player, 5000000);
            lootbox.ultraRare -= this.cost6;
            this.cooldown = 0;
        }

        //stop player at wall
        this.player.collide(this.walls);

        //destroy projectiles on wall collision
        for (var i = 0; i < this.projectiles.size(); i++)
            if (this.projectiles.get(i).collide(this.walls))
            {
                this.projectiles.get(i).remove();
                this.projectilesDmg = this.projectilesDmg.shiftAtIndex(i);
            }

        //iterate through all projectiles to check for collision with enemies
        for (var i = 0; i < this.projectiles.size(); i++)
        {
            for (var j = 0; j < this.enemies.size(); j++)
            {
                if (this.projectiles[i].overlap(this.enemies[j]))
                {
                    //reduce enemy health by the projectile damage index
                    this.enemies[j].health -= this.projectilesDmg[i];

                    //remove projectile information from both arrays
                    this.projectiles[i].remove();
                    this.projectilesDmg = this.projectilesDmg.shiftAtIndex(i);
                }
            }
        }

        //end adventure on touching end
        if (this.player.overlap(this.end))
        {
            currentAdventure = null;
        }

        drawSprites();
    }

    shoot(source, damage) {
        var projectile = createSprite(source.position.x, source.position.y, 10, 10);
    
        var a = atan2(mouseY - source.position.y, mouseX - source.position.x);
        projectile.setSpeed(this.playerMoveSpeed * 2, degrees(a));
        projectile.shapeColor = color(0);
        this.projectiles.add(projectile);
        this.projectilesDmg.push(damage);
    }
}


var currentAdventure;

function setup() {
    createCanvas(480, 480);
}

function draw() {
    if (currentAdventure != null)
        currentAdventure.draw();
    else
        background(26, 24, 26);
}

function adventureStart()
{
    var strUser = adventureoptions.options[adventureoptions.selectedIndex].value;
    var oo = false;
    var WW = true;
    var en = 2;
    var pk = 3;
    if (strUser == "Boring")
    {
        currentAdventure = new Adventure([
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
            [WW, oo, oo, oo, WW, oo, oo, en, oo, oo, oo, WW],
            [WW, oo, WW, oo, WW, oo, WW, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, WW, oo, WW, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, oo, en, oo, WW, oo, WW],
            [WW, oo, WW, en, WW, WW, oo, WW, oo, WW, en, WW],
            [WW, oo, WW, oo, WW, WW, oo, WW, pk, WW, oo, WW],
            [WW, oo, WW, WW, WW, WW, oo, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, oo, oo, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, WW, WW, en, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, WW, oo, oo, oo, WW],
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
        ], 15);
        currentAdventure.setup();
        //loop();
    }
    else if (strUser == "Average")
    {
        currentAdventure = new Adventure([
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
            [WW, oo, oo, oo, WW, oo, oo, en, oo, oo, oo, WW],
            [WW, oo, WW, oo, WW, oo, WW, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, WW, oo, WW, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, oo, en, oo, WW, oo, WW],
            [WW, oo, WW, en, WW, WW, oo, WW, oo, WW, en, WW],
            [WW, oo, WW, oo, WW, WW, oo, WW, pk, WW, oo, WW],
            [WW, oo, WW, WW, WW, WW, oo, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, oo, oo, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, WW, WW, en, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, WW, oo, oo, oo, WW],
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
        ], 50);
        currentAdventure.setup();
    }
    else if (strUser == "Exciting")
    {
        currentAdventure = new Adventure([
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
            [WW, oo, oo, oo, WW, oo, oo, en, oo, oo, oo, WW],
            [WW, oo, WW, oo, WW, oo, WW, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, WW, oo, WW, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, oo, en, oo, WW, oo, WW],
            [WW, oo, WW, en, WW, WW, oo, WW, oo, WW, en, WW],
            [WW, oo, WW, oo, WW, WW, oo, WW, pk, WW, oo, WW],
            [WW, oo, WW, WW, WW, WW, oo, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, oo, oo, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, WW, WW, en, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, WW, oo, oo, oo, WW],
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
        ], 50);
        currentAdventure.setup();
    }
    else if (strUser == "Epic")
    {
        currentAdventure = new Adventure([
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
            [WW, oo, oo, oo, WW, oo, oo, en, oo, oo, oo, WW],
            [WW, oo, WW, oo, WW, oo, WW, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, WW, oo, WW, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, oo, en, oo, WW, oo, WW],
            [WW, oo, WW, en, WW, WW, oo, WW, oo, WW, en, WW],
            [WW, oo, WW, oo, WW, WW, oo, WW, pk, WW, oo, WW],
            [WW, oo, WW, WW, WW, WW, oo, WW, WW, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, oo, oo, WW, oo, WW],
            [WW, oo, WW, oo, WW, WW, WW, WW, en, WW, oo, WW],
            [WW, oo, WW, oo, oo, oo, oo, WW, oo, oo, oo, WW],
            [WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW, WW],
        ], 50);
        currentAdventure.setup();
    }
    else
        console.log("adventure selection not found");
}