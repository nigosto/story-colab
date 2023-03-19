import { Button, Form, Input, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isRepeatPasswordEmpty, setIsRepeatPasswordEmptyEmpty] = useState(true);
  const router = useRouter()

  const handleFinish = async (values) => {
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        email: values.email,
      }),
    });

    if (!res?.error) {
      router.push("/auth/signin");
    }
  };

  return (
    <section>
      <Typography.Title>Sign Up</Typography.Title>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
        }}
        layout="horizontal"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          label="Username: "
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(value) => {
              if (value !== null) {
                setIsUsernameEmpty(false);
              } else {
                setIsUsernameEmpty(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email: "
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            onChange={(value) => {
              if (value !== null) {
                setIsEmailEmpty(false);
              } else {
                setIsEmailEmpty(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password: "
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            type="password"
            onChange={(value) => {
              if (value !== null) {
                setIsPasswordEmpty(false);
              } else {
                setIsPasswordEmpty(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          label="Repeat Password: "
          rules={[{ required: true, message: "Please repeat your pasword!" }]}
        >
          <Input
            type="password"
            onChange={(value) => {
              if (value !== null) {
                setIsRepeatPasswordEmptyEmpty(false);
              } else {
                setIsRepeatPasswordEmptyEmpty(true);
              }
            }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            isEmailEmpty ||
            isPasswordEmpty ||
            isRepeatPasswordEmpty ||
            isUsernameEmpty
          }
        >
          Submit
        </Button>
      </Form>
    </section>
  );
}
