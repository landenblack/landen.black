import GameBase = require("../MOEnjs/GameBase");
import ShaderProgram = require('../MOEnjs/ShaderProgram');

class TestGame extends GameBase
{   
    private VertexBuffer : WebGLBuffer;
    private IndexBuffer : WebGLBuffer;
    private PlaneArrayObject : WebGLVertexArrayObject;
    private TestProgram : ShaderProgram;

    public Initialize() : void
    {
        this.Context.clearColor(1.0, 0.0, 0.0, 1.0);
        this.Context.clear(this.Context.COLOR_BUFFER_BIT);

        const VerticalPlaneVertexData = 
        [
            -0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0,
            0.5,  0.5, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
            -0.5,  0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0
        ];
        const VerticalPlaneIndices = [0, 1, 2, 2, 3, 0];

        this.VertexBuffer = this.Context.createBuffer();
        this.Context.bindBuffer(this.Context.ARRAY_BUFFER, this.VertexBuffer);
        this.Context.bufferData(this.Context.ARRAY_BUFFER, new Float32Array(VerticalPlaneVertexData), this.Context.STATIC_DRAW);

        this.IndexBuffer = this.Context.createBuffer();
        this.Context.bindBuffer(this.Context.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        this.Context.bufferData(this.Context.ELEMENT_ARRAY_BUFFER, new Uint16Array(VerticalPlaneIndices), this.Context.STATIC_DRAW);

        this.PlaneArrayObject = this.Context.createVertexArray();
        this.Context.bindVertexArray(this.PlaneArrayObject);
        this.Context.bindBuffer(this.Context.ARRAY_BUFFER, this.VertexBuffer);
        this.Context.enableVertexAttribArray(0);
        this.Context.vertexAttribPointer(0, 3, this.Context.FLOAT, false, 32, 0);
        this.Context.enableVertexAttribArray(1);
        this.Context.vertexAttribPointer(1, 3, this.Context.FLOAT, false, 32, 12);
        this.Context.enableVertexAttribArray(2);
        this.Context.vertexAttribPointer(2, 2, this.Context.FLOAT, false, 32, 24);
        this.Context.bindBuffer(this.Context.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
        this.Context.bindVertexArray(null);

        this.TestProgram = new ShaderProgram(this.Context, 'StaticMeshVertexShader.glsl', 'DebugFlatColorPixelShader.glsl');
    }

    public Tick(DeltaTime : number) : void
    {
        if (!this.TestProgram.IsLoaded()) return;

        this.Context.clearColor(Math.random(), 0.0, 0.0, 1.0);
        this.Context.clear(this.Context.COLOR_BUFFER_BIT | this.Context.DEPTH_BUFFER_BIT);

        this.Context.useProgram(this.TestProgram.GetProgram());
        this.Context.bindVertexArray(this.PlaneArrayObject);
        this.Context.drawElements(this.Context.TRIANGLES, 6, this.Context.UNSIGNED_SHORT, 0); 
        this.Context.bindVertexArray(null);
        this.Context.useProgram(null);
    }
}

export = TestGame;