
const aliensMap = [
    40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,

    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,

    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,

]

const NB_ALIENS_PER_LINE = 11;
const ALIEN_SPACE_X = 35;
const ALIEN_SPACE_Y = 28;
let aliensTimer = 1000;
let lastAlienMovement = 0;
let alienExplosion = []; // Tableau pour afficher sprite explosion
let alienSoundNb = 1;
let aliensShoot = [];


const aliensSprites = {
    '40': [
        { x: 6, y: 3, width: 16, height: 16 },
        { x: 6, y: 25, width: 16, height: 16 },
     ],
    '20': [

        { x: 32, y: 3, width: 22, height: 16 },
        { x: 32, y: 25, width: 22, height: 16 },
    ],
    '10': [
        { x: 60, y: 3, width: 24, height: 16 },
        { x: 60, y: 25, width: 24, height: 16 },

    ]
}


function createAliens() {
    const aliens = [];

    for (let i = 0, line = 0; i < aliensMap.length; i++) {
        if (i % NB_ALIENS_PER_LINE === 0) {
            line++;
        }

        let alienWidth = aliensSprites[aliensMap[i]][0].width;
        let alienHeight = aliensSprites[aliensMap[i]][0].height;


        aliens.push({
            x: 12 + i % NB_ALIENS_PER_LINE * ALIEN_SPACE_X + ( 24 - alienWidth) / 2 | 0,
            y: 100 + line * ALIEN_SPACE_Y,
            width: alienWidth,
            height: alienHeight,
            points: aliensMap[i],
            direction: 1,
            spriteIndex: 1,
        });
    }
    return aliens;

}



function animateAliens() {

    if (Date.now() - lastAlienMovement > aliensTimer) {
        lastAlienMovement = Date.now(); //mise a jour de l'instant du dernier mouvement du joueur à "maintenant" 

        /*sounds['invader' + alienSoundNb].play();
        alienSoundNb++;
        if (alienSoundNb > 4) {
            alienSoundNb = 1;
        }*/
        
        let extremeDownAlien = Math.max(...aliens.map(a => a.y));
        if (extremeDownAlien + 16 > player.y) {
            player.lives = 0;
            sounds['player_death'].play();
            game_mode = MODE_GAME_OVER;
        }

        // récupération du x de l'alien le plus à droite( et à gauche )

        let extremeRightAlien = Math.max(...aliens.map(a => a.x)) + ALIEN_SPACE_X;
        let extremeLeftAlien = Math.min(...aliens.map(a => a.x));

        // parcours du tableau d'aliens pour mise à jour 
        for (let i = 0; i < aliens.length; i++) {
            
            if(Math.random()> 0.99) {
                createAlienShoot(aliens[i]);
            }
            if (
                extremeRightAlien > canvas.width && aliens[i].direction === 1 ||
                extremeLeftAlien <= 0 && aliens[i].direction === -1
            ) {
                aliens[i].direction *= -1;
                aliens[i].y += 22;
            }
            else {
                aliens[i].x += 12 * aliens[i].direction;
            }
            aliens[i].spriteIndex = (aliens[i].spriteIndex === 0) ? 1 : 0;
            /*if (aliens[i].spriteIndex = 0) {
                aliens[i].spriteIndex = 1;

            } else {
                aliens[i].spriteIndex = 0;
            }*/


        }


    } // fin du mouvement des aliens   

    //vérification si un alien se prend un tir de "palyer.bullet"
    if (player.bullet !== null) {
        for (let i = 0; i < aliens.length; i++) {
            if (player.bullet.x > aliens[i].x &&
                player.bullet.x <= aliens[i].x + aliens[i].width &&
                player.bullet.y > aliens[i].y &&
                player.bullet.y <= aliens[i].y + aliens[i].height) {
                // collision
                createExplosion(aliens[i]); 
                // argumentation du score du joueur
                player.score += aliens[i].points;
                player.bullet = null;
                // argumentation de la vitesse générale des aliens
                aliensTimer -= 15;
                if (aliensTimer < 75) {
                    aliensTimer = 75;
                }
                //suprression de l'alien  du tableau 
                aliens.splice(i, 1);
                break;

            }
        }
    }

    //suppression de l'animation explosion
    for (let i = 0; i < alienExplosion.length; i++) {
        if (Date.now() - alienExplosion[i].dateCreated > 100) {
            alienExplosion.splice(i, 1);
            i--;
        }
    }

    //gestion de shoot d'aliens
    for(let i = 0; i < aliensShoot.length; i++) {
        aliensShoot[i].y += aliensShoot[i].speed;
        // si un tir d'alien déborde en bas du canvas
        if (aliensShoot[i].y > canvas.height) {
            aliensShoot.splice(i, 1);
            i--;
        }
        else if (
            aliensShoot[i].x > player.x &&
            aliensShoot[i].x + aliensShoot[i].width + player.sprite.width &&
            aliensShoot[i].y + aliensShoot[i].height > player.y &&
            aliensShoot[i].y > player.y + player.sprite.height
        ) {
            //moins une vie 
            player.lives--;

            // Plus de vies ?
            if(player.lives === 0) {
                game_mode = MODE_GAME_OVER;
                break;
            }
            // suppression des tirs aliens en cours, et du shoot player
            aliensShoot.length = 0; // vide l'array en javascript
            player.bullet = null;

            sounds['player_death'].play();


            // changement du mode de jeu pour 2 secondes 
            game_mode = MODE_PLAYER_DEAD;
            setTimeout(() => {
                //remplacement du joueur à sa position initile 
                player.x = 100;

                game_mode = MODE_PLAYING;
            },2000);
        }  
    }

}




function renderAliens() {
    for (let i = 0; i < aliens.length; i++) {

        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;

        context.drawImage(
            spritesheet,
            aliensSprites[points][spriteIndex].x,
            aliensSprites[points][spriteIndex].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,

            aliens[i].x,
            aliens[i].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,

        )
    }
    // Dessin des explosions
    for (let i = 0; i < alienExplosion.length; i++) {
        //son
        sounds['invader_killed'].play();
        context.drawImage(
            spritesheet,
            alienExplosion[i].sprite.x,
            alienExplosion[i].sprite.y,
            alienExplosion[i].sprite.width,
            alienExplosion[i].sprite.height,
            alienExplosion[i].x,
            alienExplosion[i].y,
            alienExplosion[i].sprite.width,
            alienExplosion[i].sprite.height
        );
    }
    for( let i = 0; i < aliensShoot.length; i ++) {
        context.fillStyle = '#fff';
        context.fillRect(aliensShoot[i].x, aliensShoot[i].y, aliensShoot[i].width, aliensShoot[i].height)
    }
}



function createExplosion(alien) {
    alienExplosion.push({
        x : alien.x,
        y : alien.y,
        sprite : {
            x : 88,
            y : 25,
            width : 26,
            height : 16
        },
        dateCreated : Date.now()
    });
}
 
function createAlienShoot(aliens) {
    //shoot
    sounds['shoot'].play();
    //ajout d'un shoot d'alien dans le tableau correspondant 
    aliensShoot.push({
        x : aliens.x + aliens.width/2,
        y : aliens.y + aliens.height,
        width : 4, 
        height : 10,
        speed : 5
 
    }) ;
}