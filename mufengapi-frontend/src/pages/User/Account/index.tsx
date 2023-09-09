import ApplyToDevModal from '@/pages/Admin/InterfaceInfo/components/ApplyToDevModal';
import ChangePwdModal from '@/pages/Admin/InterfaceInfo/components/ChangePwdModal';
import { applyInterfaceUsingPOST } from '@/services/mufengapi-backend/applyInterfaceController';
import {
  changeUserPwdUsingPOST,
  getUserByIdUsingGET,
} from '@/services/mufengapi-backend/userController';
import { useModel } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, message, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Paragraph } = Typography;
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState<API.UserVO>();
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [ApplyModalOpen, handleApplyModalOpen] = useState<boolean>(false);
  const colums1 = [
    {
      title: '接口名称：',
      dataIndex: 'InterfaceName',
      valueType: 'text',
    },
    {
      title: '联系方式：',
      dataIndex: 'contact',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '接口地址：',
      dataIndex: 'address',
      valueType: 'text',
    },
    {
      title: '申请接口介绍：',
      dataIndex: 'introduction',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
  ];
  const columns = [
    {
      title: '新密码',
      dataIndex: 'userPassword',
      valueType: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            pattern: /^.{6,16}$/,
            message: '密码必须大于6个字符且小于16个字符！',
          },
        ],
      },
    },
    {
      title: '确认密码',
      dataIndex: 'checkPassword',
      valueType: 'password',
      formItemProps: {
        rules: [
          {
            required: true,
            pattern: /^.{6,16}$/,
            message: '密码必须大于6个字符且小于16个字符！',
          },
        ],
      },
    },
  ];
  // @ts-ignore
  const { loginUser } = initialState;
  const loadData = async () => {
    setLoading(true);
    try {
      await getUserByIdUsingGET({});
      setData(loginUser);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };

  const applyToDev = async (fields: API.ApplyInterfaceRequest) => {
    const hide = message.loading('申请中！');
    try {
      await applyInterfaceUsingPOST({
        userAccount: loginUser.userAccount,
        ...fields,
      });
      hide();
      message.success('申请成功！');
      return true;
    } catch (error: any) {
      hide();
      message.error('申请失败！');
      return false;
    }
  };

  const handleChangePwd = async (fields: API.User) => {
    const hide = message.loading('修改中');
    try {
      await changeUserPwdUsingPOST({
        // @ts-ignore
        Id: loginUser.id,
        ...fields,
      });
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error('修改失败');
      return false;
    }
  };

  const maven = "<dependency>\n" +
      "  <groupId>io.github.mufenge</groupId>\n" +
      "  <artifactId>mufengapi-clientsdk</artifactId>\n" +
      "  <version>1.0</version>\n" +
      "</dependency>";
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageContainer title="个人中心" loading={loading}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card>
            <Descriptions
                column={4}
              title="个人信息"
              size="default"
              layout="horizontal"
              extra={            <Button
                  type="primary"
                  key="primary"
                  onClick={() => {
                    handleUpdateModalOpen(true);
                  }}
              >
                修改密码
              </Button>}
            >
              <Descriptions.Item label="名称">{loginUser?.userAccount}</Descriptions.Item>
              <Descriptions.Item label="性别">
                {loginUser?.gender === ('0' ?? null) ? '女' : '男'}
              </Descriptions.Item>
              <Descriptions.Item label="身份">
                {loginUser?.userRole ?? null === 'admin' ? '管理员' : '普通用户'}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{loginUser?.createTime}</Descriptions.Item>
            </Descriptions>

          </Card>
          <Card
            title="开发者密钥（导入sdk配置ak、sk即可调用接口）"
            extra={
              <>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleApplyModalOpen(true);
                    }}
                  >
                    欢迎申请添加接口
                  </Button>
                </Space>
              </>
            }
          >
            <Descriptions column={1} bordered size="small" layout="vertical">
              <Descriptions.Item label="accessKey">
                <Paragraph copyable={{ tooltips: false }}>{loginUser?.accessKey}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="secretKey">
                <Paragraph copyable={{ tooltips: false }}>{loginUser?.secretKey}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="maven依赖">
                <Paragraph copyable={{ tooltips: false }}>{maven}</Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Space>

        <ChangePwdModal
          //@ts-ignore
          columns={columns}
          onSubmit={async (value) => {
            const success = await handleChangePwd(value);
            if (success) {
              handleUpdateModalOpen(false);
            }
          }}
          onCancel={() => {
            handleUpdateModalOpen(false);
          }}
          visible={updateModalOpen}
        />
        <ApplyToDevModal
          //@ts-ignore
          columns={colums1}
          onCancel={() => {
            handleApplyModalOpen(false);
          }}
          onSubmit={async (values) => {
            const success = await applyToDev(values as API.ApplyInterfaceRequest);
            if (success) {
              handleUpdateModalOpen(false);
            }
          }}
          visible={ApplyModalOpen}
        />
        <br />
      </PageContainer>
    </>
  );
};

export default Index;
