
 
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
    animatePlayer(); // fonction qui gère l'animation du joueur 
    animateAliens(); // fonction qui gère l'animation des aliens 

}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderPlayer(); // dessin du joueur 
    renderAliens(); // dessin des aliens
    renderUI();

}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop);
}

