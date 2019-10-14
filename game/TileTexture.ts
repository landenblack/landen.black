import Rectangle = require("../MOEnjs/Rectangle");
import Texture2D = require("../MOEnjs/Texture2D");
import Vector2D = require("./Vector2D");
const fs = require("fs");

class TileTexture {
    private image : Texture2D
    private rows : number
    private columns : number
    private tiles : Map<string, number>

    public constructor(context : WebGL2RenderingContext, metadata : string) {

        let lines : string[] = fs.readFileSync(metadata).split("\n");
        this.rows = parseInt(lines[1]);
        this.columns = parseInt(lines[2]);
        this.image = new Texture2D(context, lines[0]);
        let current : number = 0;
        for (let line of lines.slice(2)) {
            this.tiles.set(line, current)
            current++;
        }
        
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