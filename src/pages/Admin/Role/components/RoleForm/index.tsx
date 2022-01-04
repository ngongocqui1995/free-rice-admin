import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { SelectColor, TextName, UploadAvatar } from '@/components/ProForm';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { createRole, updateRole } from '@/pages/Admin/Role/service';
import { getKeyFromString } from '@/utils/utils';
import RoleToMenuList from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList';
import RoleToMenuForm from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuForm';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const RoleForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const colorRef = useRef<ActionColor>();
  const avatarRef = useRef<ActionAvatar>();
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (role.RoleForm?.type) {
        if (role.RoleForm?.type === 'CREATE') {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
          colorRef.current?.setColor('#fff');
        }
        if (role.RoleForm?.type === 'UPDATE' || role.RoleForm?.type === 'COPY') {
          form.setFieldsValue({
            ...role.RoleForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(role.RoleForm.itemEdit?.avatar || '');
          colorRef.current?.setColor(role.RoleForm.itemEdit?.color || '');
        }
      }
      setModalVisible(!!role.RoleForm?.type);
    })();
  }, [role.RoleForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <UploadAvatar ref={avatarRef} />
            <TextName />
            <SelectColor form={form} ref={colorRef} />
          </div>
        </div>
        {role.RoleForm?.type === 'UPDATE' && (
          <Card>
            <RoleToMenuList />
            <RoleToMenuForm />
          </Card>
        )}
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'role/updateRoleForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
    colorRef.current?.setColor('#fff');
  };

  return (
    <Modal
      width={role.RoleForm?.type === 'UPDATE' ? 1000 : 600}
      title={
        role.RoleForm?.type === 'UPDATE'
          ? intl.formatMessage({
              id: 'pages.Admin.Role.RoleForm.Update.title',
              defaultMessage: 'Cập nhật role',
            })
          : intl.formatMessage({
              id: 'pages.Admin.Role.RoleForm.Create.title',
              defaultMessage: 'Thêm mới role',
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
              code: getKeyFromString(values.name),
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (role.RoleForm?.type === 'UPDATE'
              ? updateRole(role.RoleForm?.itemEdit?.id || '', body)
              : createRole(body));
            if (res) {
              onCancel();
              role.RoleList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                role.RoleForm?.type === 'UPDATE'
                  ? intl.formatMessage({
                      id: 'pages.Admin.Role.RoleForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.Role.RoleForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Role.RoleForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: role.RoleForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
          onReset={() => {
            avatarRef.current?.setImageUrl('');
            colorRef.current?.setColor('#fff');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoleForm;
