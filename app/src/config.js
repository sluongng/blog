/**
 * Created by NB on 4/19/2017.
 */

export default {
  MAX_ATTACHMENT_SIZE: 4000000,
  apiGateway: {
    URL: 'https://j4ysur75w9.execute-api.ap-northeast-2.amazonaws.com/prod',
  },
  s3: {
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME'
  },
  cognito: {
    REGION: 'ap-northeast-2',
    IDENTITY_POOL_ID: 'ap-northeast-2:b84adcc2-5435-4af5-95be-ff70ab8f1e0c',
    USER_POOL_ID: 'ap-northeast-2_019NPzAZP',
    APP_CLIENT_ID: '5t2gvbssekqamlfe8836lfs5tg',
  }
};