import GameBase = require("../MOEnjs/GameBase");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");
import Skeleton = require("../game/Skeleton");

class TestGame extends GameBase
{
    private Batch : SpriteBatch;
    private PATH = '../MOEnjs';
    private time : number;
    private skeleton : Skeleton;
    private downkeys : Set<string>;

    public Initialize() : void
    {
        this.Context.clearColor(...this.HexToRGB('#1D212C'), 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.time = 0;
        this.downkeys = new Set<string>();
        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.skeleton = new Skeleton(this.downkeys);
        this.skeleton.SetContent(this.Context);
    }

    public HexToRGB(hex : string) : Array<number>
    {
        hex = hex.replace('#', '');
        let colors = new Array<number>();
        colors = hex.match(/.{1,2}/g).map((number)=>{
            return parseInt(number, 16) / 100;
        });
        return colors;
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

        

        this.Context.clear(this.Context.COLOR_BUFFER_BIT);
        this.skeleton.Update(DeltaTime);
        this.skeleton.Draw(this.Batch);
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;