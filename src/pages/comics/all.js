import { List, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/comicses.module.scss";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/comics/all");
  const data = await res.json();

  return {
    props: {
      comicses: data.comicses,
    },
  };
}

export default function Comicses({ comicses }) {
  const router = useRouter();

  return (
    <section className={styles.comicsesPage}>
      <Typography.Title className={styles.pageTitle} level={2}>
        Comicses
      </Typography.Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={comicses}
        renderItem={(comics) => {
            console.log(comics.room)
          return (
            <List.Item
              onClick={() => {
                router.push(`/comics/${comics._id}`);
              }}
              className={styles.listItem}
              key={comics._id}
            >
              <Image
                className={styles.image}
                height={303}
                width={616}
                src={comics.images[0]}
              />
              <Typography.Title level={4}>{comics.room.name}</Typography.Title>
              <Typography.Text>{comics.room.description}</Typography.Text>
            </List.Item>
          );
        }}
      />
    </section>
  );
}
