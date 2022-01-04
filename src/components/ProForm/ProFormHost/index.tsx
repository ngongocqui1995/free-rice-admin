import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';

interface ProFormTextNameProps {
  name?: string;
}

const ProFormHost: React.FC<ProFormTextNameProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="host"
      label={intl.formatMessage({ id: 'pages.host', defaultMessage: 'Host' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.host.required',
            defaultMessage: 'Host là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({ id: 'pages.host.placeholder', defaultMessage: 'Nhập tên' })}
      {...props}
    />
  );
};

export default ProFormHost;
