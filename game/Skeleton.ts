import Rectangle   = require("../MOEnjs/Rectangle");
import Unit        = require("./unit");
import Animation   = require("./Animation");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Vector2D    = require("./Vector2D");
import Camera      = require("./Camera")

enum State {
    Idle, 
    Walk,
}

class Skeleton extends Unit
{
    static readonly State = State;

    private CurrentState : State;

    private Idle    : Animation;
    private Walk    : Animation;
    private Current : Animation;
    private speed   : number;
    private left    : boolean;

    public constructor(position : Vector2D, downkeys : Set<string>)
    {
        super(position, new Vector2D(0, 0), new Vector2D(1.35, 1.8), downkeys);

        this.left  = false;
        this.speed = 3;
    }

    public SetAnimation(NewState : State) : void
    {
        if (this.CurrentState === NewState) return;
        this.CurrentState = NewState;

        switch(NewState){
            case State.Idle: {
                this.Current = this.Idle;
                break;
            }
            case State.Walk: {
                this.Current = this.Walk;
                break;
            }
        }
        this.Current.Reset();
    }

    public SetContent(context) : void
    {
        this.Idle = new Animation(context, "../assets/spritesheets/skeleton/skeletonidle.png", 24, 32, 11, 10);
        this.Walk = new Animation(context, "../assets/spritesheets/skeleton/skeletonwalk.png", 22, 33, 13, 10);
        this.SetAnimation(State.Idle);
    }

    public Update(TimePassed : number) : void
    {
        let dx = 0;
        let dy = 0;

        if (this.downkeys.has('w')) {
            dy -= 1;
        }
        if (this.downkeys.has('s')) {
            dy += 1;
        }
        if (this.downkeys.has('d')) {
            dx += 1;
        }
        if (this.downkeys.has('a')) {
            dx -= 1;
        }

        const length = Math.sqrt(dx*dx + dy*dy);
        if (length === 0) {
            this.SetAnimation(State.Idle);
            this.SetVelocity(0, 0);
        } else {
            this.SetAnimation(State.Walk);
            this.SetVelocity(dx*this.speed/length, dy*this.speed/length);
        }

        super.Update(TimePassed);
        if (dx < 0) {
            this.left = true;
        } else if (dx > 0) {
            this.left = false;
        }
        this.Current.Update(TimePassed);
    }

    public Draw(Batch : SpriteBatch, Camera : Camera) : void
    {
        const CameraSpace = this.position.Subtract(Camera.GetPosition());
        const TopLeft = CameraSpace.Add(new Vector2D(-this.scale.x/2, this.scale.y));
        const NDCTopLeft = new Vector2D(TopLeft.x / (Camera.GetRegion().x / 2), TopLeft.y / (Camera.GetRegion().y / 2));
        const NDCSize = new Vector2D(this.scale.x / (Camera.GetRegion().x / 2), this.scale.y / (Camera.GetRegion().y / 2));
        const destination = new Rectangle(
            (( NDCTopLeft.x + 1) / 2 ) * Camera.GetScreen().x,
            ((-NDCTopLeft.y + 1) / 2 ) * Camera.GetScreen().y,
            ((        NDCSize.x) / 2 ) * Camera.GetScreen().x,
            ((        NDCSize.y) / 2 ) * Camera.GetScreen().y,
        );

        let source = this.Current.GetRectangle();

        if (this.left) {
            source = new Rectangle(
                source.X + source.Width, 
                source.Y, 
                -source.Width, 
                source.Height
            );
        }
        
        Batch.QueueDraw(this.Current.GetTexture(), destination, source);
    }

    
}

export = Skeleton;