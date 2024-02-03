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
  Event,
  Game,
  Term,
} from '../models/index';
import {
    EventFromJSON,
    EventToJSON,
    GameFromJSON,
    GameToJSON,
    TermFromJSON,
    TermToJSON,
} from '../models/index';

export interface GetEventRequest {
    eventSlug: string;
}

export interface GetEventCsvRequest {
    eventSlug: string;
}

export interface GetEventGamesRequest {
    eventSlug: string;
}

export interface GetEventImageRequest {
    eventSlug: string;
}

export interface GetEventTermsRequest {
    eventSlug: string;
}

export interface PatchEventRequest {
    eventSlug: string;
    slug?: string;
    title?: string;
    date?: Date;
    gameSubmissionPeriodStart?: Date;
    gameSubmissionPeriodEnd?: Date;
    image?: Blob;
}

export interface PostEventRequest {
    slug: string;
    title: string;
    date: Date;
    gameSubmissionPeriodStart: Date;
    gameSubmissionPeriodEnd: Date;
    image?: Blob;
}

/**
 * 
 */
export class EventsApi extends runtime.BaseAPI {

    /**
     * 開催中のイベントを取得
     */
    async getCurrentEventRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/now`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventFromJSON(jsonValue));
    }

    /**
     * 開催中のイベントを取得
     */
    async getCurrentEvent(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.getCurrentEventRaw(initOverrides);
        return await response.value();
    }

    /**
     * イベントの情報を取得
     */
    async getEventRaw(requestParameters: GetEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling getEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{eventSlug}`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventFromJSON(jsonValue));
    }

    /**
     * イベントの情報を取得
     */
    async getEvent(requestParameters: GetEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.getEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * イベントとイベントに登録されているゲームの情報をCSV形式で取得
     */
    async getEventCsvRaw(requestParameters: GetEventCsvRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling getEventCsv.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{eventSlug}/csv`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * イベントとイベントに登録されているゲームの情報をCSV形式で取得
     */
    async getEventCsv(requestParameters: GetEventCsvRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getEventCsvRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * イベントに登録されているゲームのリストを取得
     */
    async getEventGamesRaw(requestParameters: GetEventGamesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Game>>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling getEventGames.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{eventSlug}/games`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GameFromJSON));
    }

    /**
     * イベントに登録されているゲームのリストを取得
     */
    async getEventGames(requestParameters: GetEventGamesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Game>> {
        const response = await this.getEventGamesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * イベントの画像を取得
     */
    async getEventImageRaw(requestParameters: GetEventImageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling getEventImage.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{eventSlug}/image`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.BlobApiResponse(response);
    }

    /**
     * イベントの画像を取得
     */
    async getEventImage(requestParameters: GetEventImageRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Blob> {
        const response = await this.getEventImageRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * イベントに登録されているタームのリストを取得
     */
    async getEventTermsRaw(requestParameters: GetEventTermsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Term>>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling getEventTerms.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/{eventSlug}/terms`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TermFromJSON));
    }

    /**
     * イベントに登録されているタームのリストを取得
     */
    async getEventTerms(requestParameters: GetEventTermsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Term>> {
        const response = await this.getEventTermsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * イベントのリストを取得
     */
    async getEventsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Event>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EventFromJSON));
    }

    /**
     * イベントのリストを取得
     */
    async getEvents(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Event>> {
        const response = await this.getEventsRaw(initOverrides);
        return await response.value();
    }

    /**
     * イベントの情報を変更
     */
    async patchEventRaw(requestParameters: PatchEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.eventSlug === null || requestParameters.eventSlug === undefined) {
            throw new runtime.RequiredError('eventSlug','Required parameter requestParameters.eventSlug was null or undefined when calling patchEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.slug !== undefined) {
            formParams.append('slug', requestParameters.slug as any);
        }

        if (requestParameters.title !== undefined) {
            formParams.append('title', requestParameters.title as any);
        }

        if (requestParameters.date !== undefined) {
            formParams.append('date', requestParameters.date as any);
        }

        if (requestParameters.gameSubmissionPeriodStart !== undefined) {
            formParams.append('gameSubmissionPeriodStart', requestParameters.gameSubmissionPeriodStart as any);
        }

        if (requestParameters.gameSubmissionPeriodEnd !== undefined) {
            formParams.append('gameSubmissionPeriodEnd', requestParameters.gameSubmissionPeriodEnd as any);
        }

        if (requestParameters.image !== undefined) {
            formParams.append('image', requestParameters.image as any);
        }

        const response = await this.request({
            path: `/events/{eventSlug}`.replace(`{${"eventSlug"}}`, encodeURIComponent(String(requestParameters.eventSlug))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * イベントの情報を変更
     */
    async patchEvent(requestParameters: PatchEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.patchEventRaw(requestParameters, initOverrides);
    }

    /**
     * イベントを登録
     */
    async postEventRaw(requestParameters: PostEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        if (requestParameters.slug === null || requestParameters.slug === undefined) {
            throw new runtime.RequiredError('slug','Required parameter requestParameters.slug was null or undefined when calling postEvent.');
        }

        if (requestParameters.title === null || requestParameters.title === undefined) {
            throw new runtime.RequiredError('title','Required parameter requestParameters.title was null or undefined when calling postEvent.');
        }

        if (requestParameters.date === null || requestParameters.date === undefined) {
            throw new runtime.RequiredError('date','Required parameter requestParameters.date was null or undefined when calling postEvent.');
        }

        if (requestParameters.gameSubmissionPeriodStart === null || requestParameters.gameSubmissionPeriodStart === undefined) {
            throw new runtime.RequiredError('gameSubmissionPeriodStart','Required parameter requestParameters.gameSubmissionPeriodStart was null or undefined when calling postEvent.');
        }

        if (requestParameters.gameSubmissionPeriodEnd === null || requestParameters.gameSubmissionPeriodEnd === undefined) {
            throw new runtime.RequiredError('gameSubmissionPeriodEnd','Required parameter requestParameters.gameSubmissionPeriodEnd was null or undefined when calling postEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.slug !== undefined) {
            formParams.append('slug', requestParameters.slug as any);
        }

        if (requestParameters.title !== undefined) {
            formParams.append('title', requestParameters.title as any);
        }

        if (requestParameters.date !== undefined) {
            formParams.append('date', requestParameters.date as any);
        }

        if (requestParameters.gameSubmissionPeriodStart !== undefined) {
            formParams.append('gameSubmissionPeriodStart', requestParameters.gameSubmissionPeriodStart as any);
        }

        if (requestParameters.gameSubmissionPeriodEnd !== undefined) {
            formParams.append('gameSubmissionPeriodEnd', requestParameters.gameSubmissionPeriodEnd as any);
        }

        if (requestParameters.image !== undefined) {
            formParams.append('image', requestParameters.image as any);
        }

        const response = await this.request({
            path: `/events`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventFromJSON(jsonValue));
    }

    /**
     * イベントを登録
     */
    async postEvent(requestParameters: PostEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.postEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
