import ApplyToDevModal from '@/pages/Admin/InterfaceInfo/components/ApplyToDevModal';
import ChangePwdModal from '@/pages/Admin/InterfaceInfo/components/ChangePwdModal';
import { requestConfig } from '@/requestConfig';
import {
  changeUserPwdUsingPOST,
  getUserByIdUsingGET,
} from '@/services/mufengapi-backend/userController';
import { useModel } from '@@/exports';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  message,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';

const { Paragraph } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt3M;
};

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useState<API.UserVO>();
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [ApplyModalOpen, handleApplyModalOpen] = useState<boolean>(false);
  const colums1 = [
    {
      title: '名称：',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '邮箱：',
      dataIndex: 'email',
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
      title: 'QQ:',
      dataIndex: 'QQ',
      valueType: 'text',
    },
    {
      title: '申请理由：',
      dataIndex: 'reason',
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
  const [imageUrl, setImageUrl] = useState<string | null>(loginUser?.userAvatar ?? null);
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
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const applyToDev = async () => {};

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
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageContainer title="个人账号信息" loading={loading}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card
            title=""
            actions={[
              <b key="gender">性别：{loginUser?.gender === ('0' ?? null) ? '女' : '男'}</b>,
              <b key="time">创建时间：{loginUser?.createTime ?? null}</b>,
              <b key="role">
                身份：{loginUser?.userRole ?? null === 'admin' ? '管理员' : '普通用户'}
              </b>,
            ]}
          >
            <Card.Meta
              avatar={
                <>
                  <Upload
                    name="file"
                    // listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    maxCount={1}
                    withCredentials={true}
                    action={requestConfig.baseURL + '/api/user/update/avatar'}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <Avatar
                        size={{ xs: 30, sm: 40, md: 48, lg: 70, xl: 88, xxl: 100 }}
                        src={imageUrl}
                        icon={<UserOutlined />}
                      />
                    ) : (
                      <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>上传头像</div>
                      </div>
                    )}
                  </Upload>
                </>
              }
              title={loginUser?.userName ?? null}
              description={'账号：' + loginUser?.userAccount ?? null}
            />
          </Card>
          <Card>
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
          <Card
            title="开发者密钥（申请成为开发者后可获取！）"
            extra={
              <>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleApplyModalOpen(true);
                    }}
                  >
                    申请成为开发者
                  </Button>
                </Space>
              </>
            }
          >
            <Descriptions column={1} bordered size="small" layout="vertical">
              <Descriptions.Item label="accessKey">
                <Paragraph copyable={{ tooltips: false }}>{'******************'}</Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="secretKey">
                <Paragraph copyable={{ tooltips: false }}>{'******************'}</Paragraph>
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
          onSubmit={async () => {
            await applyToDev();
            handleUpdateModalOpen(false);
          }}
          visible={ApplyModalOpen}
        />
        <br />
      </PageContainer>
    </>
  );
};

export default Index;
