import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { UserModalState } from '@/pages/Admin/User/model';
import {
  SelectGender,
  SelectRole,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { createUser, updateUser } from '@/pages/Admin/User/service';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const user: UserModalState = useSelector((state: any) => state?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const avatarRef = useRef<ActionAvatar>();
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (user.UserForm?.type) {
        if (user.UserForm?.type === 'CREATE') {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
        }
        if (user.UserForm?.type === 'UPDATE' || user.UserForm?.type === 'COPY') {
          form.setFieldsValue({
            ...user.UserForm.itemEdit,
            role: user.UserForm.itemEdit?.role?.id,
          });
          avatarRef.current?.setImageUrl(user.UserForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!user.UserForm?.type);
    })();
  }, [user.UserForm?.type]);

  const renderContent = () => {
    return (
      <>
        <UploadAvatar ref={avatarRef} />
        <TextName />
        <TextPhone />
        <TextEmail />
        {user.UserForm?.type !== 'UPDATE' && <TextPassword />}
        <SelectGender
          fieldProps={{
            getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
          }}
        />
        <SelectRole
          fieldProps={{
            getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
          }}
        />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'user/updateUserForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  return (
    <Modal
      width={600}
      title={
        user.UserForm?.type === 'UPDATE'
          ? intl.formatMessage({
              id: 'pages.Admin.User.UserForm.Update.title',
              defaultMessage: 'Cập nhật người dùng',
            })
          : intl.formatMessage({
              id: 'pages.Admin.User.UserForm.Create.title',
              defaultMessage: 'Thêm mới người dùng',
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
            const body = {
              ...values,
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (user.UserForm?.type === 'UPDATE'
              ? updateUser(user.UserForm?.itemEdit?.id || '', body)
              : createUser(body));
            if (res) {
              onCancel();
              user.UserList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                user.UserForm?.type === 'UPDATE'
                  ? intl.formatMessage({
                      id: 'pages.Admin.User.UserForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.User.UserForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.User.UserForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: user.UserForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
          onReset={() => {
            avatarRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default UserForm;
