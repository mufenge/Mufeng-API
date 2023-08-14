import { getInvokeUserInfoUsingGET } from '@/services/mufengapi-backend/userInterfaceInfoController';
import { useModel } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, List, message, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [list, setList] = useState<API.UserInterfaceInfo[]>([]);

  const loadData = async () => {
    // @ts-ignore
    const { loginUser } = initialState;
    setLoading(true);
    try {
      const res = await getInvokeUserInfoUsingGET({
        userId: loginUser.id,
      });
      setList(res?.data ?? []);
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
      <PageContainer title="个人接口信息" loading={loading}>


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
