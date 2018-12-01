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
    private skeleton2 : Unit;
    private skeleton3 : Unit;

    public Initialize() : void
    {
        this.Context.clearColor(0.68, 0.61, 0.54, 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.time = 0;

        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.SkeletonTexture = new Texture2D(this.Context, "../assets/spritesheets/skeleton/skeletonidle.png");
        this.skeleton = new Unit();
        this.skeleton.setContent(this.Context, "../assets/spritesheets/skeleton/skeletonidle.png");
        this.skeleton.Initialize();
    }

    public Tick(DeltaTime : number) : void
    {
        this.time += DeltaTime;
        if (!this.Batch.IsLoaded() || this.time < 5000 ) return;

        this.Context.clear(this.Context.COLOR_BUFFER_BIT);
        this.skeleton.Update(DeltaTime);
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;