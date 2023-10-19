import { useState } from 'react'
import { Input } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import { alert } from '../../components/Alert/alert';
import Main from '../Main/Layout';
import https from '../../services/https';
import Logo from '../../assets/images/Logo'
import LoginBack from '../../assets/images/LoginBack'

function Login({ token, setToken, setRole, setName, setPhoto, setLoginTime }) {
   const [isActiveLoader, setIsActiveLoader] = useState(false)
   const { register, handleSubmit } = useForm();

   const onSubmit = async (data) => {
      setIsActiveLoader(true);

      try {
         const response = await https.post('/login', data);
         const { data: userData } = response;
         const roles = userData?.user?.role?.map((item) => item?.name);
         window.localStorage.setItem('token', userData?.token);
         window.localStorage.setItem('role', JSON.stringify(roles));
         window.localStorage.setItem('name', userData?.user?.name);
         window.localStorage.setItem('photo', userData?.user?.employee?.photo);
         window.localStorage.setItem('user_id', userData?.user?.id);
         window.localStorage.setItem('branch_id', userData?.user?.branch?.id);
         window.localStorage.setItem('branch_limit', userData?.user?.branch?.limit_credit);
         window.localStorage.setItem('loginTime', new Date().getTime());

         setToken(token);
         setRole(JSON.stringify(roles));
         setName(userData?.user?.name);
         setPhoto(userData?.user?.employee?.photo);
         setLoginTime(new Date().getTime());

         alert('Kirish muvaffaqiyatli', 'success');
         window.location.reload(false);
      } catch (error) {
         if (error.response && error.response.status === 401) {
            alert('Parol yoki Email noto\'g\'ri', 'error');
         }
      } finally {
         setIsActiveLoader(false);
      }
   };

   if (!token) {
      return (
         <section className='login'>
            <div className='login-main'>
               <Logo />
               <LoginBack />
            </div>
            <div className='login-secondary'>
               <div className='login-secondary_wrapper'>
                  <h1>Renesansga xush kelibsiz!👋</h1>
                  <span>Iltimos, hisobingizga kiring va ishlashni boshlashingiz mumkin. Hayrli kun!</span>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <Input
                        width='90%'
                        clearable
                        label="E-mail"
                        placeholder='admin@mail.com'
                        bordered
                        className='login_vall vall'
                        color="secondary"
                        required
                        type="email"
                        {...register("email", { required: true })}
                     />
                     <Input.Password
                        label="Password"
                        bordered
                        className='login_vall vall'
                        placeholder='12345'
                        width='90%'
                        color="secondary"
                        {...register("password", { required: true })}
                     />
                     <button type='submit' className='login_submit'>
                        <span className={isActiveLoader ? "btn_text" : "btn_text active_content"}>Kirish</span>
                        <div className={isActiveLoader ? "spinner active_content" : "spinner"}>
                           <div className="bounce1"></div>
                           <div className="bounce2"></div>
                           <div className="bounce3"></div>
                        </div>
                     </button>
                  </form>
               </div>
            </div>
         </section>
      )
   } else {
      return <Main />
   }
}

export default Login