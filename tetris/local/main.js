function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
        ];
    }
}


const keyListener = (event) => {
    var keys =
    [
        [65, 68, 81,  87,  69,  83, 32],
        [37, 39, 188, 190, 38, 40, 13],
    ];

    keys.forEach((key,index) => { 
        const player = tetri[index].player;

        if (event.type === 'keyup' && keys[index].indexOf(event.keyCode) !== -1) {
            player.input = 'none';
            player.heldTime = 0;
        }

        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.updateInput('left');
            } else if (event.keyCode === key[1]) {
                player.updateInput('right');
            } else if (event.keyCode === key[2]) {
                player.updateInput('ccw');
            } else if (event.keyCode === key[3] || event.keyCode === key[4] ) {
                player.updateInput('cw');
            } else if (event.keyCode === key[5]) {
                player.updateInput('drop');
            } else if (event.keyCode === key[6]) {
                player.updateInput('bottom');
            }
        }
    });    
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);

const tetri = [];
const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
});
