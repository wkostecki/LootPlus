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
    constructor(mapLayout, enemyhp, enemydamage, difficultycolor) {
        this.walls;
        this.enemies;
        this.playerProjectiles;
        this.playerProjectilesDmg;
        this.enemyProjectiles;
        this.player;
        this.playerMoveSpeed = 20;
        this.end;
        this.fr = 30;

        //shoot ability costs
        this.cost1 = 50;
        this.cost2 = 50;
        this.cost3 = 50;
        this.cost4 = 50;
        this.cost5 = 50;
        this.cost6 = 100;

        //player shoot cooldown
        this.cooldown = this.fr;
        this.cooldownTime = this.fr / 3;

        //enemy shoot cooldown


        //enemy shoot range
        this.enemyRange = 100;
        this.enemyDamage = enemydamage;
        this.enemyColor = difficultycolor;

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
        this.playerProjectiles = new Group();
        this.playerProjectilesDmg = new Array();
        this.enemyProjectiles = new Group();
        this.enemies = new Array();

        //player
        this.player = createSprite(this.spriteScale * (this.mapLayout.length - 11) + this.spriteScale / 2, this.spriteScale * (this.mapLayout[this.mapLayout.length - 1].length - 2) + this.spriteScale / 2, this.spriteScale * 0.5, this.spriteScale * 0.5);
        this.player.shapeColor = color(0, 255, 0);
        this.player.health = 100;

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
                    var e = new Enemy(this.enemyHP, this.enemyColor, this.enemyDamage,
                        createSprite(j * this.spriteScale + this.spriteScale / 2, i * this.spriteScale + this.spriteScale / 2,
                            this.spriteScale * 0.75, this.spriteScale * 0.75));
                    e.sprite.shapeColor = this.enemyColor;
                    this.enemies.push(e);
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
            this.playerShoot(this.player, 5);
            lootbox.junk -= this.cost1;
            this.cooldown = 0;
        }
        else if (keyDown('2') && lootbox.common >= this.cost2 && this.cooldown > this.cooldownTime) {
            this.playerShoot(this.player, 50);
            lootbox.common -= this.cost2;
            this.cooldown = 0;
        }
        else if (keyDown('3') && lootbox.uncommon >= this.cost3 && this.cooldown > this.cooldownTime) {
            this.playerShoot(this.player, 100);
            lootbox.uncommon -= this.cost3;
            this.cooldown = 0;
        }
        else if (keyDown('4') && lootbox.rare >= this.cost4 && this.cooldown > this.cooldownTime) {
            this.playerShoot(this.player, 200);
            lootbox.rare -= this.cost4;
            this.cooldown = 0;
        }
        else if (keyDown('5') && lootbox.superRare >= this.cost5 && this.cooldown > this.cooldownTime) {
            this.playerShoot(this.player, 500);
            lootbox.superRare -= this.cost5;
            this.cooldown = 0;
        }
        else if (keyDown('6') && lootbox.ultraRare >= this.cost6 && this.cooldown > this.cooldownTime) {
            this.playerShoot(this.player, 5000000);
            lootbox.ultraRare -= this.cost6;
            this.cooldown = 0;
        }

        //stop player at wall
        this.player.collide(this.walls);

        //destroy projectiles on wall collision
        for (var i = 0; i < this.playerProjectiles.size(); i++)
            if (this.playerProjectiles[i].collide(this.walls)) {
                this.playerProjectiles[i].remove();
                this.playerProjectilesDmg = this.playerProjectilesDmg.shiftAtIndex(i);
            }

        //iterate through all projectiles to check for collision with enemies
        for (var j = 0; j < this.enemies.length; j++) {
            //might as well update enemy per frame as well
            this.enemies[j].shoot();
            //if (this.enemies[j].projectiles.size() > 0)
            this.enemies[j].checkCollision();

            for (var i = 0; i < this.playerProjectiles.size(); i++) {
                if (this.playerProjectiles[i].overlap(this.enemies[j].sprite)) {
                    this.enemies[j].sprite.health -= this.playerProjectilesDmg[i];
                    console.log(this.enemies[j].sprite.health);
                    //remove projectile information from both arrays
                    this.playerProjectiles[i].remove();
                    this.playerProjectilesDmg = this.playerProjectilesDmg.shiftAtIndex(i);
                    i--;
                }
            }
        }

        //kill enemies if they have <0 hp
        //this is done separately to avoid undefineds during collision checking
        for (var j = 0; j < this.enemies.length; j++)
            if (this.enemies[j].sprite.health <= 0) {
                console.log("dead enemy");
                this.enemies[j].die();
                this.enemies = this.enemies.shiftAtIndex(j);
                j--;
            }

        //end adventure on touching end
        if (this.player.overlap(this.end)) {
            postAdventureMessage = 'YOU WON!';
            if (adventuresTaken < newAdventures.length) {
                adventuresTaken++;
                adventureoptions.innerHTML += "<option value=" + newAdventures[adventuresTaken] + ">" + newAdventures[adventuresTaken] + "</option>";
            }
            this.endAdventure();
        }
        else if (this.player.health <= 0) {
            postAdventureMessage = 'YOU DIED.';
            this.endAdventure();
        }
        drawSprites();
    }

    endAdventure() {
        currentAdventure = null;
        this.walls.removeSprites();
        this.playerProjectiles.removeSprites();
        this.playerProjectilesDmg = null;
        this.player.remove();
    }

    playerShoot(source, damage) {
        var projectile = createSprite(source.position.x, source.position.y, 10, 10);

        var a = atan2(mouseY - source.position.y, mouseX - source.position.x);
        projectile.setSpeed(this.playerMoveSpeed * 2, degrees(a));
        projectile.shapeColor = color(0);
        projectile.life = 100;
        this.playerProjectiles.add(projectile);
        this.playerProjectilesDmg.push(damage);
    }
}


