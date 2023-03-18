import { Configuration, OpenAIApi } from "openai";
import styles from "../../styles/scene.module.scss";
import Image from "next/image";
import {Button, Typography} from "antd"
import { useState } from "react";
import { useRouter } from "next/router";

// export async function getServerSideProps() {
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   const response = await openai.createImage({
//     prompt: "a white siamese cat",
//     n: 4,
//     size: "256x256",
//   });

// //   console.log(response.data.data.map((img) => img.url));

//   return {
//     props: {
//       images: response.data.data.map((img) => img.url)
//     },
//   };
// }

export default function Story() {
  const [select, setSelect] = useState(null);
  const router = useRouter();

  const images = [
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-HjxOT9i43DChmTjn8posja7E.png?st=2023-03-18T12%3A14%3A00Z&se=2023-03-18T14%3A14%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A16Z&ske=2023-03-19T00%3A39%3A16Z&sks=b&skv=2021-08-06&sig=kh97mJiEJMY1VYtMPLSE4wq6r76xKqrWinN2rHLa3RM%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-e9aDkDAz09cJs053tDWaM2NV.png?st=2023-03-18T12%3A14%3A00Z&se=2023-03-18T14%3A14%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A16Z&ske=2023-03-19T00%3A39%3A16Z&sks=b&skv=2021-08-06&sig=sBhW68OxW%2Bx46fVrtCTNRR59i4H6R4yAOxxzxVDCnwQ%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-XL0tDrv3W09Qc3Jf3On2DZ4T.png?st=2023-03-18T12%3A14%3A00Z&se=2023-03-18T14%3A14%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A16Z&ske=2023-03-19T00%3A39%3A16Z&sks=b&skv=2021-08-06&sig=3FfYpcZkujRbVfkrKSEv/dnCyUVc5hcI6ECuj%2BFs/aM%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-L3oPu9ifyLVYNTwz2MhoVayJ.png?st=2023-03-18T12%3A14%3A00Z&se=2023-03-18T14%3A14%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A16Z&ske=2023-03-19T00%3A39%3A16Z&sks=b&skv=2021-08-06&sig=CdN59UqiMJC1g3%2BkxscVpCYJU1FACWJomA9RxZg57xc%3D",
  ];

  const loaderProp = ({ src }) => {
    return src;
  };

  const handleSubmit = async () => {
    const {id} = router.query;
    await fetch(`http://localhost:3000/api/room/update/image/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: select
      })})

      router.replace(`/story/${id}`);
  }

  return (
    <section className={styles.storyPage}>
        <Typography.Title level={3}>Choose Your Story's Scene Image</Typography.Title>
      <div className={styles.imagePicker}>
        {images.map((i) => {
          return (
            <div className={styles.aiImageContainer}>
              <Image
                className={styles.aiImage}
                src={i}
                fill
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
      <Button style={{width: "6rem", "margin-top": "3rem"}} type="primary" onClick={handleSubmit} >Submit</Button>
    </section>
  );
}
