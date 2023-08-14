import Footer from '@/components/Footer';
import {LockOutlined, MobileOutlined, UserOutlined} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, { useState } from 'react';
import { history, Link } from '@@/exports';
import {userRegisterUsingPOST} from "@/services/mufengapi-backend/userController";
import styles from './index.less';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('两次输入密码不一致');
      return;
    }
    try {
      const signature = localStorage.getItem("api-open-platform-randomString")
      // 注册
      let res;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (type === 'register') {
        // 登录
        res = await userRegisterUsingPOST(values,{
          headers: {
            "signature": signature
          },
        });
      } else {

      }
      // @ts-ignore
      if (res.data) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        history.push('/user/login');
        return;
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const [type, setType] = useState<string>('register');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Mufeng API"
          subTitle={
            <>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>
                <b>一个丰富的API开放调用平台</b>
              </p>
            </>
          }
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'register',
                label: '账号密码注册',
              },
              {
                key: 'emailRegister',
                label: 'QQ邮箱注册',
              },
            ]}
          />
          {status === 'error' &&  (
            <LoginMessage content={'错误的用户名和密码'} />
          )}
          {type === 'register' &&
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号：账号应大于4个字符小于16个字符'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{4,16}$/,
                    message: '账号必须大于4个字符并且小于16个字符！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 至少8位'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{8,16}$/,
                    message: '密码必须大于8个字符且小于16个字符！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    pattern:/^.{3,16}$/,
                    message: '两次密码必须一致！',
                  },
                ]}
              />


            </>
          }

          {status === 'error'  && <LoginMessage content="验证码错误" />}
          {type === 'emailRegister' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="emailNum"
                placeholder={'请输入QQ邮箱！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    // pattern: /^1\d{10}$/,    手机号码正则表达式
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '不合法的邮箱！',
                  },
                ]}
              />

            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link
              style={{
                marginBottom: 24,
                float: 'right'
              }}
              to={'/user/login'}
            >
              已有帐号？点击登陆
            </Link>
          </div>

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
