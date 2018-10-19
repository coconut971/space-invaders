
 
const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;

let timer;
let player; 
let aliens;
//AJOUT SON
const sounds = {
    invader1            : document.getElementById('invader1'),
    invader2            : document.getElementById('invader2'),
    invader3            : document.getElementById('invader3'),
    invader4            : document.getElementById('invader4'),
    invader_killed      : document.getElementById('invader_killed'),
    shoot               : document.getElementById('shoot'),
    player_death        : document.getElementById('player_death'),
 };
const MODE_PLAYING = 1;
const MODE_GAME_OVER = 2;
let game_mode = MODE_PLAYING;

//chargement d'images sprite avant de démarrer le jeu

const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png'
spritesheet.onload = function() { // fonction exécutée lorsque le navigateur a fini de chrger de
    player = createPlayer();
    aliens = createAliens();

    //démarrage de la boucle continue 
    gameloop();


}

function update() {
    switch(game_mode){
        case MODE_PLAYING :

    animatePlayer(); // fonction qui gère l'animation du joueur 
    animateAliens(); // fonction qui gère l'animation des aliens 
    break;
    }
    
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    switch(game_mode){
        case MODE_PLAYING : 
            renderPlayer(); // dessin du joueur 
            renderAliens(); // dessin des aliens
        break;
    case MODE_GAME_OVER : 
        renderGameOver(); // affichage du game over à l'écran
        break;
    }
    renderUI(); // dessin des éléments de l'interface 

}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop);
}

let go_color = 0;
let go_slize = 0;
function renderGameOver() {
    go_color += 10;
    go_slize = 24 -  (timer % 4);
    context.textAlign = 'center'
    context.fillStyle = 'hsl('+ go_color +', 100%, 50%)' ;
    context.font = 'normal'+ go_slize +'px "Press start 2P" , cursive';
    context.fillText('GAME OVER', canvas.width/2, canvas.height/2);

    context.fillStyle = '';
    context.font = 'normal 16px "Press start 2P", cursive ' ;
    context.fillText('Press F5', canvas.width/2, canvas.height/2 + 30);
}

