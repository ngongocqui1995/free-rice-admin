import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeValidAddress,
  CreateValidAddress,
  QueryValidAddress,
  UpdateValidAddress,
  ValidAddressItem,
} from '@/pages/System/ValidAddress/data';

const keyword_params = 'host,port';
const join_params = {};

export async function queryValidAddress(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryValidAddress> {
  const res = await request({
    url: 'valid-address',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params }, join_params),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllValidAddress(params: any, sort: any = {}): Promise<ValidAddressItem[]> {
  return await request({
    url: 'valid-address',
    method: 'GET',
    joins: joinConverter({ ...params }),
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createValidAddress(body: CreateValidAddress) {
  return await request({
    url: `valid-address`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateValidAddress(id: string, body: UpdateValidAddress) {
  return await request({
    url: `valid-address/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeValidAddress(id: string, status: string): Promise<ChangeValidAddress> {
  return await request({
    url: `valid-address/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
