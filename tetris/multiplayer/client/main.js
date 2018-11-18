const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('wss://landen.black:8083');

const keyListener = (event) => {
    var keys =
    [
        [37, 39, 81, 87, 38, 40, 32],
    ];

    keys.forEach((key,index) => { 
        const player = localTetris.player;

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