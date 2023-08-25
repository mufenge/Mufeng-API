import { ProLayoutProps } from '@ant-design/pro-components';
const Settings: ProLayoutProps & {
  pwa?: boolean;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: 'Mufeng API',
  pwa: true,
  iconfontUrl: '',
  menu: {
    locale: false,
  },
  token: {
  },
};

export default Settings;
