import React, { useState } from 'react';
// @ts-ignore
import { useIntl } from 'umi';
import { Button, Form, FormInstance, Input, message, Upload } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadVideo } from '@/components/ProForm/ProFormVideoFacebook/services';

interface ProFormVideoProps {
  form: FormInstance<any>;
}

const ProFormVideoDailymotion: React.FC<ProFormVideoProps> = ({ form }) => {
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

    if (isVideo && form.getFieldValue('code')) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const data = await uploadVideo(formData, '', form.getFieldValue('code'));
      form.setFieldsValue({ video: data?.link || '' });
      setLoading(false);
    }
  };

  return (
    <Form.Item label={intl.formatMessage({ id: 'pages.video', defaultMessage: 'Video' })}>
      <div className="flex flex-nowrap space-x-1">
        <div className="flex-auto">
          <Form.Item name="video" help="Định dạng 'https://dai.ly/k3Q8UURTuhO2anxjVYy'">
            <Input
              placeholder={intl.formatMessage({
                id: 'pages.video.placeholder',
                defaultMessage: 'Nhập video',
              })}
            />
          </Form.Item>
        </div>
        {false && (
          <Upload
            className="flex-100px"
            name="video"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Upload</Button>
          </Upload>
        )}
      </div>
    </Form.Item>
  );
};

export default ProFormVideoDailymotion;
