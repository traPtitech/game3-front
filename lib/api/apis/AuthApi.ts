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

export interface LoginRequest {
    redirect: string;
}

export interface OauthCallbackRequest {
    code: string;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Discord OAuthを使ったログイン。ログイン後にリダイレクトするURLをクエリパラメータで指定。
     * ログイン
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.redirect === null || requestParameters.redirect === undefined) {
            throw new runtime.RequiredError('redirect','Required parameter requestParameters.redirect was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        if (requestParameters.redirect !== undefined) {
            queryParameters['redirect'] = requestParameters.redirect;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/login`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Discord OAuthを使ったログイン。ログイン後にリダイレクトするURLをクエリパラメータで指定。
     * ログイン
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.loginRaw(requestParameters, initOverrides);
    }

    /**
     * ログアウト
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ログアウト
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.logoutRaw(initOverrides);
    }

    /**
     * OAuth認証コールバック
     */
    async oauthCallbackRaw(requestParameters: OauthCallbackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.code === null || requestParameters.code === undefined) {
            throw new runtime.RequiredError('code','Required parameter requestParameters.code was null or undefined when calling oauthCallback.');
        }

        const queryParameters: any = {};

        if (requestParameters.code !== undefined) {
            queryParameters['code'] = requestParameters.code;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/auth/callback`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * OAuth認証コールバック
     */
    async oauthCallback(requestParameters: OauthCallbackRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.oauthCallbackRaw(requestParameters, initOverrides);
    }

}
