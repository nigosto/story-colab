import { Form, Typography, Input, Button } from "antd";
import Image from "next/image";
import styles from "../../styles/signin.module.scss";
import {signIn} from "next-auth/react"

export default function SignIn() {
  const loaderProp = ({ src }) => {
    return src;
  };

  const handleSubmit = async (values) => {
    const res = await signIn("credentials", {
        redirect: "/",
        username: values.username,
        password: values.password
    })

    console.log(res)

    if(!res?.error) {
        router.push("/")
    }
  }

  return (
    <section className={styles.signinSection}>
      <Typography.Title className={styles.pageTitle}>
        Sign In
      </Typography.Title>
      <Form
        className={styles.signinForm}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
        }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Username: "
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password: "
          name="password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit" className={styles.submitBtn} type="primary">Sign in</Button>
      </Form>
      <div className={styles.sideImageContainer}>
        <Image
          className={styles.sideImage}
          src="/signinImage.png"
          fill
          alt="side image"
          loader={loaderProp}
        />
      </div>
    </section>
  );
}
