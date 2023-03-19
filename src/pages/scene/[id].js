import { Configuration, OpenAIApi } from "openai";
import styles from "../../styles/scene.module.scss";
import Image from "next/image";
import { Button, Typography } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const res = await fetch(`http://localhost:3000/api/room/get/${id}`)
//   const data = await res.json();
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   const response = await openai.createImage({
//     prompt: data.room.description + " in a cartoonish style",
//     n: 4,
//     size: "256x256",
//   });

//   console.log(response.data.data.map((img) => img.url));

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
    "/dickFace.png",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 640w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 750w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 828w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 1080w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 1200w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 1920w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 2048w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-5viFNxD2Ga5ra6EXMpxSl6kx.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=6tVHhjvq/wsZGkfW%2BH7XqkiCt%2BgWwK4iNSZhfa99zu4%3D 3840w",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 640w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 750w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 828w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 1080w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 1200w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 1920w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 2048w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-OFxVgsDyfzZQu6pTty1dgG5W.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=cI4qiyrhvXwTFfOa7XW/FhNxl5Km5/MWDCPzERKwyoM%3D 3840w",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 640w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 750w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 828w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 1080w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 1200w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 1920w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 2048w, https://oaidalleapiprodscus.blob.core.windows.net/private/org-mqmVv1DODIfhwOPA3j6MUbvS/user-7gGDu6zBAZvLs6FmkfYCnCm7/img-xfR4wkLZzOR4CsJwpmLHYVyH.png?st=2023-03-18T14%3A39%3A47Z&se=2023-03-18T16%3A39%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-18T00%3A39%3A38Z&ske=2023-03-19T00%3A39%3A38Z&sks=b&skv=2021-08-06&sig=kv2OWX210WfSLF07QXYzitwu8N1RMNMtpXfGVXCIUyE%3D 3840w",
  ];

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
