//本地存储存数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};

//获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
