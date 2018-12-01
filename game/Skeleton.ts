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

    public Initialize() : void
    {
        super.Initialize();

        this.scale = 6;
    }

    public setContent(context) : void
    {
        this.Idle = new Animation(context, "../assets/spritesheets/skeleton/skeletonidle.png", 24, 32, 11, 10);
        this.Walk = new Animation(context, "../assets/spritesheets/skeleton/skeletonwalk.png", 22, 33, 13, 10);
        this.setAnimation(State.Idle);
    }

    public setAnimation(NewState : State) : void
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

    public Update(TimePassed : number) : void
    {
        this.Current.Update(TimePassed);
    }

    public Draw(Batch : SpriteBatch) : void
    {
        
        const destination = new Rectangle(this.x, this.y, this.Current.GetWidth()*this.scale, this.Current.GetHeight()*this.scale);

        Batch.QueueDraw(this.Current.GetTexture(), destination, this.Current.GetRectangle());
    }

    
}

export = Skeleton;