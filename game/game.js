document.addEventListener("DOMContentLoaded", function(){
    main();
});

function main() {
    var gl = document.getElementById('something').getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var positions = new Float32Array(8);
    positions[0] = -.9;
    positions[1] = -.9;

    positions[2] =  .9;
    positions[3] = -.9;

    positions[4] =  .9;
    positions[5] =  .9;

    positions[6] = -.9;
    positions[7] =  .9;

    var colors = new Float32Array(12);
    colors[0]  = 1;
    colors[1]  = 0;
    colors[2]  = 0;

    colors[3]  = 0;
    colors[4]  = 1;
    colors[5]  = 0;

    colors[6]  = 0;
    colors[7]  = 0;
    colors[8]  = 1;

    colors[9]  = 1;
    colors[10] = 1;
    colors[11] = 0;

    var indicies = new Uint16Array(6);
    indicies[0] = 0;
    indicies[1] = 1;
    indicies[2] = 2;

    indicies[3] = 2;
    indicies[4] = 3;
    indicies[5] = 0;

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicies, gl.STATIC_DRAW);

    var vertex_shader_source = `
    attribute vec2 InPosition;
    attribute vec3 InColor;
    uniform vec2 offset;
    
    varying vec3 Color;
    
    void main()
    {
        gl_Position = vec4(InPosition+offset, 0.0, 1.0);
        Color = InColor;
    }
    `;

    var fragment_shader_source = `
    varying lowp vec3 Color;

    void main()
    {
        gl_FragColor = vec4(Color, 1.0);
    }
    `;

    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, vertex_shader_source);
    gl.compileShader(vertex_shader);
    console.log(gl.getShaderInfoLog(vertex_shader));

    var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, fragment_shader_source);
    gl.compileShader(fragment_shader);
    console.log(gl.getShaderInfoLog(fragment_shader));

    var shader_program = gl.createProgram();
    gl.attachShader(shader_program, vertex_shader);
    gl.attachShader(shader_program, fragment_shader);
    gl.linkProgram(shader_program);
    console.log(gl.getProgramInfoLog(shader_program));

    gl.deleteShader(vertex_shader);
    gl.deleteShader(fragment_shader);

    gl.useProgram(shader_program);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(shader_program, 'InPosition'), 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shader_program, 'InPosition'));

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(shader_program, 'InColor'), 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(shader_program, 'InColor'));

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.uniform2f(gl.getUniformLocation(shader_program, 'offset'), -.001, 0);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);


}