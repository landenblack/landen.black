class Tetris 
{
    constructor(element) 
    {
        this.element = element;
        this.canvas = element.querySelector('canvas');

        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);

        this.arena = new Arena(12, 20);
        this.player = new Player(this);

        this.colors = [
            null,
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF',
            '#101010',
        ]

        let lastTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);

            this.draw();
            requestAnimationFrame(update);
        }
        update();
        this.updateScore(0);
    }

    draw() 
    {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMatrix(this.player.projection, this.player.pos);
        this.drawMatrix(this.player.matrix, this.player.pos);
        this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
    }

        

    drawMatrix(matrix, offset) 
    {
        if (matrix) {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        this.context.fillStyle = this.colors[value];
                        this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                    }
                });
            });
        }
    }

        

    updateScore(score) 
    {
        this.player.updateLevel();
        this.element.querySelector('.score').innerText = score;
    }
}