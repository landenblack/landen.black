class Player 
{
    constructor(tetris)
    {
        this.tetris = tetris;
        this.arena = tetris.arena;
        this.baseInterval = 1000;
        this.limitAtBottom = 2000;

        this.events = new Events();

        this.dropCounter = 0;
        this.dropInterval = this.baseInterval;

        this.inputCounter = 0;
        this.inputInterval = 60;

        this.heldTime = 0;
        this.heldDelay = 250;
        
        this.pos =  {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
        this.projection = null;
        this.input = 'none';
        this.key = null;
        this.level = 0;
        this.levelMultiplier = 100;
        this.timeAtBottom = this.limitAtBottom;
        this.timeSinceLastInput = 0;

        this.reset();
    }

    createPiece(type) 
    {
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

    doInput() 
    {
        if (this.input === 'left') {
            this.move(-1);
        } else if (this.input === 'right') {
            this.move(1);
        } else if (this.input === 'cw') {
            this.rotate(1);
        } else if (this.input === 'ccw') {
            this.rotate(-1);
        } else if (this.input === 'drop') {
            this.drop();
        } else if (this.input === 'bottom') {
            this.fullDrop();
        }
        this.timeSinceLastInput = 0;
        this.inputCounter = 0;
    }

    drop() 
    {
        this.pos.y++;
        this.timeAtBottom += this.dropCounter;
        this.dropCounter = 0;
        if (this.arena.collide(this)) {
            if ( this.timeAtBottom < this.limitAtBottom ) {
                this.pos.y--;
                return;
            }
            this.pos.y--;
            this.arena.merge(this);
            this.reset();
            this.score += this.arena.sweep();
            this.tetris.updateScore();
            this.events.emit('score', this.score);
            return;
        } 
        this.timeAtBottom = this.limitAtBottom;
        this.events.emit('pos', this.pos);
    }

    fullDrop() 
    {
        while (!this.arena.collide(this)) {
            this.pos.y++;
        }
        this.pos.y--;
        this.arena.merge(this);
        this.reset();
        this.score += this.arena.sweep();
        this.tetris.updateScore();
        this.events.emit('score', this.score);

        this.dropCounter = 0;
    }

    move(dir) 
    {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.resetTimeAtBottom();
            this.pos.x -= dir;
            return;
        }
        this.events.emit('pos', this.pos);
    }

    reset() 
    {
        const pieces = 'IJLOSTZ';
        this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].lenght / 2 | 0) - (this.matrix[0].lenght / 2 | 0);
        this.updateProjection();   
        if (this.arena.collide(this)) {
            this.arena.clear();
            this.score = 0;
            this.events.emit('score', this.score);
        }
        this.updateLevel();
        this.events.emit('pos', this.pos);
        this.events.emit('matrix', this.matrix);
    }

    resetTimeAtBottom()
    {
        if (this.timeAtBottom >= this.limitAtBottom) {
            this.timeAtBottom = 0;
        }
    }

    rotate(dir) 
    {
        const pos = this.pos.x;
        let offset = 1;
        this.rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this.rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
        this.resetTimeAtBottom();
        this.updateProjection();
        this.events.emit('matrix', this.matrix);
    }

    rotateMatrix(matrix, dir) 
    {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y], 
                    matrix[y][x]
                ] = [
                    matrix[y][x], 
                    matrix[x][y]
                ];
            }
        }
    
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    update(deltaTime)
    {
        this.dropCounter += deltaTime;
        this.timeSinceLastInput += deltaTime;
        if (this.dropCounter > this.dropInterval) { // hard drop ticks
            this.drop();
        }
        this.inputCounter += deltaTime;
        if (this.input !== 'none' && this.inputCounter > this.inputInterval) { // input ticks
            this.heldTime += deltaTime;
            if (this.heldTime > this.heldDelay) {
                this.doInput();
            }
        }
    }

    updateInput(direction) 
    {
        if (this.direction !== 'none' && this.direction !== direction) {
            this.heldTime = 0;
        }

        this.input = direction;
        this.doInput();
    }

    updateLevel()
    {
        this.level = this.score / 100 | 0;
        if (this.level >= 10) {
            this.dropInterval = 100;
        } else {
            this.dropInterval = this.baseInterval - (this.levelMultiplier * this.level);
        }
    }

    
    updateProjection() 
    {
        const projection = new Arena(this.matrix[0].length, this.matrix.length).matrix;
        
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0 || (projection[y-1] && projection[y-1][x] !== 0)) {
                    projection[y][x] = 8;
                } else {
                    projection[y][x] = 0;
                }
            });
        });
    
        while (projection.length < this.arena.matrix.length) {
            projection.push(projection[projection.length-1]);
        }
    
        this.projection = projection;
    }
}


