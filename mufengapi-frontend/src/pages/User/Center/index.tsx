import {PageContainer} from '@ant-design/pro-components';
import {Card, Descriptions, message, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel} from '@@/exports';


const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.UserInterfaceInfo>();
  const {initialState} = useModel('@@initialState');

  const loadData = async () => {
    // @ts-ignore
    const {loginUser} = initialState;
    setLoading(true);
    try {
      const res = await getInterfaceInfoByUserIdUsingGET({
        userId: loginUser.id,
      });
      setData(res.data);
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
      <PageContainer title="个人中心" loading={loading}>

        <Card>
          {data ? (
            <Descriptions column={1}>
              <Descriptions.Item label="账号状态">{!data.status ? <Tag color="red">禁用</Tag> : <Tag color="green">正常</Tag>}</Descriptions.Item>
              <Descriptions.Item label="接口ID">{data.interfaceInfoId}</Descriptions.Item>
              <Descriptions.Item label="总调用次数">{data.totalNum}</Descriptions.Item>
              <Descriptions.Item label="剩余调用次数">{data.leftNum}</Descriptions.Item>
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
