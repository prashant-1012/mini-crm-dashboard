import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// setupWorker registers our handlers with the browser's
// Service Worker — it intercepts all matching fetch requests
export const worker = setupWorker(...handlers);