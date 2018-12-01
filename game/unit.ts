import Texture2D   = require("../MOEnjs/Texture2D");
import Rectangle   = require("../MOEnjs/Rectangle");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");

class Unit
{
    private x : number;
    private xv : number;
    private y : number;
    private yv : number;
    private width  : number;
    private height : number;
    private scale  : number;
    public Batch : SpriteBatch;
    private Time : number;
    private Frame : number;


    private idle : Texture2D;
    private FrAmEz : number;
    private currentframe : number;
    private frameWidth : number;
    private frameHeight : number;



    public Initialize() : void
    {
        this.x = 100;
        this.y = 100;
        this.xv = 1;
        this.yv = 1;

        this.scale = 1;
        this.Frame = .5;
        this.FrAmEz = 11;//? can i count
        this.currentframe = 0;
        this.frameWidth = 24;
        this.frameHeight = 32;

    }

    public setContent(context, filename : string) : void
    {
        this.idle = new Texture2D(context, filename);
    }


    public NextFrame() : void
    {
        this.currentframe += 1;
        if (this.currentframe >= this.FrAmEz) {
            this.currentframe = 0;
        }
    }

    public Update(TimePassed : number) : void
    {
        this.x = this.xv * TimePassed;
        this.y = this.yv * TimePassed;
        this.Time += TimePassed;
        if (this.Time > this.Frame) {
            //this.NextFrame();

            this.Time -= this.Frame;
        }

    }

    public Draw(Batch : SpriteBatch) : void
    {
        const source = new Rectangle(this.currentframe*this.frameWidth, 0, this.frameWidth, this.frameHeight);
        const destination = new Rectangle(this.x, this.y, this.frameWidth*this.scale, this.frameHeight*this.scale);

        Batch.QueueDraw(this.idle, source, destination);
    }

    
}

export = Unit;