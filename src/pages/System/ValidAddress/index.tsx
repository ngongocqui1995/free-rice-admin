import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ValidAddressForm from '@/pages/System/ValidAddress/components/ValidAddressForm';
import ValidAddressList from '@/pages/System/ValidAddress/components/ValidAddressList';

const ValidAddress: React.FC = () => {
  return (
    <PageContainer>
      <ValidAddressForm />
      <ValidAddressList />
    </PageContainer>
  );
};

export default ValidAddress;
