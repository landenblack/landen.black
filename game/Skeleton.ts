import Rectangle   = require("../MOEnjs/Rectangle");
import Unit        = require("./unit");
import Animation   = require("./Animation");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");

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

    public constructor(downkeys : Set<string>)
    {
        super(downkeys);

        this.left  = false;
        this.speed = 50;
        this.scale = 6;
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
        let xv = 0;
        let yv = 0;

        if (this.downkeys.has('ArrowUp')) {
            yv -= 1;
        }
        if (this.downkeys.has('ArrowDown')) {
            yv += 1;
        }
        if (this.downkeys.has('ArrowRight')) {
            xv += 1;
        }
        if (this.downkeys.has('ArrowLeft')) {
            xv -= 1;
        }

        const length = Math.sqrt(xv*xv + yv*yv);
        if (length === 0) {
            this.SetAnimation(State.Idle);
            this.SetVelocity(0, 0);
        } else {
            this.SetAnimation(State.Walk);
            this.SetVelocity(xv*this.speed/length, yv*this.speed/length);
        }

        super.Update(TimePassed);
        if (xv < 0) {
            this.left = true;
        } else if (xv > 0) {
            this.left = false;
        }
        this.Current.Update(TimePassed);

    }

    public Draw(Batch : SpriteBatch) : void
    {
        const destination = new Rectangle(
            this.x - (this.left ? -1 : 1) * this.Current.GetWidth() * this.scale / 2, 
            this.y - (this.left ? -1 : 1) * this.Current.GetHeight() * this.scale, 
            (this.left ? -1 : 1) * this.Current.GetWidth() * this.scale, 
            this.Current.GetHeight() * this.scale
        );
        Batch.QueueDraw(this.Current.GetTexture(), destination, this.Current.GetRectangle());
    }

    
}

export = Skeleton;