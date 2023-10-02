export const sleep = async (time: number = 1500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
