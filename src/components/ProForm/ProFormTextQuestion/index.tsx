import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
// @ts-ignore
import { useIntl } from 'umi';
import { ColProps } from 'antd';

interface ProFormTextQuestionProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormTextQuestion: React.FC<ProFormTextQuestionProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="question"
      label={intl.formatMessage({ id: 'pages.question', defaultMessage: 'Câu hỏi' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.question.required',
            defaultMessage: 'Câu hỏi là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({ id: 'pages.question.placeholder', defaultMessage: 'Nhập câu hỏi' })}
      {...props}
    />
  );
};

export default ProFormTextQuestion;
