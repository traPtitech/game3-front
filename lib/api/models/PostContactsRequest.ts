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
 * @interface PostContactsRequest
 */
export interface PostContactsRequest {
    /**
     * 名前
     * @type {string}
     * @memberof PostContactsRequest
     */
    name: string;
    /**
     * メールアドレス
     * @type {string}
     * @memberof PostContactsRequest
     */
    email: string;
    /**
     * お問い合わせ内容
     * @type {string}
     * @memberof PostContactsRequest
     */
    message: string;
}

/**
 * Check if a given object implements the PostContactsRequest interface.
 */
export function instanceOfPostContactsRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "message" in value;

    return isInstance;
}

export function PostContactsRequestFromJSON(json: any): PostContactsRequest {
    return PostContactsRequestFromJSONTyped(json, false);
}

export function PostContactsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostContactsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'email': json['email'],
        'message': json['message'],
    };
}

export function PostContactsRequestToJSON(value?: PostContactsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'message': value.message,
    };
}
