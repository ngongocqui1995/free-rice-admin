import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getCopyTooltip,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EditTwoTone, CopyTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import { VocabularyItem } from '@/pages/Admin/Vocabulary/data';
import Access from '@/components/Access';
import {queryVocabulary} from "@/pages/Admin/Vocabulary/service";
import CreateVocabulary from "@/pages/Admin/Vocabulary/components/VocabularyList/components/ToolBar/CreateVocabulary";

const VocabularyList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'vocabulary/updateVocabularyList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<VocabularyItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Vocabulary.VocabularyList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo câu hỏi.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Vocabulary.VocabularyList.placeholder',
          defaultMessage: 'Nhập câu hỏi.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.question', defaultMessage: 'Câu hỏi' }),
      dataIndex: 'question',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.answer', defaultMessage: 'Câu trả lời' }),
      dataIndex: 'answer',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible(['UPDATE', 'COPY']),
      render: (_, record) => [
        <Tooltip
          className={`${access.className(['UPDATE'])}`}
          key="update-vocabulary"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'vocabulary/updateVocabularyForm',
                payload: { itemEdit: record, type: 'UPDATE' },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className(['COPY'])}`}
          key="copy-vocabulary"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'vocabulary/updateVocabularyForm',
                payload: { itemEdit: record, type: 'COPY' },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<VocabularyItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Admin.Vocabulary.VocabularyList.headerTitle',
            defaultMessage: 'Danh sách từ vựng',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryVocabulary(params, sort, filter);
          }}
          toolBarRender={() => [<CreateVocabulary key="create-vocabulary" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default VocabularyList;
