import TestGame = require("./TestGame");

let LastTime : number;

function Main() 
{
    var Canvas = document.createElement("canvas");
    Canvas.setAttribute("width", "1000");
    Canvas.setAttribute("height", "700");
    document.body.appendChild(Canvas);

    const Context = Canvas.getContext("webgl2");
    
    const Game = new TestGame(Context);
    Game.Initialize();
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