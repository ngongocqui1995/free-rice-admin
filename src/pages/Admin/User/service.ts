import { joinConverter, paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangePasswordUser,
  ChangeStatusUser,
  CreateUser,
  QueryUsers,
  UpdateUser,
} from '@/pages/Admin/User/data';

const keyword_params = 'name,phone,email';
const join_params = {
  role: [{ key: 'role.id', condition: '$eq' }],
  gender: [{ key: 'gender', condition: '$in' }],
};

export async function queryUsers(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryUsers> {
  const res = await request({
    url: 'users',
    method: 'GET',
    joins: joinConverter({ ...filter, ...params, join: 'role' }, join_params),
    params: paramsConverter({ ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createUser(body: CreateUser) {
  return await request({
    url: `users`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateUser(id: string, body: UpdateUser) {
  return await request({
    url: `users/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changePassword(body: ChangePasswordUser) {
  return await request({
    url: `users/update/change-password`,
    method: 'PUT',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusUser(id: string, status: string): Promise<ChangeStatusUser> {
  return await request({
    url: `users/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
