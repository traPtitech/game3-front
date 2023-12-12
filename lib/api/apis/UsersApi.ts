/* tslint:disable */
/* eslint-disable */
/**
 * Game^3 API
 * Game^3 API
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  GetMeGames200Response,
  User,
} from '../models/index';
import {
    GetMeGames200ResponseFromJSON,
    GetMeGames200ResponseToJSON,
    UserFromJSON,
    UserToJSON,
} from '../models/index';

export interface GetUserRequest {
    userId: string;
}

export interface GetUserGamesRequest {
    userId: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * 自分のユーザー情報を取得
     */
    async getMeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * 自分のユーザー情報を取得
     */
    async getMe(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.getMeRaw(initOverrides);
        return await response.value();
    }

    /**
     * 自分が登録したゲームのリストを取得
     */
    async getMeGamesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetMeGames200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/me/games`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetMeGames200ResponseFromJSON(jsonValue));
    }

    /**
     * 自分が登録したゲームのリストを取得
     */
    async getMeGames(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetMeGames200Response> {
        const response = await this.getMeGamesRaw(initOverrides);
        return await response.value();
    }

    /**
     * ユーザー情報を取得
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * ユーザー情報を取得
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * ユーザーが登録したゲームのリストを取得
     */
    async getUserGamesRaw(requestParameters: GetUserGamesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetMeGames200Response>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUserGames.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/{userId}/games`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetMeGames200ResponseFromJSON(jsonValue));
    }

    /**
     * ユーザーが登録したゲームのリストを取得
     */
    async getUserGames(requestParameters: GetUserGamesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetMeGames200Response> {
        const response = await this.getUserGamesRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
