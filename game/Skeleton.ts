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

    private Idle    : Animation;
    private Walk    : Animation;
    private Current : Animation;
    private speed   : number;

    public constructor(downkeys : Set<string>)
    {
        super(downkeys);

        this.speed = 50;
        this.scale = 6;
    }

    public SetAnimation(NewState : State) : void
    {
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

        this.SetVelocity(xv*this.speed, yv*this.speed);
        

        super.Update(TimePassed);
        this.Current.Update(TimePassed);
    }

    public Draw(Batch : SpriteBatch) : void
    {
        const destination = new Rectangle(this.x, this.y, this.Current.GetWidth()*this.scale, this.Current.GetHeight()*this.scale);
        Batch.QueueDraw(this.Current.GetTexture(), destination, this.Current.GetRectangle());
    }

    
}

export = Skeleton;