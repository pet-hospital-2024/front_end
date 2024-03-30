import  useUserStore  from '@/store/modules/user';
import router from "@/router";

let logout = () => {
  let userStore = useUserStore();
  userStore.userLogout();
  router.push({path: '/login'});
};

export default logout;
