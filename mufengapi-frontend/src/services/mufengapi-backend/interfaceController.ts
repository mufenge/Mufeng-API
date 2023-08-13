// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** invokeCommonInterface POST /api/interface/getRandomImage */
export async function invokeCommonInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getRandomImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
