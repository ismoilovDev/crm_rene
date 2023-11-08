import { memo } from 'react'
import { Input } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import Logo from '../../assets/images/Logo'
import LoginBack from '../../assets/images/LoginBack'

const AuthForm = memo(({ onLogin, isActiveLoader }) => {
   const { register, handleSubmit } = useForm()

   return (
      <div className='login-secondary_wrapper'>
         <h1>Renesansga xush kelibsiz!👋</h1>
         <span>Iltimos, hisobingizga kiring va ishlashni boshlashingiz mumkin. Hayrli kun!</span>
         <form onSubmit={handleSubmit(onLogin)}>
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
   )
})

function Login({ onLogin, isActiveLoader }) {

   return (
      <section className='login'>
         <div className='login-main'>
            <Logo />
            <LoginBack />
         </div>
         <div className='login-secondary'>
            <AuthForm onLogin={onLogin} isActiveLoader={isActiveLoader} />
         </div>
      </section>
   )
}

export default Login