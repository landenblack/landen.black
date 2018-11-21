import GameBase = require("../MOEnjs/GameBase");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");
import Unit = require("../game/unit");

class TestGame extends GameBase
{
    private Batch : SpriteBatch;
    private SkeletonTexture : Texture2D;
    private PATH = '../MOEnjs';
    private time : number;
    private skeleton : Unit;

    public Initialize() : void
    {
        this.Context.clearColor(30.0, 0.18, 0.61, 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.time = 0;

        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.SkeletonTexture = new Texture2D(this.Context, "../assets/spritesheets/skeleton/skeletonidle.png");
        this.skeleton = new Unit();
        this.skeleton.SetFile(this.SkeletonTexture, 286, 33, 13);
    }

    public Tick(DeltaTime : number) : void
    {
    
        if (!this.Batch.IsLoaded() || !this.SkeletonTexture.IsLoaded() ) return;

        this.time += DeltaTime;
        if (this.time > 1 ) {
            this.time = 0;
            this.skeleton.UpdateFrame();
        }
        this.Batch.QueueDraw(this.SkeletonTexture, this.skeleton.DrawData1(), this.skeleton.DrawData2());
        

        console.log(DeltaTime);
        this.Context.clear(this.Context.COLOR_BUFFER_BIT);
        //this.Batch.QueueDraw(this.Cocoa, new Rectangle(100, 100, 300, 99)); // x y w h 
        this.Batch.QueueDraw(this.SkeletonTexture, new Rectangle(100, 100, 66, 99), new Rectangle(0, 0, 22, 33)); // x y w h 
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;