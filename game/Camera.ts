import Vector2D = require("./Vector2D");

class Camera
{
    protected position : Vector2D;
    protected velocity : Vector2D;
    protected region   : Vector2D;
    protected screen   : Vector2D;
    protected downkeys : Set<string>;
    protected speed    : number;

    public constructor(position : Vector2D, speed : number, region : Vector2D, screen : Vector2D, downkeys : Set<string>) 
    {
        this.position = position;
        this.velocity = new Vector2D(0, 0);
        this.region   = region;
        this.screen   = screen;
        this.speed    = speed;
        this.downkeys = downkeys;
    }

    public GetPosition() : Vector2D
    {
        return new Vector2D(this.position.x, this.position.y);
    }

    public GetRegion() : Vector2D
    {
        return new Vector2D(this.region.x, this.region.y);
    }

    public GetScreen() : Vector2D
    {
        return new Vector2D(this.screen.x, this.screen.y);
    }
    

    public Update(TimePassed : number) : void
    {
        let dx = 0;
        let dy = 0;

        if (this.downkeys.has('ArrowUp')) {
            dy -= 1;
        }
        if (this.downkeys.has('ArrowDown')) {
            dy += 1;
        }
        if (this.downkeys.has('ArrowRight')) {
            dx += 1;
        }
        if (this.downkeys.has('ArrowLeft')) {
            dx -= 1;
        }

        const length = Math.sqrt(dx*dx + dy*dy);
        if (length === 0) {
            this.SetVelocity(0, 0);
        } else {
            this.SetVelocity(dx*this.speed/length, dy*this.speed/length);
        }

        this.position.x += this.velocity.x * TimePassed;
        this.position.y += this.velocity.y * TimePassed;
    }

    public SetVelocity(dx : number, dy : number) : void
    {
        this.velocity.x = dx;
        this.velocity.y = dy;
    }
}

export = Camera;