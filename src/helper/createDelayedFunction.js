const createDelayedFunction = (fn, delay = 400) => {
  return async (...args) => {
    const start = Date.now();
    const result = await fn(...args);
    const end = Date.now();

    const elapsedTime = end - start;

    if (elapsedTime < delay) {
      const remainingTime = delay - elapsedTime;
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }

    return result;
  };
};

export default createDelayedFunction;
