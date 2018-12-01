import GameBase = require("../MOEnjs/GameBase");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");
import Skeleton = require("../game/Skeleton");

class TestGame extends GameBase
{
    private Batch : SpriteBatch;
    private SkeletonTexture : Texture2D;
    private PATH = '../MOEnjs';
    private time : number;
    private skeleton : Skeleton;
    private changed : boolean;
    private downkeys : Set<string>;

    public Initialize() : void
    {
        this.Context.clearColor(0.68, 0.61, 0.54, 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.time = 0;
        this.downkeys = new Set<string>();
        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.skeleton = new Skeleton(this.downkeys);
        this.skeleton.SetContent(this.Context);
        this.changed = false;
    }

    public KeyUp(key : KeyboardEvent) : void 
    {
        this.downkeys.delete(key.key);
    }

    public KeyDown(key : KeyboardEvent) : void 
    {
        this.downkeys.add(key.key);
    }

    public Tick(DeltaTime : number) : void
    {
        this.time += DeltaTime;
        if (!this.Batch.IsLoaded() || this.time < 1 ) return;

        if (this.time > 10 && !this.changed) {
            this.skeleton.SetAnimation(Skeleton.State.Walk);
            this.skeleton.SetVelocity(30, 1);
            this.changed = true;
        }

        this.Context.clear(this.Context.COLOR_BUFFER_BIT);
        this.skeleton.Update(DeltaTime);
        this.skeleton.Draw(this.Batch);
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;