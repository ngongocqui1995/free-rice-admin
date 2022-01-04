import { Button } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useDispatch } from 'umi';
import Access from '@/components/Access';

const CreateValidAddress: React.FC = () => {
  const dispatch = useDispatch();
  const access = Access();

  const handleClick = () => {
    dispatch({ type: 'validAddress/updateValidAddressForm', payload: { type: 'CREATE' } });
  };

  return (
    <Button
      className={`${access.className(['CREATE'])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateValidAddress;
