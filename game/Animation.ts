import Texture2D   = require("../MOEnjs/Texture2D");
import Rectangle   = require("../MOEnjs/Rectangle");
import SpriteBatch = require("../MOEnjs/SpriteBatch/SpriteBatch");

class Animation
{
    private texture     : Texture2D;
    private time        : number;
    private frameWidth  : number;
    private frameHeight : number;
    private frameCount  : number;
    private fps         : number;

    public constructor(context : WebGL2RenderingContext, path : string, frameWidth : number, frameHeight, frameCount : number, fps : number)
    {
        this.texture = new Texture2D(context, path);
        this.time = 0;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.fps = fps;
    }

    public GetTexture() : Texture2D
    {
        return this.texture;
    }

    public GetRectangle() : Rectangle
    {
        return new Rectangle(this.frameWidth*this.GetCurrentFrame(), 0, this.frameWidth, this.frameHeight);
    }

    public GetWidth() : number
    {
        return this.frameWidth;
    }

    public GetHeight() : number
    {
        return this.frameHeight;
    }

    public Reset() : void 
    {
        this.time = 0;
    }

    public Update(DeltaTime : number) : void 
    {
        this.time = (this.time + DeltaTime) % this.GetAnimationLength();
    }


    private GetAnimationLength() : number
    {
        return this.frameCount / this.fps;
    }

    private GetCurrentFrame() : number
    {
        return Math.floor(this.time * this.fps);
    }

}

export = Animation;