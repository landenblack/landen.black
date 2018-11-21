import Texture2D = require("../MOEnjs/Texture2D");

class Unit
{
    public image : object;
    public pos;
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

        this.pos = { x: 0, y: 0 };
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
    }
    
}

export = Unit;