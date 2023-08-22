import Footer from '@/components/Footer';
import {
  emailLoginUsingPOST,
  sendMailUsingPOST,
  userRegisterUsingPOST,
} from '@/services/mufengapi-backend/userController';
import { history, Link } from '@@/exports';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProForm, ProFormCaptcha, ProFormText} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const Register: React.FC = () => {
  const [form] = ProForm.useForm();
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('两次输入密码不一致');
      return;
    }

    try {
      // 注册
      let res;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (type === 'register') {
        // 登录
        res = await userRegisterUsingPOST(values, {
        });
      } else {
        const email = form.getFieldValue('email');
        const code = form.getFieldValue('code');
        const values = {email,code}
        res = await emailLoginUsingPOST(values,{
        });
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
      message.error(error.message);
    }
  };
  const [type, setType] = useState<string>('register');
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
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm form={form}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}

          logo={<img alt="logo" src="/logo.svg" />}
          title="Mufeng API"
          subTitle={
            <>
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
                label: '账号注册',
              },
              {
                key: 'emailRegister',
                label: '邮箱注册',
              },
            ]}
          />
          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号：至少4位'}
                rules={[
                  {
                    required: true,
                    pattern: /^.{4,22}$/,
                    message: '账号必须大于4个字符并且小于22个字符！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 至少6位'}
                rules={[
                  {
                    required: true,
                    pattern: /^.{6,16}$/,
                    message: '密码必须大于6个字符且小于16个字符！',
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
                    pattern: /^.{3,16}$/,
                    message: '两次密码必须一致！',
                  },
                ]}
              />
            </>
          )}
          {type === 'emailRegister' && (
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
                // 手机号的 name，onGetCaptcha 会注入这个值
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
            <Link
              style={{
                marginBottom: 24,
                float: 'right',
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
