import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { SelectMenu, SelectPermission, SelectTypeMenu } from '@/components/ProForm';
import { RoleModalState } from '@/pages/Admin/Role/model';
import {
  createRoleToMenu,
  updateRoleToMenu,
} from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const RoleToMenuForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (role.MenuForm?.type) {
        if (role.MenuForm?.type === 'CREATE') {
          form.resetFields();
        }
        if (role.MenuForm?.type === 'UPDATE' || role.MenuForm?.type === 'COPY') {
          form.setFieldsValue({
            ...role.MenuForm.itemEdit,
            menu: role.MenuForm.itemEdit?.menu?.id,
            permissions: role.MenuForm.itemEdit?.permissions?.map((it) => it.id),
          });
        }
      }
      setModalVisible(!!role.MenuForm?.type);
    })();
  }, [role.MenuForm?.type]);

  const renderContent = () => {
    return (
      <>
        <SelectTypeMenu
          fieldProps={{
            onChange: () => {
              form.setFieldsValue({ menu: undefined });
            },
          }}
        />
        <ProFormDependency name={['type']}>
          {({ type }) => {
            return (
              <SelectMenu
                params={{
                  type,
                  roles: role.MenuForm?.type === 'UPDATE' ? undefined : role.RoleForm?.itemEdit?.id,
                }}
              />
            );
          }}
        </ProFormDependency>
        <SelectPermission />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'role/updateMenuForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        role.MenuForm?.type === 'UPDATE'
          ? intl.formatMessage({
              id: 'pages.Admin.Menu.MenuForm.Update.title',
              defaultMessage: 'Cập nhật menu',
            })
          : intl.formatMessage({
              id: 'pages.Admin.Menu.MenuForm.Create.title',
              defaultMessage: 'Thêm mới menu',
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
              role: role.RoleForm?.itemEdit?.id,
              permissions: values.permissions?.map((it: string) => ({ id: it })),
            };
            const res = await (role.MenuForm?.type === 'UPDATE'
              ? updateRoleToMenu(role.MenuForm?.itemEdit?.id || '', body)
              : createRoleToMenu(body));
            if (res) {
              onCancel();
              role.MenuList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                role.MenuForm?.type === 'UPDATE'
                  ? intl.formatMessage({
                      id: 'pages.Admin.Menu.MenuForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.Menu.MenuForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Menu.MenuForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: role.MenuForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoleToMenuForm;
