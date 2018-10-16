
const aliensMap = [
    '40', '40', '40', '40', '40', '40', '40', '40', '40', '40', '40', 

    '20', '20', '20', '20', '20', '20', '20', '20', '20', '20', '20',
    '20', '20', '20', '20', '20', '20', '20', '20', '20', '20', '20',

    '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', 
    '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', '10', 

]

const NB_ALIENS_PER_LINE = 11;
const ALIEN_SPACE_X = 35;
const ALIEN_SPACE_Y = 28;

const aliensSprites = {
        '40' : [
                { x : 6, y : 3, w : 16, h : 16},
                { x : 6, y : 25, w : 16, h : 16},
            
        ],
        '20' : [
    
                { x : 32, y : 3, w : 22, h : 16},
                { x : 32, y : 25, w : 22, h : 16},
        ],
        '10' : [
                { x : 60, y : 3, w : 24, h : 16},
                { x : 60, y : 25, w : 24, h : 16},
            
        ]
    }
    

    function createAliens() {
     const aliens = [];

     for( let i = 0, line = 0; i < aliensMap.length; i++) {
         if (i % NB_ALIENS_PER_LINE === 0) {
             line++;
         }

         let alienWidth = aliensSprites[aliensMap[i][ 0 ].width];
         let alienHeight = aliensSprites[aliensMap[i][ 0 ].height];


         aliens.push({
             x : 10 + i % NB_ALIENS_PER_LINE * ALIEN_SPACE_X,
             y : 100 + line * ALIEN_SPACE_Y,
             width : alienWidth,
             height : alienHeight,
             points : aliensMap[i],
             spriteIndex : 0,
         });
     }
    return aliens; 
    
}



function animateAliens() {

}



function renderAliens() {
    for(let i = 0; i < aliens.length; i++) {

        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;

        context.drawImage(
            spritesheet,
            aliensSprites[points][ spriteIndex].x,
            aliensSprites[points][ spriteIndex].y,
            aliensSprites[points][ spriteIndex].w,
            aliensSprites[points][ spriteIndex].h,
            
            aliens[i].x,
            aliens[i].y,
            aliensSprites[points][ spriteIndex].w,
            aliensSprites[points][ spriteIndex].h,

        )
    }
}