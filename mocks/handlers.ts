/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";
import { setupWorker } from "msw/browser";

faker.seed(1);

const baseURL = "http://localhost:3000/api";
const MAX_ARRAY_LENGTH = 20;

let i = 0;
const next = () => {
  if (i === Number.MAX_SAFE_INTEGER - 1) {
    i = 0;
  }
  return i++;
};

export const handlers = [
  http.get(`${baseURL}/ping`, () => {
    const resultArray = [[getPingServer200Response(), { status: 200 }]];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/test`, () => {
    const resultArray = [[null, { status: 200 }]];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/games`, () => {
    const resultArray = [
      [getGetGames200Response(), { status: 200 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.post(`${baseURL}/games`, () => {
    const resultArray = [
      [getPostGame201Response(), { status: 201 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.patch(`${baseURL}/games/:gameId`, () => {
    const resultArray = [
      [null, { status: 204 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/games/:gameId`, () => {
    const resultArray = [
      [getGetGame200Response(), { status: 200 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/games/:gameId/icon`, () => {
    const resultArray = [
      [getGetGameIcon200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/games/:gameId/image`, () => {
    const resultArray = [
      [getGetGameImage200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/terms`, () => {
    const resultArray = [
      [getGetTerms200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.post(`${baseURL}/terms`, () => {
    const resultArray = [
      [getPostTerm201Response(), { status: 201 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/terms/:termId`, () => {
    const resultArray = [
      [getGetTerm200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.patch(`${baseURL}/terms/:termId`, () => {
    const resultArray = [
      [null, { status: 204 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/terms/:termId/games`, () => {
    const resultArray = [
      [getGetTermGames200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.post(`${baseURL}/events`, () => {
    const resultArray = [
      [getPostEvent201Response(), { status: 201 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events`, () => {
    const resultArray = [
      [getGetEvents200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/now`, () => {
    const resultArray = [
      [getGetCurrentEvent200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.patch(`${baseURL}/events/:eventSlug`, () => {
    const resultArray = [
      [null, { status: 204 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
      [null, { status: 403 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/:eventSlug`, () => {
    const resultArray = [
      [getGetEvent200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/:eventSlug/image`, () => {
    const resultArray = [
      [getGetEventImage200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/:eventSlug/terms`, () => {
    const resultArray = [
      [getGetEventTerms200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/:eventSlug/games`, () => {
    const resultArray = [
      [getGetEventGames200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/events/:eventSlug/csv`, () => {
    const resultArray = [
      [getGetEventCsv200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/auth/login`, () => {
    const resultArray = [
      [null, { status: 302 }],
      [null, { status: 400 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/auth/callback`, () => {
    const resultArray = [
      [null, { status: 302 }],
      [null, { status: 400 }],
      [null, { status: 401 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.post(`${baseURL}/auth/logout`, () => {
    const resultArray = [[null, { status: 204 }]];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/users/me`, () => {
    const resultArray = [
      [getGetMe200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/users/me/games`, () => {
    const resultArray = [
      [getGetMeGames200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/users/:userId`, () => {
    const resultArray = [
      [getGetUser200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/users/:userId/games`, () => {
    const resultArray = [
      [getGetUserGames200Response(), { status: 200 }],
      [null, { status: 404 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
];

export function getPingServer200Response() {
  return null;
}

export function getGetGames200Response() {
  return [
    "0","1","2","3",
    "0","1","2","3",
    "0","1","2","3",
    "0","1","2","3",
  ].map((term) => ({
    id: faker.datatype.uuid(),
    termId: term,
    discordUserId: faker.lorem.slug(1),
    isPublished: faker.datatype.boolean(),
    title: faker.lorem.slug(1),
    creatorName: faker.person.fullName(),
    creatorPageUrl: faker.internet.url(),
    gamePageUrl: faker.internet.url(),
    description: faker.lorem.slug(1),
    place: faker.lorem.slug(1),
  }));
}

export function getPostGame201Response() {
  return {
    id: faker.datatype.uuid(),
    termId: faker.datatype.uuid(),
    discordUserId: faker.lorem.slug(1),
    isPublished: faker.datatype.boolean(),
    title: faker.lorem.slug(1),
    creatorName: faker.person.fullName(),
    creatorPageUrl: faker.internet.url(),
    gamePageUrl: faker.internet.url(),
    description: faker.lorem.slug(1),
    place: faker.lorem.slug(1),
  };
}

export function getGetGame200Response() {
  return {
    id: faker.datatype.uuid(),
    termId: faker.datatype.uuid(),
    discordUserId: faker.lorem.slug(1),
    isPublished: faker.datatype.boolean(),
    title: faker.lorem.slug(1),
    creatorName: faker.person.fullName(),
    creatorPageUrl: faker.internet.url(),
    gamePageUrl: faker.internet.url(),
    description: faker.lorem.slug(1),
    place: faker.lorem.slug(1),
  };
}

export function getGetGameIcon200Response() {
  return null;
}

export function getGetGameImage200Response() {
  return null;
}

export function getGetTerms200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    id: faker.datatype.uuid(),
    eventSlug: faker.lorem.slug(1),
    isDefault: faker.datatype.boolean(),
    startAt: faker.date.past(),
    endAt: faker.date.past(),
  }));
}

export function getPostTerm201Response() {
  return {
    id: faker.datatype.uuid(),
    eventSlug: faker.lorem.slug(1),
    isDefault: faker.datatype.boolean(),
    startAt: faker.date.past(),
    endAt: faker.date.past(),
  };
}

export function getGetTerm200Response() {
  return {
    id: faker.datatype.uuid(),
    eventSlug: faker.lorem.slug(1),
    isDefault: faker.datatype.boolean(),
    startAt: faker.date.past(),
    endAt: faker.date.past(),
  };
}

export function getGetTermGames200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    id: faker.datatype.uuid(),
    termId: faker.datatype.uuid(),
    discordUserId: faker.lorem.slug(1),
    isPublished: faker.datatype.boolean(),
    title: faker.lorem.slug(1),
    creatorName: faker.person.fullName(),
    creatorPageUrl: faker.internet.url(),
    gamePageUrl: faker.internet.url(),
    description: faker.lorem.slug(1),
    place: faker.lorem.slug(1),
  }));
}

export function getPostEvent201Response() {
  return {
    slug: `${faker.number.int(99)}th`,
    title: `第${faker.number.int(99)}回`,
    date: faker.date.past(),
    gameSubmissionPeriodStart: faker.date.past(),
    gameSubmissionPeriodEnd: faker.date.past(),
  };
}

export function getGetEvents200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    slug: `${faker.number.int(99)}th`,
    title: `第${faker.number.int(99)}回`,
    date: faker.date.past(),
    gameSubmissionPeriodStart: faker.date.past(),
    gameSubmissionPeriodEnd: faker.date.past(),
  }));
}

export function getGetCurrentEvent200Response() {
  return {
    slug: `${faker.number.int(99)}th`,
    title: `第${faker.number.int(99)}回`,
    date: faker.date.past(),
    gameSubmissionPeriodStart: faker.date.past(),
    gameSubmissionPeriodEnd: faker.date.past(),
  };
}

export function getGetEvent200Response() {
  return {
    slug: `${faker.number.int(99)}th`,
    title: `第${faker.number.int(99)}回`,
    date: faker.date.past(),
    gameSubmissionPeriodStart: faker.date.past(),
    gameSubmissionPeriodEnd: faker.date.past(),
  };
}

export function getGetEventImage200Response() {
  return null;
}

export function getGetEventTerms200Response() {
  return [
    {
      id: "0",
      eventSlug: "17th",
      isDefault: true,
      startAt: undefined,
      endAt: undefined,
    },
    {
    id: "1",
    eventSlug: "17th",
    isDefault: false,
    startAt: faker.date.past(),
    endAt: faker.date.past(),
  },
    {
      id: "2",
      eventSlug: "17th",
      isDefault: false,
      startAt: faker.date.past(),
      endAt: faker.date.past(),
    },
    {
      id: "3",
      eventSlug: "17th",
      isDefault: false,
      startAt: faker.date.past(),
      endAt: faker.date.past(),
    },
  ]
  // return [
  //   ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  // ].map((_) => ({
  //   id: faker.datatype.uuid(),
  //   eventSlug: faker.lorem.slug(1),
  //   isDefault: faker.datatype.boolean(),
  //   startAt: faker.date.past(),
  //   endAt: faker.date.past(),
  // }));
}

export function getGetEventGames200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    id: faker.datatype.uuid(),
    termId: faker.datatype.uuid(),
    discordUserId: faker.lorem.slug(1),
    isPublished: faker.datatype.boolean(),
    title: faker.lorem.slug(1),
    creatorName: faker.person.fullName(),
    creatorPageUrl: faker.internet.url(),
    gamePageUrl: faker.internet.url(),
    description: faker.lorem.slug(1),
    place: faker.lorem.slug(1),
  }));
}

export function getGetEventCsv200Response() {
  return null;
}

export function getGetMe200Response() {
  return {
    userId: faker.lorem.slug(1),
    username: faker.person.fullName(),
        profileImageUrl: faker.image.url(),
// role: faker.helpers.arrayElement(["user"]),
    role: faker.helpers.arrayElement(["admin"]),
  };
}

export function getGetMeGames200Response() {
  return {
    games: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      id: faker.datatype.uuid(),
      termId: faker.datatype.uuid(),
      discordUserId: faker.lorem.slug(1),
      isPublished: faker.datatype.boolean(),
      title: faker.lorem.slug(1),
      creatorName: faker.person.fullName(),
      creatorPageUrl: faker.internet.url(),
      gamePageUrl: faker.internet.url(),
      description: faker.lorem.slug(1),
      place: faker.lorem.slug(1),
    })),
  };
}

export function getGetUser200Response() {
  return {
    userId: faker.lorem.slug(1),
    username: faker.person.fullName(),
        profileImageUrl: faker.image.url(),
role: faker.helpers.arrayElement(["admin", "user"]),
  };
}

export function getGetUserGames200Response() {
  return {
    games: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      id: faker.datatype.uuid(),
      termId: faker.datatype.uuid(),
      discordUserId: faker.lorem.slug(1),
      isPublished: faker.datatype.boolean(),
      title: faker.lorem.slug(1),
      creatorName: faker.person.fullName(),
      creatorPageUrl: faker.internet.url(),
      gamePageUrl: faker.internet.url(),
      description: faker.lorem.slug(1),
      place: faker.lorem.slug(1),
    })),
  };
}
