import { alert } from "../components/Alert/alert";
import https from "./https";

export const login = async (data, setValue) => {
   try {
      const response = await https.post('/login', data);
      const { data: userData } = response;
      window.location.reload(false);
      setValue(_ => userData?.token)
      alert('Kirish muvaffaqiyatli', 'success');
      const roles = userData?.user?.role?.map((item) => item?.name);
      window.localStorage.setItem('token', userData?.token);
      window.localStorage.setItem('name', userData?.user?.name);
      window.localStorage.setItem('role', JSON.stringify(roles));
      window.localStorage.setItem('user_id', userData?.user?.id);
      window.localStorage.setItem('loginTime', new Date().getTime());
      window.localStorage.setItem('branch_id', userData?.user?.branch?.id);
      window.localStorage.setItem('photo', userData?.user?.employee?.photo);
      window.localStorage.setItem('branch_limit', userData?.user?.branch?.limit_credit);
   } catch (error) {
      if (error.response && error.response.status === 401) {
         alert('Parol yoki Email noto\'g\'ri', 'error');
      }
   }
};

export const logout = async (setValue) => {
   try {
      const { data } = await https.post('/logout');
      if (data?.message === 'Logged out') {
         window.localStorage.removeItem('token');
      }
   } catch (err) {
      console.log(err)
   } finally {
      window.localStorage.clear();
      setValue(null)
   }
};
