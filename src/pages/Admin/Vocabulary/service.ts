import { paramsConverter, removeParamsEmpty, sortConverter } from '@/utils/utils';
import request from '@/utils/request';
import {
  ChangeStatusVocabulary,
  CreateVocabulary,
  VocabularyItem,
  UpdateVocabulary,
  QueryVocabulary,
} from '@/pages/Admin/Vocabulary/data';

const keyword_params = 'question';
const join_params = {};

export async function queryVocabulary(
  params: any,
  sort: any = {},
  filter: any = {},
): Promise<QueryVocabulary> {
  const res = await request({
    url: 'vocabulary',
    method: 'GET',
    params: paramsConverter({ ...filter, ...params }, join_params, keyword_params),
    sorts: sortConverter({ ...sort, updatedAt: 'descend' }),
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllVocabulary(params: any, sort: any = {}): Promise<VocabularyItem[]> {
  return await request({
    url: 'vocabulary',
    method: 'GET',
    params: paramsConverter(params, join_params, keyword_params),
    sorts: sortConverter(sort),
  });
}

export async function createVocabulary(body: CreateVocabulary) {
  return await request({
    url: `vocabulary`,
    method: 'POST',
    body: removeParamsEmpty(body),
  });
}

export async function updateVocabulary(id: string, body: UpdateVocabulary) {
  return await request({
    url: `vocabulary/${id}`,
    method: 'PATCH',
    body: removeParamsEmpty(body),
  });
}

export async function changeStatusVocabulary(id: string, status: string): Promise<ChangeStatusVocabulary> {
  return await request({
    url: `vocabulary/status/${id}`,
    method: 'PUT',
    body: { status },
  });
}
