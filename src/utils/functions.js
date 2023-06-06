export const axiosRes = (err) => {
  return err?.response?.data || "Something went wrong";
};

export const setToken = (token) => {
  let now = new Date();
  const time = now.getTime();

  const expireTime = time + 1000 * 36000; //expires in 1Hour
  now.setTime(expireTime);
  document.cookie = `userToken=${token};expires=${now.toUTCString()};`;
};

export const getToken = () => {
  const cookie = document.cookie;
  const arr = cookie.split("=");
  if (arr[0] === "userToken") {
    return arr[1];
  }
  return false;
};

export const removeToken = () => {
  document.cookie = `userToken=;`;
};
