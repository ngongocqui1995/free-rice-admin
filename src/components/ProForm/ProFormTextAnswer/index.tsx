import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';
import { ColProps } from 'antd';

interface ProFormTextAnswerProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormTextAnswer: React.FC<ProFormTextAnswerProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="answer"
      label={intl.formatMessage({ id: 'pages.answer', defaultMessage: 'Câu trả lời' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.answer.required',
            defaultMessage: 'Câu trả lời là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({ id: 'pages.answer.placeholder', defaultMessage: 'Nhập câu trả lời' })}
      {...props}
    />
  );
};

export default ProFormTextAnswer;
