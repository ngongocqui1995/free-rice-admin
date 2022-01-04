import request from '@/utils/request';

const uploadVideoTypeI = (body: FormData) => {
  return request({
    url: 'uploads/video/facebook-1',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeII = (body: FormData) => {
  return request({
    url: 'uploads/video/facebook-2',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeIII = (body: FormData) => {
  return request({
    url: 'uploads/video/okru',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeV = (body: FormData) => {
  return request({
    url: 'uploads/video/dailymotion',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeVI = (body: FormData) => {
  return request({
    url: 'uploads/video/upfile',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeVII = (body: FormData) => {
  return request({
    url: 'uploads/video/hippovideo',
    method: 'POST',
    body,
  });
};

const uploadVideoTypeVIII = (body: FormData) => {
  return request({
    url: 'uploads/video/youtube',
    method: 'POST',
    body,
  });
};

export const uploadVideo = (body: FormData, type: string, code: string) => {
  switch (code) {
    case 'FB': {
      switch (type) {
        case 'TYPE_1':
          return uploadVideoTypeI(body);
        case 'TYPE_2':
          return uploadVideoTypeII(body);
        default:
          return uploadVideoTypeI(body);
      }
    }
    case 'OK': {
      return uploadVideoTypeIII(body);
    }
    case 'DM': {
      return uploadVideoTypeV(body);
    }
    case 'UF': {
      return uploadVideoTypeVI(body);
    }
    case 'HP': {
      return uploadVideoTypeVII(body);
    }
    case 'YT': {
      return uploadVideoTypeVIII(body);
    }
    default:
      return uploadVideoTypeI(body);
  }
};

export const uploadMultipleVideo = (body: FormData) => {
  return request(
    {
      url: 'uploads/video/multiple',
      method: 'POST',
      body,
    },
    false,
  );
};

export const splitVideo = async (body: FormData) => {
  return await request({
    url: 'uploads/video/split-video',
    method: 'POST',
    body,
  });
};
