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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * リダイレクト先のURL
     * @type {string}
     * @memberof LoginRequest
     */
    redirect?: string;
}

/**
 * Check if a given object implements the LoginRequest interface.
 */
export function instanceOfLoginRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LoginRequestFromJSON(json: any): LoginRequest {
    return LoginRequestFromJSONTyped(json, false);
}

export function LoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'redirect': !exists(json, 'redirect') ? undefined : json['redirect'],
    };
}

export function LoginRequestToJSON(value?: LoginRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'redirect': value.redirect,
    };
}

