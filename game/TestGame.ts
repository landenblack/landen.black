import GameBase = require("../MOEnjs/GameBase");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");

class TestGame extends GameBase
{
    private Batch : SpriteBatch;
    private Cocoa : Texture2D;
    private Chino : Texture2D;
    private Rize : Texture2D;
    private PATH = '../MOEnjs';

    public Initialize() : void
    {
        this.Context.clearColor(1.0, 0.0, 0.0, 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.Cocoa = new Texture2D(this.Context, "../assets/test.png");
    }

    public Tick(DeltaTime : number) : void
    {
        if (!this.Batch.IsLoaded() || !this.Cocoa.IsLoaded() ) return;

        this.Context.clear(this.Context.COLOR_BUFFER_BIT);
        this.Batch.QueueDraw(this.Cocoa, new Rectangle(0, 200, 192, 192)); // x y w h 
        this.Batch.QueueDraw(this.Cocoa, new Rectangle(192, 200, 192, 192), new Rectangle(0, 0, 192, 96)); // x y w h 
        this.Batch.QueueDraw(this.Cocoa, new Rectangle(200, 200, 178, 300));
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;