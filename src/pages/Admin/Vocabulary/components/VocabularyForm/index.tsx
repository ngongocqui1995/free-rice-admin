import React, { useEffect, useRef, useState } from 'react';
import { Modal, Card, Space, Form } from 'antd';
// @ts-ignore
import { useDispatch, useSelector, useIntl } from 'umi';
import ProForm from '@ant-design/pro-form';
import {TextAnswer, TextQuestion} from '@/components/ProForm';
import { VocabularyModalState } from '@/pages/Admin/Vocabulary/model';
import { createVocabulary, updateVocabulary } from '@/pages/Admin/Vocabulary/service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const VocabularyForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const vocabulary: VocabularyModalState = useSelector((state: any) => state?.vocabulary);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    (function () {
      if (vocabulary.VocabularyForm?.type) {
        if (vocabulary.VocabularyForm?.type === 'CREATE') {
          form.resetFields();
        }
        if (vocabulary.VocabularyForm?.type === 'UPDATE' || vocabulary.VocabularyForm?.type === 'COPY') {
          form.setFieldsValue({
            ...vocabulary.VocabularyForm.itemEdit,
          });
        }
      }
      setModalVisible(!!vocabulary.VocabularyForm?.type);
    })();
  }, [vocabulary.VocabularyForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <TextQuestion />
            <TextAnswer />
          </div>
        </div>
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'vocabulary/updateVocabularyForm', payload: { type: '' } });
    form.resetFields();
  };

  return (
    <Modal
      width={vocabulary.VocabularyForm?.type === 'UPDATE' ? 1000 : 600}
      title={
        vocabulary.VocabularyForm?.type === 'UPDATE'
          ? intl.formatMessage({
              id: 'pages.Admin.Vocabulary.VocabularyForm.Update.title',
              defaultMessage: 'Cập nhật từ vựng',
            })
          : intl.formatMessage({
              id: 'pages.Admin.Vocabulary.VocabularyForm.Create.title',
              defaultMessage: 'Thêm mới từ vựng',
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
            };
            const res = await (vocabulary.VocabularyForm?.type === 'UPDATE'
              ? updateVocabulary(vocabulary.VocabularyForm?.itemEdit?.id || '', body)
              : createVocabulary(body));
            if (res) {
              onCancel();
              vocabulary.VocabularyList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                vocabulary.VocabularyForm?.type === 'UPDATE'
                  ? intl.formatMessage({
                      id: 'pages.Admin.Vocabulary.VocabularyForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.Vocabulary.VocabularyForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Vocabulary.VocabularyForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: vocabulary.VocabularyForm?.type === 'UPDATE' ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default VocabularyForm;
