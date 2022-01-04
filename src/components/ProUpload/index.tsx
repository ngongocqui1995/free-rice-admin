import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
// @ts-ignore
import { useIntl } from 'umi';
import { uploadMultipleVideo } from '../ProForm/ProFormVideoFacebook/services';
import { SOURCE_VIDEO_ENUM } from '@/utils/utils.enum';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { createVideoLink } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeForm/components/VideoLinkList/service';
import { CreateVideoLink } from '@/pages/MovieData/Movie/components/MovieForm/components/EpisodeForm/components/VideoLinkList/data';

interface ProUploadType {
  data: any;
}

const ProUpload: React.FC<ProUploadType> = ({ data }) => {
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

    if (isVideo) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('episode', data?.id);
      const result = await uploadMultipleVideo(formData);
      const { sources, link_OkRu, link_Hippo, link_Upfile } = result;
      if (!sources.includes('OK') && link_OkRu)
        await createVideoLink({
          code: SOURCE_VIDEO_ENUM.OK,
          episode: data?.id,
          video: link_OkRu,
        } as CreateVideoLink);
      if (!sources.includes('UF') && link_Upfile)
        await createVideoLink({
          code: SOURCE_VIDEO_ENUM.UF,
          episode: data?.id,
          video: link_Upfile,
        } as CreateVideoLink);
      if (!sources.includes('HP') && link_Hippo)
        await createVideoLink({
          code: SOURCE_VIDEO_ENUM.HP,
          episode: data?.id,
          video: link_Hippo,
        } as CreateVideoLink);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Upload name="video" showUploadList={false} beforeUpload={beforeUpload}>
        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />} />
      </Upload>
    </div>
  );
};

export default ProUpload;
