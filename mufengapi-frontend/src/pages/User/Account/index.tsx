import { useModel } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {getUserByIdUsingGET} from "@/services/mufengapi-backend/userController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {initialState } = useModel('@@initialState');
  const [data, setData] = useState<API.UserVO>();
  // @ts-ignore
  const { loginUser } = initialState;
  const loadData = async () => {

    setLoading(true);
    try {
      await getUserByIdUsingGET({

      });
      setData(loginUser);
    } catch (e: any) {
      message.error('获取数据失败，' + e.message);
    }
    setLoading(false);
    return;
  };

  useEffect(() => {
    loadData();
  }, []);

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
        </Card>
      </PageContainer>
    </>
  );
};

export default Index;
