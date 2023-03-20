import Image from "next/image";
import styles from "../../styles/comicses.module.scss";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/comics/${id}`);

  const data = await res.json();

  return {
    props: {
      comics: data.comics,
    },
  };
}

export default function Comics({ comics }) {
  const loaderProp = ({ src }) => {
    return src;
  };

  return (
    <section className={styles.comicsPage}>
      {comics.images.map((i) => {
        return (
          <div className={styles.imageContainer}>
            <Image loader={loaderProp} fill src={i} />
          </div>
        );
      })}
    </section>
  );
}
