import {
  changeUserPwdUsingPOST,
  getUserByIdUsingGET,
} from '@/services/mufengapi-backend/userController';
import {useModel} from '@@/exports';
import {PageContainer} from '@ant-design/pro-components';
import { Card, Descriptions, message } from 'antd';
import Button from 'antd/lib/button';
import React, { useEffect, useState } from 'react';
import ChangePwdModal from "@/pages/Admin/InterfaceInfo/components/ChangePwdModal";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState<API.UserVO>();
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const columns = [
    {
      title: '新密码',
      dataIndex: 'userPassword',
      valueType: 'number',

    },
    {
      title: '确认密码',
      dataIndex: 'checkPassword',
      valueType: 'number',
    },
  ]
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

  const handleChangePwd = async (fields: API.User) => {
    const hide = message.loading('修改中');
    try {
      await changeUserPwdUsingPOST({
        // @ts-ignore
        Id: loginUser.id,
        ...fields
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
  useEffect(() => {
    loadData();
  }, []);

  // @ts-ignore
  return (
    <>
      <PageContainer title="个人账号信息" loading={loading}>
        <Card>
          {data ? (
            <Descriptions column={2}>
              <Descriptions.Item label="用户名">{data.userAccount}</Descriptions.Item>
              <Descriptions.Item label="用户Id">{data.id}</Descriptions.Item>
              <Descriptions.Item label="用户Id">{data.id}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            </Descriptions>
          ) : (
            <>接口不存在</>
          )}
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalOpen(true);
            }}
          >
             修改密码
          </Button>
        </Card>
        <br />
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
        <br />

      </PageContainer>
    </>
  );
};

export default Index;
