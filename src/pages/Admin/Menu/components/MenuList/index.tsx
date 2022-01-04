import React, { useEffect, useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  getCopyTooltip,
  getStatusEnum,
  getTypeMenuEnum,
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
import { queryMenus } from '@/pages/Admin/Menu/service';
import CreateMenu from '@/pages/Admin/Menu/components/MenuList/components/ToolBar/CreateMenu';
import { MenuItem } from '@/pages/Admin/Menu/data';
import ChangeStatusMenu from '@/pages/Admin/Menu/components/MenuList/components/ChangeStatusMenu';
import { typeMenuEnum } from '@/utils/utils.enum';
import Access from '@/components/Access';

const MenuList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'menu/updateMenuList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<MenuItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Menu.MenuList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo url.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Menu.MenuList.placeholder',
          defaultMessage: 'Nhập url.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.url', defaultMessage: 'Url' }),
      dataIndex: 'url',
      width: 250,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' }),
      dataIndex: 'type',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
      },
      width: 120,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: getTypeMenuEnum(),
      renderText: (_, record: MenuItem) => {
        return (
          record?.type && (
            <Tag color={typeMenuEnum[record?.type]?.color}>{typeMenuEnum[record?.type]?.text}</Tag>
          )
        );
      },
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
      renderText: (dom, record: MenuItem) => {
        return <ChangeStatusMenu status={dom} record={record} />;
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
          key="update-menu"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'menu/updateMenuForm',
                payload: { itemEdit: record, type: 'UPDATE' },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className(['COPY'])}`}
          key="copy-menu"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'menu/updateMenuForm',
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
        <ProTable<MenuItem>
          headerTitle={intl.formatMessage({
            id: 'pages.Admin.Menu.MenuList.headerTitle',
            defaultMessage: 'Danh sách Menu',
          })}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort, filter) => {
            return await queryMenus(params, sort, filter);
          }}
          toolBarRender={() => [<CreateMenu key="create-menu" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default MenuList;
