// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** invokeQueryDomainInterface POST /api/interface/getQueryDomain */
export async function invokeQueryDomainInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getQueryDomain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** invokeQueryHistoryInterface POST /api/interface/getQueryHistory */
export async function invokeQueryHistoryInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getQueryHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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

/** invokeQueryRCInterface POST /api/interface/getQueryRC */
export async function invokeQueryRCInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getQueryRC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** invokeRandomAvatarInterface POST /api/interface/getRandomAvatar */
export async function invokeRandomAvatarInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getRandomAvatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** invokeRandomCXKInterface POST /api/interface/getRandomCXK */
export async function invokeRandomCXKInterfaceUsingPOST(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface/getRandomCXK', {
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
