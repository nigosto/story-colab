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
  let isFlip = false;
  let bubbleWidth = 204;
  let bubbleHeight = 154;
  let image;
  let chatBubbleImg = [];

  let bubbleX = window.innerWidth / 2,
    bubbleY = window.innerHeight / 2;

  const setup = async (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    image = p5.loadImage(imageSrc);
    for (let i = 0; i < participants.length; i++) {
      chatBubbleImg[i] = p5.loadImage(
        "https://static.vecteezy.com/system/resources/previews/001/195/458/original/speech-bubble-png.png"
      );
    }

    p5.textSize(24);
    p5.textAlign(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(245);
    if (image) {
      p5.image(
        image,
        (window.innerWidth - image.width) / 2,
        (window.innerHeight - image.height) / 2
      );

      for (let i = 0; i < participants.length; i++) {
        if(isFlip){
          p5.scale(-1, 1);
          p5.image(chatBubbleImg[i], -(bubbleX + i*100), bubbleY- i*100, -bubbleWidth, bubbleHeight);
        }
        else {
          p5.image(chatBubbleImg[i], bubbleX + i*100, bubbleY- i*100, bubbleWidth, bubbleHeight);
        }

      }

      for (let i = 0; i < participants.length; i++) {
        p5.text(messages[i], bubbleX + i *100+ bubbleWidth / 2, bubbleY -i*100+ bubbleHeight / 2);
      }
    }
  };

  const mouseClicked = (_p5, event) => {};

  const mouseDragged = (_p5, event) => {
    bubbleX = _p5.mouseX - bubbleWidth / 2;
    bubbleY = _p5.mouseY - bubbleHeight / 2;
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
        isFlip = !isFlip
      }}>Flip</Button>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        mouseClicked={mouseClicked}
      />
    </section>
  );
}
