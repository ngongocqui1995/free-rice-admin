import React from 'react';
// @ts-ignore
import { useIntl } from 'umi';
import { ProFormText } from '@ant-design/pro-form';

const ProFormVideoGoogle: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="video"
      label={intl.formatMessage({ id: 'pages.video', defaultMessage: 'Video' })}
      placeholder={intl.formatMessage({
        id: 'pages.video.placeholder',
        defaultMessage: 'Nhập video',
      })}
      help="Định dạng 'https://drive.google.com/file/d/111111111111111111/view'"
      {...props}
    />
  );
};

export default ProFormVideoGoogle;
