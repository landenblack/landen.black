import GameBase = require("../MOEnjs/GameBase");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");
import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");
import Skeleton = require("../game/Skeleton");
import Vector2D = require("./Vector2D");
import Camera = require("./Camera");
import TileTexture = require("./TileTexture");

class TestGame extends GameBase
{
    private Batch : SpriteBatch;
    private PATH = '../MOEnjs';
    private time : number;
    private skeleton : Skeleton;
    private downkeys : Set<string>;
    private camera : Camera;
    private tileset : TileTexture;

    public Initialize() : void
    {
        this.Context.clearColor(0.11372549019607843, 0.12941176470588237, 0.17647058823529413, 1.0);
        this.Context.enable(this.Context.BLEND);
        this.Context.blendFunc(this.Context.SRC_ALPHA, this.Context.ONE_MINUS_SRC_ALPHA);

        this.time = 0;
        this.downkeys = new Set<string>();
        this.Batch = new SpriteBatch(this.Context, this.Canvas, this.PATH);
        this.skeleton = new Skeleton(new Vector2D(0,0), this.downkeys);
        this.skeleton.SetContent(this.Context);
        this.camera = new Camera(new Vector2D(0, 1.8), 1, new Vector2D(7.2, 3.6), new Vector2D(this.Canvas.GetWidth(), this.Canvas.GetHeight()), this.downkeys);
        this.tileset = new TileTexture(this.Context, "../assets/spritesheets/bit_tileset_metadata.txt")
    }

    public HexToRGB(hex : string) : Array<number>
    {
        hex = hex.replace('#', '');
        let colors = new Array<number>();
        colors = hex.match(/.{1,2}/g).map((number)=>{
            return parseInt(number, 16) / 255;
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
        this.camera.Update(DeltaTime);
        this.Batch.QueueDraw(this.tileset.GetTexture(), new Rectangle(0, 0, 100, 100), this.tileset.GetTile('grave'));
        this.skeleton.Draw(this.Batch, this.camera);
        this.Batch.ExecuteDraws();
    }
}

export = TestGame;