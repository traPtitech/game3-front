/* tslint:disable */
/* eslint-disable */
export * from './AuthApi';
export * from './DefaultApi';
export * from './EventsApi';
// @ts-ignore: openapiでtagを複数つけると同じ名前のinterfaceが生成され`... has already exported a member named ...`のエラーが出る
export * from './GamesApi';
export * from './TermsApi';
export * from './UsersApi';
