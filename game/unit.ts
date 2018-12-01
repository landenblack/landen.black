import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");

class Unit
{
    protected x : number;
    protected xv : number;
    protected y : number;
    protected yv : number;
    protected scale  : number;

    public Initialize() : void
    {
        this.x = 100;
        this.y = 100;
        this.xv = 1;
        this.yv = 1;

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