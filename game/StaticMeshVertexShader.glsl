#version 300 es

layout(location = 0) in vec3 InPosition;
layout(location = 1) in vec3 InNormal;
layout(location = 2) in vec2 InUV;

out vec3 Normal;
out vec2 UV;

void main()
{
    gl_Position = vec4(InPosition, 1.0);
    Normal = InNormal;
    UV = InUV;
}