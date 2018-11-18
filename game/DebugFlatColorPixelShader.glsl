#version 300 es

in mediump vec3 Normal;
in mediump vec2 UV;

uniform sampler2D TEXTURE;

out mediump vec4 Color;

void main()
{
    Color = texture(TEXTURE, UV);
    
}