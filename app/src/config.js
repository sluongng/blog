/**
 * Created by NB on 4/19/2017.
 */

export default {
  MAX_ATTACHMENT_SIZE: 4000000,
  apiGateway: {
    URL: 'https://j4ysur75w9.execute-api.ap-northeast-2.amazonaws.com/prod',
  },
  s3: {
    BUCKET: 'sluongng-blog-uploads',
  },
  cognito: {
    REGION: 'ap-northeast-2',
    IDENTITY_POOL_ID: 'ap-northeast-2:5479320f-b40b-4129-981c-a1699b81da57',
    USER_POOL_ID: 'ap-northeast-2_019NPzAZP',
    APP_CLIENT_ID: '5t2gvbssekqamlfe8836lfs5tg',
  }
};