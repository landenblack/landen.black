import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");

class Unit
{
    protected x : number;
    protected xv : number;
    protected y : number;
    protected yv : number;
    protected scale  : number;
    protected downkeys : Set<string>;

    public constructor(downkeys : Set<string>) 
    {
        this.x = 100;
        this.y = 100;
        this.xv = 1;
        this.yv = 1;

        this.downkeys = downkeys;
        this.scale = 1;

    }

    public Update(TimePassed : number) : void
    {
        this.x += this.xv * TimePassed;
        this.y += this.yv * TimePassed;
    }

    public SetVelocity(xv : number, yv : number) : void
    {
        this.xv = xv;
        this.yv = yv;
    }
}

export = Unit;