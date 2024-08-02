"use client";


import React, { useEffect, useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await signIn('credentials', {
      redirect: false,
      username: email,
      password,
    });
    if (result.error) {
      alert(result.error);
    } else {
      router.push('/dashboard');
    }
    console.log('Received values of form: ', values);
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%',
    },
    forgotPassword: {
      float: 'right',
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to sign in.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button className="sign-in-button" block={true} type="primary" htmlType="submit">
              Log in
            </Button>

            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  block={true}
                  type="primary"
                  onClick={() => signIn(provider.id)}
                  className={`sign-in-button ${provider.name.toLowerCase()}`}
                >
                  {provider.name === 'Google' && <FaGoogle className="icon" />}
                  {provider.name === 'GitHub' && <FaGithub className="icon" />}
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
            <div style={styles.footer}>
              <Text style={styles.text}>Dont have an account?</Text>{' '}
              <Link href="#">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
