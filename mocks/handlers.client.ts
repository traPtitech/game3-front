/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const startWorker = async () => {
  const worker = setupWorker(...handlers);
  await worker.start();
};
