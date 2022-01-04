import React, { useState } from 'react';
import { FormInstance, message, Upload, Form, Button, Input } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
// @ts-ignore
import { useIntl } from 'umi';
import { TYPE_VIDEO } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { uploadVideo } from '@/components/ProForm/ProFormVideoFacebook/services';

interface ProFormVideoProps {
  form: FormInstance<any>;
}

const ProFormVideoFacebook: React.FC<ProFormVideoProps> = ({ form }) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const beforeUpload = async (file: any) => {
    const isVideo = !!file.type.match(/(mov|avi|wmv|flv|3gp|mp4|mpg|ts)/);
    if (!isVideo) {
      message.error(
        intl.formatMessage({
          id: 'pages.ProForm.Video.errors.type',
          defaultMessage: 'Bạn chỉ có thể up lên file mov|avi|wmv|flv|3gp|mp4|mpg|ts!',
        }),
      );
      return;
    }

    if (!form.getFieldValue('type')) {
      message.error(
        intl.formatMessage({
          id: 'pages.type.required',
          defaultMessage: 'Loại là bắt buộc!',
        }),
      );
      return;
    }

    if (!form.getFieldValue('code')) {
      message.error(
        intl.formatMessage({
          id: 'pages.source.required',
          defaultMessage: 'Nguồn là bắt buộc!',
        }),
      );
      return;
    }

    if (isVideo && form.getFieldValue('code') && form.getFieldValue('type')) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const data = await uploadVideo(
        formData,
        form.getFieldValue('type'),
        form.getFieldValue('code'),
      );
      form.setFieldsValue({ video: data?.link || '' });
      setLoading(false);
    }
  };

  return (
    <>
      <ProFormSelect
        name="type"
        label={intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: 'pages.type.required',
              defaultMessage: 'Loại là bắt buộc!',
            }),
          },
        ]}
        showSearch
        request={async () => {
          return TYPE_VIDEO?.map((it) => ({
            value: it.key,
            label: intl.formatMessage({ id: it.id, defaultMessage: it.text }),
          }));
        }}
        fieldProps={{
          placeholder: intl.formatMessage({
            id: 'pages.type.placeholder',
            defaultMessage: 'Chọn loại.',
          }),
        }}
      />
      <Form.Item label={intl.formatMessage({ id: 'pages.video', defaultMessage: 'Video' })}>
        <div className="flex flex-nowrap space-x-1">
          <div className="flex-auto">
            <Form.Item name="video">
              <Input />
            </Form.Item>
          </div>
          <Upload
            className="flex-100px"
            name="video"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
      </Form.Item>
    </>
  );
};

export default ProFormVideoFacebook;
