import Rectangle = require("../MOEnjs/Rectangle");
import Texture2D = require("../MOEnjs/Texture2D");
import Vector2D = require("./Vector2D");

class TileTexture {
    private image : Texture2D
    private rows : number
    private columns : number
    private tiles : Map<string, number>
    private loaded : boolean;

    public constructor(context : WebGL2RenderingContext, metadata : string) {
        var request = new XMLHttpRequest();
        let me = this;
        this.tiles = new Map<string, number>();
        request.open('GET', metadata, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    let lines : string[] = request.responseText.split("\n");
                    me.rows = parseInt(lines[1]);
                    me.columns = parseInt(lines[2]);
                    me.image = new Texture2D(context, lines[0]);
                    me.loaded = true;
                    let current : number = 0;
                    for (let line of lines.slice(2)) {
                        me.tiles.set(line, current)
                        current++;
                    }
                }
            }
        }
        
        
    }

    public IsLoaded() : boolean {
        return this.loaded && this.image.IsLoaded();
    }

    public GetTile(tile : string) : Rectangle {
        let TileNumber : number = this.tiles.get(tile);
        let TileWidth : number = this.image.GetWidth() / this.columns;
        let TileHeight : number = this.image.GetHeight() / this.rows;

        let row : number = TileNumber / this.columns;
        let col : number = TileNumber % this.columns;

        let topleft : Vector2D = new Vector2D(row * TileHeight, col * TileWidth);

        return new Rectangle(topleft.x, topleft.y, TileWidth, TileHeight);
    }

    public GetTexture() : Texture2D {
        return this.image;
    }

}

export = TileTexture;