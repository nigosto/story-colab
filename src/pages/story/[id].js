import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/story.module.scss";
import { Button } from "antd";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/room/get/${id}`);
    const data = await res.json();

    return {
        props: {
            messages: data.room.messages,
            imageSrc: data.room.image,
            participants: data.room.participants
        },
    };
}

export default function Story({ messages, imageSrc, participants }) {
    let bubbleWidth = 204;
    let bubbleHeight = 154;
    let image;
    let chatBubbleImg;
    let chatBubbles = [];
    let cnv;
    let draggedBubble;
    let pageNum = 0;

    // let bubbleX = window.innerWidth / 2,
    //     bubbleY = window.innerHeight / 2;

    const setup = async (p5, canvasParentRef) => {

        // if (!cnv) {
        console.log("simo1");
        cnv = p5.createCanvas(window.innerWidth, window.innerHeight).parent(
            canvasParentRef
        );


        if (chatBubbles.length === 0) {
            for (let i = 0; i < participants.length; i++) {
                console.log("i", i);
                let participantMessages = messages.filter(message => message.startsWith(participants[i].role));
                chatBubbles.push({ scale: 1.0, bubbleX: window.innerWidth / 2 + i * 100, bubbleY: window.innerHeight / 2, isFlip: false, messages: participantMessages });
            }
            draggedBubble = chatBubbles[0];

        }

        console.log("simo1", draggedBubble);

        // }
        image = p5.loadImage(imageSrc);
        chatBubbleImg = p5.loadImage(
            "https://static.vecteezy.com/system/resources/previews/001/195/458/original/speech-bubble-png.png"
        );


        p5.textSize(24);
        p5.textAlign(p5.CENTER);
    };

    const draw = (p5) => {
        p5.background(245);
        if (image) {
            p5.image(
                image,
                (window.innerWidth - image.width * 2) / 2,
                (window.innerHeight - image.height * 2) / 2,
                image.width * 2,
                image.height * 2
            );
        }

        for (const chatBubble of chatBubbles) {
            let { bubbleX, bubbleY, isFlip, messages } = chatBubble;

            if (messages[pageNum]) {
                if (isFlip) {
                    p5.scale(-1, 1);
                } else {
                    p5.scale(1, 1);
                }
                p5.image(chatBubbleImg, bubbleX, bubbleY, bubbleWidth, bubbleHeight);
                p5.text(messages[pageNum].split(': ')[1], bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2);
            }

        }
    };

    const mousePressed = (_p5, event) => {
        let mouseX = event.clientX, mouseY = event.clientY;

        for (let i = 0; i < chatBubbles.length; i++) {
            let chatBubble = chatBubbles[i];
            // console.log(mouseX, mouseY, bubbleWidth, bubbleHeight, chatBubble.x <= mouseX , mouseX <= chatBubble.x + bubbleWidth ,
            // chatBubble.y <= mouseY , mouseY <= chatBubble.y + bubbleHeight , chatBubble );
            if (chatBubble.bubbleX <= mouseX && mouseX <= chatBubble.bubbleX + bubbleWidth &&
                chatBubble.bubbleY <= mouseY && mouseY <= chatBubble.bubbleY + bubbleHeight) {
                draggedBubble = chatBubble;
                draggedBubble.deltaX = mouseX - draggedBubble.bubbleX;
                draggedBubble.deltaY = mouseY - draggedBubble.bubbleY;
                console.log(draggedBubble);
                // remove return to move all
                return;
            }
        }
    };

    const mouseDragged = (_p5, event) => {

        let mouseX = event.clientX, mouseY = event.clientY;
        // console.log(event);
        // bubbleX = _p5.mouseX - bubbleWidth / 2;
        // bubbleY = _p5.mouseY - bubbleHeight / 2;

        draggedBubble.bubbleX = mouseX - draggedBubble.deltaX;
        draggedBubble.bubbleY = mouseY - draggedBubble.deltaY;
        console.log("new bubble coords", draggedBubble);

    };

    return (
        <section className={styles.storyPage}>
            <Button
                className={styles.resizePlus}
                type="primary"
                onClick={() => {
                    bubbleWidth = bubbleWidth * 1.2;
                    bubbleHeight = bubbleHeight * 1.2;
                }}
            >
                +
            </Button>
            <Button
                className={styles.resizeMinus}
                type="primary"
                danger
                onClick={() => {
                    bubbleWidth = bubbleWidth * 0.8;
                    bubbleHeight = bubbleHeight * 0.8;
                }}
            >
                -
            </Button>
            <Button className={styles.flipButton} type="primary" onClick={() => {
                draggedBubble.isFlip = !draggedBubble.isFlip;
            }}>Flip</Button>

            <Button
                type="primary"
                onClick={() => {
                    if (pageNum < participants.length -1 ) {
                        pageNum++;
                    }
                }}>
                Next
            </Button>

            <Button
                type="primary"
                onClick={() => {
                    if (pageNum > 0 ) {
                        pageNum--;
                    }
                }}>
                Previous
            </Button>

            <Sketch
                setup={setup}
                draw={draw}
                mouseDragged={mouseDragged}
                mousePressed={mousePressed}
            />
        </section>
    );
}
