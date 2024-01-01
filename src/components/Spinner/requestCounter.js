// requestCounter.js
let requestCount = 0;

export const increaseRequestCount = () => {
  requestCount++;
};

export const decreaseRequestCount = () => {
  if (requestCount > 0) {
    requestCount--;
  }
};

export const isRequestInProgress = () => {
  return requestCount > 0;
};
