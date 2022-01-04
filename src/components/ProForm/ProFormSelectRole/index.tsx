import React from 'react';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { getAllRoles } from '@/pages/Admin/Role/service';
// @ts-ignore
import { useIntl } from 'umi';
import { statusEnum } from '@/utils/utils.enum';

const ProFormSelectRole: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="role"
      label={intl.formatMessage({ id: 'pages.role', defaultMessage: 'Role' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.role.required',
            defaultMessage: 'Role là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllRoles({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.role.placeholder',
          defaultMessage: 'Chọn role.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectRole;
