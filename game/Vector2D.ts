class Vector2D {
    public x : number;
    public y : number;

    public constructor (x : number, y : number)
    {
        this.x = x;
        this.y = y;
    }

    public Add(other : Vector2D) : Vector2D
    {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    public Subtract(other : Vector2D) : Vector2D
    {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
}

export = Vector2D;