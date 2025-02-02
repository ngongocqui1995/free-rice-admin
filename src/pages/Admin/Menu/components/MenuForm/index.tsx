import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import { SelectTypeMenu, TextUrl } from '@/components/ProForm';
import { MenuModalState } from '@/pages/Admin/Menu/model';
import { createMenu, updateMenu } from '@/pages/Admin/Menu/service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MenuForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const menu: MenuModalState = useSelector((state: any) => state?.menu);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (menu.MenuForm?.type) {
        if (menu.MenuForm?.type === 'CREATE') {
          form.resetFields();
        }
        if (menu.MenuForm?.type === 'UPDATE' || menu.MenuForm?.type === 'COPY') {
          form.setFieldsValue({
            ...menu.MenuForm.itemEdit,
          });
        }
      }
      setModalVisible(!!menu.MenuForm?.type);
    })();
  }, [menu.MenuForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextUrl />
        <SelectTypeMenu />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'menu/updateMenuForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      title={
        menu.MenuForm?.type === 'UPDATE'
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
            const res = await (menu.MenuForm?.type === 'UPDATE'
              ? updateMenu(menu.MenuForm?.itemEdit?.id || '', values)
              : createMenu(values));
            if (res) {
              onCancel();
              menu.MenuList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                menu.MenuForm?.type === 'UPDATE'
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
              className: menu.MenuForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default MenuForm;
