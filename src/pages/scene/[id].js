import { Configuration, OpenAIApi } from "openai";
import styles from "../../styles/scene.module.scss";
import Image from "next/image";
import { Button, Typography } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/room/get/${id}`)
  const data = await res.json();
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createImage({
    prompt: data.room.description + " in a cartoonish style",
    n: 4,
    size: "256x256",
    response_format: "b64_json",
  });

  // console.log(response.data.data.map((img) => img.b64_json));

  return {
    props: {
      images: response.data.data.map((img) => `data:image/png;base64, ${img.b64_json}`)
    },
  };
}

// export default function Story() {
  export default function Story({images}) {
  const [select, setSelect] = useState(null);
  const router = useRouter();

  const loaderProp = ({ src }) => {
    return src;
  };

  const handleSubmit = async () => {
    const { id } = router.query;
    await fetch(`http://localhost:3000/api/room/update/image/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: select,
      }),
    });

    router.replace(`/story/${id}`);
  };

  return (
    <section className={styles.storyPage}>
      <Typography.Title level={3}>
        Choose Your Story's Scene Image
      </Typography.Title>
      <div className={styles.imagePicker}>
        {images.map((i) => {
          return (
            <div
              className={`${styles.aiImageContainer} ${
                select === i ? styles.selected : null
              }`}
            >
              <Image
                width={256}
                height={256}
                className={`${styles.aiImage}`}
                src={i}
                alt="ai generated image"
                loader={loaderProp}
                onClick={() => {
                  setSelect(i);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        style={{ width: "6rem", "margin-top": "3rem" }}
        type="primary"
        onClick={handleSubmit}
        disabled={select === null}
      >
        Submit
      </Button>
    </section>
  );
}
