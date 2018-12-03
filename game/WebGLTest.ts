﻿import TestGame = require("./TestGame");
import CanvasContext = require("../MOEnjs/CanvasContext");

let LastTime : number;

function Main() 
{
    var Canvas = document.createElement("canvas");
    Canvas.setAttribute("width", "1000");
    Canvas.setAttribute("height", "500");
    document.body.appendChild(Canvas);

    const Context = Canvas.getContext("webgl2");
    const CanvasInfo = new CanvasContext(Canvas);
    
    const Game = new TestGame(Context, CanvasInfo);
    Game.Initialize();

    document.addEventListener('keyup',   (Key)=>Game.KeyUp(Key));
    document.addEventListener('keydown', (Key)=>Game.KeyDown(Key));

    const LoopBody = (TimeStamp : DOMHighResTimeStamp) =>
    {
        if (LastTime != undefined)
        {
            Game.Tick((TimeStamp.valueOf() - LastTime) / 1000.0);
        }
        LastTime = TimeStamp.valueOf();
        window.requestAnimationFrame(LoopBody);
    };
    window.requestAnimationFrame(LoopBody);
}

Main();