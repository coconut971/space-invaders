
 
const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;

let timer;
let player; 

//chargement d'images sprite avant de démarrer le jeu

const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png'
spritesheet.onload = function() { // fonction exécutée lorsque le navigateur a fini de chrger de
    player = createPlayer();

    //démarrage de la boucle continue 
    gameloop();


}

function update() {
    animatePlayer(); // fonction qui gère l'animation du joueur 

}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderPlayer(); // dessin du joueur 

}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop);
}

