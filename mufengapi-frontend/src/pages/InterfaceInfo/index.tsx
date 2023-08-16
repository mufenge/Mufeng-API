import {
  invokeCommonInterfaceUsingPOST,
  invokeQueryDomainInterfaceUsingPOST,
  invokeQueryHistoryInterfaceUsingPOST,
  invokeQueryICPInterfaceUsingPOST,
  invokeQueryRCInterfaceUsingPOST,
  invokeRandomAvatarInterfaceUsingPOST,
  invokeRandomCXKInterfaceUsingPOST,
  invokeRandomWordsInterfaceUsingPOST,
} from '@/services/mufengapi-backend/interfaceController';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/mufengapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import {Button, Card, Descriptions, Form, message, Tag} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 接口文档
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

    // @ts-ignore
    let interfaceId = data.id;
    if (interfaceId === 1) {
      try {
        const res = await invokeQueryICPInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 2) {
      try {
        const res = await invokeCommonInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 3) {
      try {
        const res = await invokeInterfaceInfoUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 4) {
      try {
        const res = await invokeRandomWordsInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 5) {
      try {
        const res = await invokeQueryDomainInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 6) {
      try {
        const res = await invokeQueryHistoryInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 7) {
      try {
        const res = await invokeRandomAvatarInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 8) {
      try {
        const res = await invokeRandomCXKInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
    if (interfaceId === 9) {
      try {
        const res = await invokeQueryRCInterfaceUsingPOST({
          id: params.id,
          ...values,
        });
        setinvokeRes(res.data);
        if (res.data){
          message.success('请求成功');
        }else {
          message.error('操作失败');
        }
      } catch (error: any) {
        return false;
      }
      setInvokeLoading(false);
    }
  };

  return (
    <PageContainer title={'接口文档'}>
      <Card>
        {data ? (
          <Descriptions title={data.name} column={2}>
            <Descriptions.Item label="接口状态">{!data.status ? <Tag color="red">禁用</Tag> : <Tag color="green">正常</Tag>}</Descriptions.Item>
            <Descriptions.Item label="接口Id">{data.id}</Descriptions.Item>
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
      <img src={invokeRes} />
      <Card title="返回信息" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