var currentAdventure;
var postAdventureMessage = '';
var adventuresTaken = 0;
var newAdventures = ["Boring", "Average", "Exciting", "E P I C"];

function setup() {
    createCanvas(480, 480);

}

function draw() {
    if (currentAdventure != null)
        currentAdventure.draw();
    else {
        background(26, 24, 26);
        textAlign(CENTER, CENTER);
        textSize(30);
        fill(255);
        text(postAdventureMessage, 240, 240);
    }
}

function adventureStart() {
    if (currentAdventure != null)
        currentAdventure.endAdventure();
    lootbox.uberRare -= 1;
    var strUser = adventureoptions.options[adventureoptions.selectedIndex].value;
    var oo = false;
    var WW = true;
    var en = 2;
    var pk = 3;
    if (strUser == "Boring") {
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
        ], 15, 2, color(255, 255, 255));
        currentAdventure.setup();
        //loop();
    }
    else if (strUser == "Average") {
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
        ], 50, 10, color(0, 200, 0));
        currentAdventure.setup();
    }
    else if (strUser == "Exciting") {
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
        ], 200);
        currentAdventure.setup();
    }
    else if (strUser == "E P I C") {
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
        ], 1000);
        currentAdventure.setup();
    }
    else
        console.log("adventure selection not found");
}

class Enemy {
    constructor(hp, color, damage, sprite) {
        this.hp = hp;
        this.color = color;
        this.cooldown = currentAdventure.fr * 2;
        this.cooldownTime = currentAdventure.fr * 2 / 3;
        this.range = 150;
        this.sprite = sprite;
        this.sprite.health = hp;
        this.position;
        this.projectiles = new Group();
        this.damage = damage;
    }

    die() {
        this.sprite.remove();
        //this.projectiles.removeSprites();
        //this.projectiles = null;
    }

    checkCollision() {
        //check for wall collision
        for (var i = 0; i < this.projectiles.size(); i++)
            if (this.projectiles[i].collide(currentAdventure.walls)) {
                this.projectiles[i].remove();
                i--;
            }

        //check for player collision
        for (var i = 0; i < this.projectiles.size(); i++)
            if (this.projectiles[i].overlap(currentAdventure.player)) {
                currentAdventure.player.health -= this.damage;
                console.log('player hp ' + currentAdventure.player.health);
                this.projectiles[i].remove();
                i--;
            }
    }

    shoot() {
        var d = int(dist(currentAdventure.player.position.x, currentAdventure.player.position.y,
            this.sprite.position.x, this.sprite.position.y));
        this.cooldown++;

        if (d < this.range && this.cooldown > this.cooldownTime) {
            this.cooldown = 0;
            var projectile = createSprite(this.sprite.position.x, this.sprite.position.y, 12, 12);

            var a = atan2(currentAdventure.player.position.y - this.sprite.position.y,
                currentAdventure.player.position.x - this.sprite.position.x);
            projectile.setSpeed(currentAdventure.playerMoveSpeed * 1.5, degrees(a));
            projectile.shapeColor = this.color;
            projectile.life = 100;
            this.projectiles.add(projectile);
        }
    }
}


// shoot() {
//     for (var i = 0; i < this.enemies.size(); i++) {
//         var d = int(dist(this.player.position.x, this.player.position.y, this.enemies[i].position.x, this.enemies[i].position.y));
//         if (d < this.enemyRange) {
//             var projectile = createSprite(this.enemies[i].position.x, this.enemies[i].position.y, 12, 12);

//             var a = atan2(this.player.position.y - this.enemies[i].position.y, this.player.position.x - this.enemies[i].position.x);
//             projectile.setSpeed(this.playerMoveSpeed * 1.5, degrees(a));
//             projectile.shapeColor = this.enemyColor;
//             this.enemyProjectiles.add(projectile);
//         }
//     }

// }