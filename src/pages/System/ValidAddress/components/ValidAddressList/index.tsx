import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getCopyTooltip,
  getStatusEnum,
  getUpdateTooltip,
  PAGINATE_OPTIONS,
  scrollTable,
} from '@/utils/utils';
import LocaleProTable from '@/components/Locale/ProTable';
import localeVN from './locale/viVN/proTable';
import localeEN from './locale/enUS/proTable';
import { EditTwoTone, CopyTwoTone } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
// @ts-ignore
import { useDispatch, useIntl } from 'umi';
import Access from '@/components/Access';
import { ValidAddressItem } from '@/pages/System/ValidAddress/data';
import { queryValidAddress } from '@/pages/System/ValidAddress/service';
import ChangeValidAddress from '@/pages/System/ValidAddress/components/ValidAddressList/components/ChangeValidAddress';
import CreateValidAddress from '@/pages/System/ValidAddress/components/ValidAddressList/components/ToolBar/CreateValidAddress';

const ValidAddressList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'validAddress/updateValidAddressList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<ValidAddressItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.System.ValidAddress.ValidAddressList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo host.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.System.ValidAddress.ValidAddressList.placeholder',
          defaultMessage: 'Nhập host.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.host', defaultMessage: 'Host' }),
      dataIndex: 'host',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.createdAt', defaultMessage: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.updatedAt', defaultMessage: 'Ngày cập nhật' }),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom, record: ValidAddressItem) => {
        return <ChangeValidAddress status={dom} record={record} />;
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
      },
      valueType: 'select',
      valueEnum: getStatusEnum(),
      hideInTable: !access.accessible(['UPDATE-STATUS']),
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
          key="update-valid-address"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'validAddress/updateValidAddressForm',
                payload: { itemEdit: record, type: 'UPDATE' },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className(['COPY'])}`}
          key="copy-valid-address"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'validAddress/updateValidAddressForm',
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
        <ProTable<ValidAddressItem>
          headerTitle={intl.formatMessage({
            id: 'pages.System.ValidAddress.ValidAddressList.headerTitle',
            defaultMessage: 'Danh sách địa chỉ hợp lệ',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryValidAddress(params, sort, filter);
          }}
          toolBarRender={() => [<CreateValidAddress key="create-valid-address" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default ValidAddressList;
