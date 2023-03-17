import { Button, Form, Input, InputNumber, Typography } from "antd";
import Image from "next/image"
import { useRouter } from "next/router";
import styles from "../../styles/create.room.module.scss"

export default function CreateRoom() {
  const router = useRouter();

  const loaderProp =({ src }) => {
    return src;
  }

  const handleSubmit = async (values) => {
    const res = await fetch("http://localhost:3000/api/room/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        participantsCount: values.participantsCount,
        creator: "64145c71dded81d3ccd39642" //TODO: get user id from session
      })
    });

    if(res.ok) {
      const data = await res.json();
      router.push(`/waitingroom/${data.room._id}`)
    }
  }

  return (
    <section className={styles.createRoomSection}>
      <Typography.Title className={styles.pageTitle}>Create Room</Typography.Title>
      <Form
        className={styles.createRoomForm}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
        }}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={{"participantsCount": 2}}
      >
        <Form.Item label="Room Name: " name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Room Description: " name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Number of participants: " name="participantsCount">
          <InputNumber min={2} max={6} defaultValue={2} />
        </Form.Item>
        <Button htmlType="submit" className={styles.submitBtn} type="primary">Create Room</Button>
      </Form>
      <div className={styles.sideImageContainer}>
      <Image className={styles.sideImage} src="/createRoomImage.png" fill alt="side image" loader={loaderProp} />
      </div>
    </section>
  );
}
