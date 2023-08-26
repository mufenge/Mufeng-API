import Footer from '@/components/Footer';
import {
  emailLoginUsingPOST,
  sendMailUsingPOST,
  userLoginUsingPOST
} from '@/services/mufengapi-backend/userController';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, SelectLang, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {flushSync} from "react-dom";
import {Link} from "@@/exports";
import styles from "@/pages/User/Register/index.less";

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang="">
      {SelectLang && <SelectLang />}
    </div>
  );
};
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const [form] = ProForm.useForm();
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = (userInfo: API.UserVO)=>{
    if(userInfo){
      flushSync(()=>{
        setInitialState({loginUser: userInfo});
      })
    }
  }
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      let res;
      // 登录
      if (type === "account"){
        res = await userLoginUsingPOST({ ...values });
        if (res.data) {
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          fetchUserInfo(res.data);
          message.success("登录成功！")
        }else {
          message.error("账号或密码错误！")
        }
      }else if (type === "email"){
        const email = form.getFieldValue("email");
        const code = form.getFieldValue("code");
        const values = {email,code};
        console.log(values);
        res = await emailLoginUsingPOST(values,{
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (res.data){
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          fetchUserInfo(res.data);
        }
      }

    } catch (error) {
      message.error("登录失败");
    }
  };
  const onGetCaptcha = async () =>{
    const email = form.getFieldValue('email');
    const values = {email};
    // @ts-ignore
    const res = await sendMailUsingPOST(values,{

    });
    if (res){
      message.success("验证码发送成功,请注意查收！");
    }else {
      message.error("验证码发送失败！");
    }
  }
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          登录页,
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm form={form}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Mufeng API"
          subTitle={'一个丰富的API开放调用平台' }
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号登录',
              },
              {
                key: 'email',
                label: '邮箱注册登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: ("请输入账号!"),
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: ("请输入密码!"),
                  },
                ]}
              />
            </>
          )}
          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                name="email"
                placeholder={'请输入邮箱！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '不合法的邮箱！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入6位验证码！',
                  },
                  {
                    pattern: /^[0-9]\d{5}$/,
                    message: '请输入6位数字验证码！',
                  },
                ]}
                onGetCaptcha={onGetCaptcha}

              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link
              style={{
                float: 'right'
              }}
              to={'/user/register'}
            >
              没有账号？点击注册
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
