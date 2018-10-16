
 
const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;

let timer;
let player; 
let aliens;

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

}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop);
}

