import { Form, Typography, Input, Button } from "antd";
import Image from "next/image";
import styles from "../../styles/signin.module.css";
import {getSession, signIn} from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  const loaderProp = ({ src }) => {
    return src;
  };

  useEffect(() => {
    getSession().then((session) => {
      if(session) {
        router.replace("/")
      }
      else {
        setIsLoading(false)
      }
    })
  })

  const handleSubmit = async (values) => {
    const res = await signIn("credentials", {
        redirect: "/",
        username: values.username,
        password: values.password
    })

    if(!res?.error) {
        router.push("/")
    }
  }

  if(isLoading) {
    return <div>Loading...</div>
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
        onSubmit={(e) => {e.preventDefault()}}
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
          <Input type="password" />
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
