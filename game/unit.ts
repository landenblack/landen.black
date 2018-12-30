import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Vector2D = require("./Vector2D");

class Unit
{
    protected position : Vector2D;
    protected velocity : Vector2D;
    protected scale    : Vector2D;
    protected downkeys : Set<string>;

    public constructor(position : Vector2D, velocity : Vector2D, scale : Vector2D, downkeys : Set<string>) 
    {
        this.position = position;
        this.velocity = velocity;
        this.scale    = scale;

        this.downkeys = downkeys;
    }

    public Update(TimePassed : number) : void
    {
        this.position.x += this.velocity.x * TimePassed;
        this.position.y += this.velocity.y * TimePassed;
    }

    public SetVelocity(dx : number, dy : number) : void
    {
        this.velocity.x = dx;
        this.velocity.y = dy;
    }
}

export = Unit;