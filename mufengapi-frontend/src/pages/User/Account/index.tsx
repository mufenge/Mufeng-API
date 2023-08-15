import {
  changeUserPwdUsingPOST,
  getUserByIdUsingGET,
} from '@/services/mufengapi-backend/userController';
import { getInvokeUserInfoUsingGET } from '@/services/mufengapi-backend/userInterfaceInfoController';
import {useModel} from '@@/exports';
import {PageContainer} from '@ant-design/pro-components';
import { Card, Descriptions, List, message, Tag } from 'antd';
import Button from 'antd/lib/button';
import React, { useEffect, useState } from 'react';
import ChangePwdModal from "@/pages/Admin/InterfaceInfo/components/ChangePwdModal";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState<API.UserVO>();
  const [list, setList] = useState<API.UserInterfaceInfo[]>([]);
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
  const loadData1 = async () => {
    setLoading(true);
    try {
      const res = await getInvokeUserInfoUsingGET({
      });
      setList(res?.data ?? []);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };
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
    loadData1();
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
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Card title="调用接口信息">
                <Descriptions column={1}>
                  <Descriptions.Item label="接口ID">{item.interfaceInfoId}</Descriptions.Item>
                  <Descriptions.Item label="账号状态">
                    {!item.status ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>}
                  </Descriptions.Item>
                  <Descriptions.Item label="总调用次数">{item.totalNum}</Descriptions.Item>
                  <Descriptions.Item label="剩余调用次数">{item.leftNum}</Descriptions.Item>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      </PageContainer>
    </>
  );
};

export default Index;
