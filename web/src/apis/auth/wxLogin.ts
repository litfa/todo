import axiosRequest from '@/utils/request'

export const getQrCode = (uuid: string): Promise<ArrayBuffer> => {
  return axiosRequest({
    url: '/auth/wxLogin/getQrCode',
    method: 'post',
    responseType: 'arraybuffer',
    data: {
      uuid
    }
  })
}
