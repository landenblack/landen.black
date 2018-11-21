import Texture2D = require("../MOEnjs/Texture2D");
import Rectangle = require("../MOEnjs/Rectangle");

class Unit
{
    public image;
    public x : number;
    public y : number;
    public size;
    public currentframe : number;

    public Initialize() : void
    {
        this.image = {
            file: '',
            x: 0,
            y: 0,
            frames: 0,
            fx: 0,
            fy: 0,
        };

        this.currentframe = 0;

        this.x = 100;
        this.y = 100;
        this.size = { x: 0, y: 0 };
    }

    public SetFile(texture : Texture2D, filewidth, fileheight, fileframes) : void
    {
        this.image = {
            file: texture,
            x: filewidth,
            y: fileheight,
            frames: fileframes,
            fx: filewidth / fileframes,
            fy: fileheight,
        };
    }

    public UpdateFrame() : void
    {
        this.currentframe += 1;
        if (this.currentframe >= this.image.frames) {
            this.currentframe = 0;
        }
    }

    public DrawData1() : Rectangle
    {
        return new Rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    public DrawData2() : Rectangle
    {
        return new Rectangle(this.image.fx*this.currentframe, this.image.fy, this.image.x, this.image.y);
    }
    
}

export = Unit;