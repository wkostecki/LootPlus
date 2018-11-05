var walls;
var projectiles;
var projectilesDmg;
var player;
var playerMoveSpeed = 2;
var enemies;
var end;
var fr = 30;

//shoot ability costs
const cost1 = 10;
const cost2 = 50;
const cost3 = 200;
const cost4 = 800;
const cost5 = 800;
const cost6 = 500;

var cooldown = fr;
const cooldownTime = fr/3;
const ooo = false;
const WWW = true;
const enm = 2;
const pic = 3;
const spriteScale = 40;
const mapLayout = [
    [WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW],
    [WWW, ooo, ooo, ooo, WWW, ooo, ooo, enm, ooo, ooo, ooo, WWW],
    [WWW, ooo, WWW, ooo, WWW, ooo, WWW, WWW, WWW, WWW, ooo, WWW],
    [WWW, ooo, WWW, ooo, ooo, ooo, WWW, ooo, WWW, WWW, ooo, WWW],
    [WWW, ooo, WWW, ooo, WWW, WWW, ooo, enm, ooo, WWW, ooo, WWW],
    [WWW, ooo, WWW, enm, WWW, WWW, ooo, WWW, ooo, WWW, enm, WWW],
    [WWW, ooo, WWW, ooo, WWW, WWW, ooo, WWW, pic, WWW, ooo, WWW],
    [WWW, ooo, WWW, WWW, WWW, WWW, ooo, WWW, WWW, WWW, ooo, WWW],
    [WWW, ooo, WWW, ooo, ooo, ooo, ooo, ooo, ooo, WWW, ooo, WWW],
    [WWW, ooo, WWW, ooo, WWW, WWW, WWW, WWW, enm, WWW, ooo, WWW],
    [WWW, ooo, WWW, ooo, ooo, ooo, ooo, WWW, ooo, ooo, ooo, WWW],
    [WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW, WWW],
]
function setup() {
    var cnv = createCanvas(mapLayout.length * spriteScale, mapLayout[0].length * spriteScale);
    var adv = adventure_canvas.getBoundingClientRect();
    cnv.position(adv.left, adv.top + cnv.height/2);
    frameRate(fr);

    //groups of sprites for iterations
    walls = new Group();
    projectiles = new Group();
    projectilesDmg = new Array();
    enemies = new Group();
    
    //player
    player = createSprite(spriteScale * (mapLayout.length - 11) + spriteScale/2, spriteScale * (mapLayout[mapLayout.length - 1].length - 2) + spriteScale/2, spriteScale * 0.5, spriteScale * 0.5);
    player.shapeColor = color(0, 255, 0);

    //goal
    end = createSprite(spriteScale * (mapLayout.length - 6) + spriteScale/2, spriteScale * (mapLayout[mapLayout.length - 1].length - 2) + spriteScale/2, spriteScale * 0.75, spriteScale * 0.75);
    end.shapeColor = color(0, 0, 255);
    
    //generate map
    for (var i = 0; i < mapLayout.length; i++) {
        for (var j = 0; j < mapLayout[i].length; j++) {

            //WALLS
            if (mapLayout[i][j] == WWW) {
                var w = createSprite(j * spriteScale + spriteScale/2, i * spriteScale + spriteScale/2,
                    spriteScale, spriteScale);
                w.shapeColor = color(99, 71, 51);
                walls.add(w);
            }
            
            //ENEMIES
            if (mapLayout[i][j] == enm) {
                var e = createSprite(j * spriteScale + spriteScale/2, i * spriteScale + spriteScale/2,
                    spriteScale * 0.75, spriteScale * 0.75);
                e.shapeColor = color(255, 0, 0);
                enemies.add(e);
            }
        }
    }
}

function draw() {
    background(180);
    cooldown++;
    //player movement
    if (keyDown('A'))
        player.position.x -= playerMoveSpeed;
    else if (keyDown('D'))
        player.position.x += playerMoveSpeed;

    if (keyDown('W'))
        player.position.y -= playerMoveSpeed;
    else if (keyDown('S'))
        player.position.y += playerMoveSpeed;

    if (keyDown('1') && lootbox.junk >= cost1 && cooldown > cooldownTime)
    {
        shoot(player, 5);
        lootbox.junk -= cost1;
        cooldown = 0;
    }
    else if (keyDown('2') && lootbox.common >= cost2 && cooldown > cooldownTime)
    {
        shoot(player, 50);
        lootbox.common -= cost2;
        cooldown = 0;
    }
    else if (keyDown('3') && lootbox.uncommon >= cost3 && cooldown > cooldownTime)
    {
        shoot(player, 100);
        lootbox.uncommon -= cost3;
        cooldown = 0;
    }
    else if (keyDown('4') && lootbox.rare >= cost4 && cooldown > cooldownTime)
    {
        shoot(player, 200);
        lootbox.rare -= cost4;
        cooldown = 0;
    }
    else if (keyDown('5') && lootbox.superRare >= cost5 && cooldown > cooldownTime)
    {
        shoot(player, 500);
        lootbox.superRare -= cost5;
        cooldown = 0;
    }
    else if (keyDown('6') && lootbox.ultraRare >= cost6 && cooldown > cooldownTime)
    {
        shoot(player, 500);
        lootbox.ultraRare -= cost6;
        cooldown = 0;
    }

    
    player.collide(walls);

    //destroy projectiles on wall collision
    for (var i = 0; i < projectiles.size(); i++)
        if (projectiles.get(i).collide(walls))
            projectiles.get(i).remove();
    drawSprites();
}

function shoot(source, damage) {
    var projectile = createSprite(source.position.x, source.position.y, 10, 10);
    
    var a = atan2(mouseY - source.position.y, mouseX - source.position.x);
    projectile.setSpeed(playerMoveSpeed * 2, degrees(a));
    projectile.shapeColor = color(0);
    projectiles.add(projectile);
    projectilesDmg.push(damage);  
}