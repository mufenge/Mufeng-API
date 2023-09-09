// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** applyInterface POST /api/apply */
export async function applyInterfaceUsingPOST(
  body: API.ApplyInterfaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
