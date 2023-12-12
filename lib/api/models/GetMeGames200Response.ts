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
import type { Game } from './Game';
import {
    GameFromJSON,
    GameFromJSONTyped,
    GameToJSON,
} from './Game';

/**
 * 
 * @export
 * @interface GetMeGames200Response
 */
export interface GetMeGames200Response {
    /**
     * 
     * @type {Array<Game>}
     * @memberof GetMeGames200Response
     */
    games?: Array<Game>;
}

/**
 * Check if a given object implements the GetMeGames200Response interface.
 */
export function instanceOfGetMeGames200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetMeGames200ResponseFromJSON(json: any): GetMeGames200Response {
    return GetMeGames200ResponseFromJSONTyped(json, false);
}

export function GetMeGames200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetMeGames200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'games': !exists(json, 'games') ? undefined : ((json['games'] as Array<any>).map(GameFromJSON)),
    };
}

export function GetMeGames200ResponseToJSON(value?: GetMeGames200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'games': value.games === undefined ? undefined : ((value.games as Array<any>).map(GameToJSON)),
    };
}

