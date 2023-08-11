// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvoke GET /api/analysis/top/interfaceInvoke/ */
export async function listTopInvokeUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO>('/api/analysis/top/interfaceInvoke/', {
    method: 'GET',
    ...(options || {}),
  });
}
