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
 * @interface Event
 */
export interface Event {
    /**
     * イベントslug (イベントのID的な立ち位置)
     * @type {string}
     * @memberof Event
     */
    slug: string;
    /**
     * イベントのタイトル (例: 第18回)
     * @type {string}
     * @memberof Event
     */
    title: string;
    /**
     * イベント開催日
     * @type {Date}
     * @memberof Event
     */
    date: Date;
    /**
     * ゲーム展示の募集開始期間
     * @type {Date}
     * @memberof Event
     */
    gameSubmissionPeriodStart: Date;
    /**
     * ゲーム展示の募集終了期間
     * @type {Date}
     * @memberof Event
     */
    gameSubmissionPeriodEnd: Date;
}

/**
 * Check if a given object implements the Event interface.
 */
export function instanceOfEvent(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "slug" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "date" in value;
    isInstance = isInstance && "gameSubmissionPeriodStart" in value;
    isInstance = isInstance && "gameSubmissionPeriodEnd" in value;

    return isInstance;
}

export function EventFromJSON(json: any): Event {
    return EventFromJSONTyped(json, false);
}

export function EventFromJSONTyped(json: any, ignoreDiscriminator: boolean): Event {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'slug': json['slug'],
        'title': json['title'],
        'date': (new Date(json['date'])),
        'gameSubmissionPeriodStart': (new Date(json['gameSubmissionPeriodStart'])),
        'gameSubmissionPeriodEnd': (new Date(json['gameSubmissionPeriodEnd'])),
    };
}

export function EventToJSON(value?: Event | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'slug': value.slug,
        'title': value.title,
        'date': (value.date.toISOString()),
        'gameSubmissionPeriodStart': (value.gameSubmissionPeriodStart.toISOString()),
        'gameSubmissionPeriodEnd': (value.gameSubmissionPeriodEnd.toISOString()),
    };
}

