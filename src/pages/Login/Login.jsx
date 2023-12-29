import { memo, useState } from 'react';
import { CiUser, CiLock } from "react-icons/ci";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { alert } from './../../components/Alert/alert';
import ReCAPTCHA from 'react-google-recaptcha';
import backgroundImage from '../../assets/images/auth_bg.jpg'
import logo from '../../assets/images/logo_mmt.png'

const AuthForm = memo(({ onLogin, isActiveLoader }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false);
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
      <div className='login_form_content'>
         <h1 className="project_title">NOBANK</h1>
         <span className="description">Renesansga xush kelibsiz!👋</span>
         <form onSubmit={handleLogin}>
            <label className='textfiled' htmlFor='email'>
               <div className="iconfiled">
                  <CiUser />
               </div>
               <input
                  required
                  id='email'
                  type='email'
                  placeholder='login...'
                  title='Login kiritish maydoni'
                  onChange={e => setEmail(e?.target?.value)}
               />
            </label>
            <label className='textfiled' htmlFor='password'>
               <div className="iconfiled">
                  <CiLock />
               </div>
               <input
                  required
                  id='password'
                  placeholder='parol...'
                  title='Parol kiritish maydoni'
                  type={showPassword ? 'text' : 'password'}
                  onChange={e => setPassword(e?.target?.value)}
               />
               <label className="show_password" htmlFor='showPassword'>
                  {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                  <input
                     type="checkbox"
                     id="showPassword"
                     checked={showPassword}
                     onChange={() => setShowPassword(!showPassword)}
                  />
               </label>
            </label>
            <button type='submit' className='login_submit' title='Tizimga kirish'>
               <span className={isActiveLoader ? "btn_text" : "btn_text active_content"}>Kirish</span>
               <div className={isActiveLoader ? "spinner active_content" : "spinner"}>
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
               </div>
            </button>
            <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY} onChange={handleCaptchaChange} />
         </form>
      </div>
   )
})

function Login({ onLogin, isActiveLoader }) {

   return (
      <section className='login_wrapper' style={{ backgroundImage: `url(${backgroundImage})` }}>
         <div className="logo_area">
            <img src={logo} alt="logo" />
         </div>
         <div className='login_main'>
            <AuthForm onLogin={onLogin} isActiveLoader={isActiveLoader} />
         </div>
      </section>
   )
}

export default Login