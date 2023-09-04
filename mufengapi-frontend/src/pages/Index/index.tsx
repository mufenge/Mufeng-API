import { listInterfaceInfoByPageUsingGET } from '@/services/mufengapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import {Button, List, message, Tag} from 'antd';
import React,{ useEffect,useState } from 'react';
import {Link} from "@umijs/renderer-react";
import {ApiOutlined} from "@ant-design/icons";


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 8) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error) {
      message.error('加载数据失败');
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={'在线API开放平台'}>
      <List
        className="my-list"
        size="large"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        bordered={true}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <Link key={item.id} to={apiLink}>
                <Button key={123} type="primary" icon={<ApiOutlined />}>
                    在线调用
                </Button>
                </Link>
              ]}
            >
              <List.Item.Meta
                title={<Link to={apiLink}>{item.name}</Link>}
                description={item.description}
              />
              <List.Item.Meta
                  title="请求参数"
                  description={item.requestParams}
              />
              <List.Item.Meta
                  title="接口状态"
                  description={item.status ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag>}
              />
              <List.Item.Meta
                  title="请求方法"
                  description={item.method}
              />
            </List.Item>
          );
        }}
        pagination={{
          showTotal(total) {
            return '总数:' + total;
          },
          pageSize: 8,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
