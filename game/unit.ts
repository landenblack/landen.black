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
        this.size = {};
        this.size.x = 0;
        this.size.y = 0;
    }

    public SetFile(texture : Texture2D, filewidth, fileheight, fileframes, scale) : void
    {
        this.image = {
            file: texture,
            filex: filewidth,
            filey: fileheight,
            frames: fileframes,
            framex: filewidth / fileframes,
            framey: fileheight,
            scale: scale,
        };
    }

    public UpdatePos(x : number, y : number) : void 
    {
        this.x = x;
        this.y = y;
    }

    public UpdateFrame() : void
    {
        this.currentframe += 1;
        if (this.currentframe >= this.image.frames) {
            this.currentframe = 0;
        }
    }

    public DrawWhere() : Rectangle
    {
        // where to draw
        //new Rectangle(100, 100, 300, 99) posX, posY, width, height,
        return new Rectangle(this.x, this.y, this.image.framex*this.image.scale, this.image.framey*this.image.scale);
    }

    public DrawWhat() : Rectangle
    {
        // what to draw
        //new Rectangle(100, 100, 300, 99) start here on image X, start here on image Y, width, height
        return new Rectangle(this.image.framex*this.currentframe, 0, this.image.framex, this.image.framey);
    }
    
}

export = Unit;