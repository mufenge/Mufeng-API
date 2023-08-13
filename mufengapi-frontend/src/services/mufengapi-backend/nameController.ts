// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUsernameByPost POST /api/name/user */
export async function getUsernameByPostUsingPOST(body: API.User, options?: { [key: string]: any }) {
  return request<string>('/api/name/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
