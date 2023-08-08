import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/mufengapi-backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, Descriptions, Form, message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams();
  const [invokeRes, setinvokeRes] = useState<any>();
  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('加载数据失败');
    }

    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setinvokeRes(res.data);
      message.success('请求成功');
    } catch (error:any) {
      message.error('操作失败');
      return false;
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer title={'查看接口文档'}>
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1} extra={<Button>调用</Button>}>
            <Descriptions.Item label="接口状态">{data.status ? '正常' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card loading={loading}>
        <Form layout="vertical" name="invoke" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="调用接口" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
