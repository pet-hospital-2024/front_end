//本地存储存数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};

//获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
//本地存储删除数据方法
export const REMOVE_TOKEN=()=>{
  localStorage.removeItem('TOKEN');
}
