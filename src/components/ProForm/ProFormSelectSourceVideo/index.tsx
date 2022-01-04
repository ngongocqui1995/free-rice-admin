import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
// @ts-ignore
import { useIntl } from 'umi';
import { SOURCE_VIDEO } from '@/utils/utils.enum';

const ProFormSelectSourceVideo: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="code"
      label={intl.formatMessage({ id: 'pages.source', defaultMessage: 'Nguồn' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.source.required',
            defaultMessage: 'Nguồn là bắt buộc!',
          }),
        },
      ]}
      request={async () => {
        return SOURCE_VIDEO.map((it) => ({ value: `${it.key}`, label: it.text }));
      }}
      {...props}
      params={{ ...props.params, current: 1, pageSize: 100 }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.source.placeholder',
          defaultMessage: 'Chọn nguồn.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectSourceVideo;
