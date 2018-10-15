function createPlayer() {
    //
 const player = {
    x : 100,
    y : 450,
    speed : 3,
    lives : 3,
    sprite : {
        img : spritesheet,
        offsetX : 88,
        offsetY : 3,
        width : 28,
        height : 16
    },
    bullet : null,
};
    return player;
}

//brackets[]
// curly brackets ()


function animatePlayer() {

    //mouvement du joueur 
    if(Keyboard.RIGHT){
        player.x += player.speed;
    
    }
    if(Keyboard.LEFT){
        player.x -= player.speed;
    
    }

    //gestion du débordement de l'érand du joueur
 if (player.x < 0) {
     player.x = 0;
 }
else if (player.x +  player.sprite.width > canvas.width) {
    player.x = canvas.width - player.sprite.width;
}
if (Keyboard.SPACE) {
    if ( player.bullet === null){
        player.bullet = {
            x : player.x + player.sprite.width / 2,
            y : player.y,
            width : 4,
            height : 15,
            color : '#0f0',
            speed : 9,
        };
    }
}

if(player.bullet !== null) {
    player.bullet.y -= player.bullet.speed;

    if ( player.bullet.y + player.bullet.height < 0) {
        player.bullet = null;
    }
}

}



function renderPlayer() {
    // dessin du joueur a ses coordonnées 
    context.drawImage(
        player.sprite.img,
        player.sprite.offsetX,
        player.sprite.offsetY,
        player.sprite.width,
        player.sprite.height,

        player.x,
        player.y,
        player.sprite.width,
        player.sprite.height,
    );
   // dessin shoot joueur
        if( player.bullet !== null) {
            context.fillStyle = player.bullet.color;
            context.fillRect(
            player.bullet.x,
            player.bullet.y,
            player.bullet.width,
            player.bullet.height,
            
            )
            
        }    
    


}