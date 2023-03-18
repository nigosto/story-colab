import { useRouter } from "next/router";
import React from "react";
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

export default function Story() {

    // const router = useRouter();

    // let hasCanvas = false;
    let image;
    let chatBubbleImg;

    let bubbleX = window.innerWidth/2, bubbleY = window.innerHeight/2;

    const setup = async (p5, canvasParentRef) => {
        // if (hasCanvas) {
        //     return;
        // }
        // const { id } = router.query;
        // console.log(id);
        // const roomRes = await fetch(`http://localhost:3000/api/room/get/${id}`);
        // const room = (await roomRes.json()).room;
        // console.log(room);
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        // hasCanvas = true;
        // p5.background(0);
        // p5.ellipse(50, 50, 70, 70);
        image = p5.loadImage("https://media.istockphoto.com/id/1267021092/photo/funny-winking-kitten.jpg?s=612x612&w=0&k=20&c=9PoFYkqKZ30F_ubxX90_azwsR22ENwrFnOjxV0RaoTo=");
        chatBubbleImg = p5.loadImage("https://static.vecteezy.com/system/resources/previews/001/195/458/original/speech-bubble-png.png");
        console.log(image, chatBubbleImg);
        p5.textSize(24);
        p5.textAlign(p5.CENTER);

        // image = p5.loadImage(room.image);
    };

    const draw = (p5) => {

        p5.background(245);
        // p5.ellipse(x, y, 70, 70);
        if (image) {
            p5.image(image, (window.innerWidth - image.width)/2, (window.innerHeight - image.height)/2);
            p5.image(chatBubbleImg, bubbleX, bubbleY, 204, 154);
            p5.text('Meow', bubbleX + 102, bubbleY + 77);
        }
        // x++;
    };

    const mouseClicked = (_p5, event) => {
        // console.log(event)
    }

    const mouseDragged = (_p5, event) => {
        // console.log(event)
        bubbleX = _p5.mouseX - 102;
        bubbleY = _p5.mouseY - 77;

    }

    return <Sketch style={{"marginTop": "3rem"}} setup={setup} draw={draw} mouseDragged={mouseDragged} mouseClicked={mouseClicked}/>;

}