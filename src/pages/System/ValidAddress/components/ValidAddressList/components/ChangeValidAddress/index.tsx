import React from 'react';
import { Switch } from 'antd';
import { useSelector } from 'umi';
import { ValidAddressItem } from '@/pages/System/ValidAddress/data';
import { ValidAddressModalState } from '@/pages/System/ValidAddress/model';
import { changeValidAddress } from '@/pages/System/ValidAddress/service';

interface ChangeValidAddressProps {
  status: string;
  record: ValidAddressItem;
}

const ChangeValidAddress: React.FC<ChangeValidAddressProps> = ({ status, record }) => {
  const validAddress: ValidAddressModalState = useSelector((state: any) => state?.validAddress);

  const onChange = async (checked: boolean) => {
    const res = await changeValidAddress(record.id, checked ? 'ACTIVE' : 'INACTIVE');
    if (res) validAddress.ValidAddressList?.reload?.();
  };

  return <Switch checked={status === 'ACTIVE'} onChange={onChange} />;
};

export default ChangeValidAddress;
