import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { TextHost } from '@/components/ProForm';
import { ValidAddressModalState } from '@/pages/System/ValidAddress/model';
import { createValidAddress, updateValidAddress } from '@/pages/System/ValidAddress/service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ValidAddressForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const validAddress: ValidAddressModalState = useSelector((state: any) => state?.validAddress);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (validAddress.ValidAddressForm?.type) {
        if (validAddress.ValidAddressForm?.type === 'CREATE') {
          form.resetFields();
        }
        if (
          validAddress.ValidAddressForm?.type === 'UPDATE' ||
          validAddress.ValidAddressForm?.type === 'COPY'
        ) {
          form.setFieldsValue({
            ...validAddress.ValidAddressForm.itemEdit,
          });
        }
      }
      setModalVisible(!!validAddress.ValidAddressForm?.type);
    })();
  }, [validAddress.ValidAddressForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextHost />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'validAddress/updateValidAddressForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        validAddress.ValidAddressForm?.type === 'UPDATE'
          ? intl.formatMessage({
              id: 'pages.System.ValidAddress.ValidAddressForm.Update.title',
              defaultMessage: 'Cập nhật địa chỉ hợp lệ',
            })
          : intl.formatMessage({
              id: 'pages.System.ValidAddress.ValidAddressForm.Create.title',
              defaultMessage: 'Thêm mới địa chỉ hợp lệ',
            })
      }
      forceRender
      destroyOnClose
      visible={modalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <div ref={modalRef}>
        <ProForm
          form={form}
          {...formLayout}
          layout="horizontal"
          onFinish={async (values) => {
            const res = await (validAddress.ValidAddressForm?.type === 'UPDATE'
              ? updateValidAddress(validAddress.ValidAddressForm?.itemEdit?.id || '', values)
              : createValidAddress(values));
            if (res) {
              onCancel();
              validAddress.ValidAddressList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                validAddress.ValidAddressForm?.type === 'UPDATE'
                  ? intl.formatMessage({
                      id: 'pages.System.ValidAddress.ValidAddressForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.System.ValidAddress.ValidAddressForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.System.ValidAddress.ValidAddressForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: validAddress.ValidAddressForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default ValidAddressForm;
