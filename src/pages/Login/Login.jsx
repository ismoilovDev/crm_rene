import { memo, useState } from 'react'
import { Input } from '@nextui-org/react';
import { alert } from './../../components/Alert/alert';
import Logo from '../../assets/images/Logo'
import ReCAPTCHA from 'react-google-recaptcha';
import LoginBack from '../../assets/images/LoginBack'

const AuthForm = memo(({ onLogin, isActiveLoader }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

   const handleCaptchaChange = (value) => {
      if (value) {
         setIsCaptchaVerified(true);
      }
   };

   const handleLogin = (e) => {
      e.preventDefault();
      if (isCaptchaVerified) {
         const data = { email, password }
         onLogin(data)
      } else {
         alert('Iltimos, reCAPTCHA ni tasdiqlang.');
      }
   };

   return (
      <div className='login-secondary_wrapper'>
         <h1>Renesansga xush kelibsiz!👋</h1>
         <span>Iltimos, hisobingizga kiring va ishlashni boshlashingiz mumkin. Xayrli kun!</span>
         <form onSubmit={handleLogin}>
            <Input
               required
               bordered
               clearable
               width='90%'
               type="email"
               value={email}
               label="E-mail"
               color="secondary"
               className='login_vall vall'
               placeholder='admin@mail.com'
               onChange={e => setEmail(e?.target?.value)}
            />
            <Input.Password
               bordered
               width='90%'
               value={password}
               label="Password"
               color="secondary"
               placeholder='12345'
               className='login_vall vall'
               onChange={e => setPassword(e?.target?.value)}
            />
            <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={handleCaptchaChange} />
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