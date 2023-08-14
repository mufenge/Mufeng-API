// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** invokeQueryICPInterface POST /api/interface/getQueryICP */
export async function invokeQueryICPInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getQueryICP', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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

/** invokeRandomWordsInterface POST /api/interface/getRandomWords */
export async function invokeRandomWordsInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getRandomWords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
