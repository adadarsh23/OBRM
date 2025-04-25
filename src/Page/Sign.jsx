import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from "../assets/android-chrome-192x192.png";
import logo from '../assets/Animation - 1745515679240.gif';
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from "../../Firebase.js";
import { OAuthProvider } from 'firebase/auth';

export default function Sign() {
  const navigate = useNavigate();
  // const [emailOrPhone, setEmailOrPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpErrors, setSignUpErrors] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [showPassword, setShowPassword] = useState(false); // New state variable
  const auth = getAuth(app);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Sign in with email and password
  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Optional: Check if it's a new user
      if (result._tokenResponse?.isNewUser) {
        console.log("New user signed up with Google:", user);
      } else {
        console.log("Existing user signed in with Google:", user);
      }
  
      navigate('/signInSubmit');
    } catch (err) {
      let message = 'Google sign-in failed. Please try again.';
  
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          message = 'Popup was closed before completing sign-in.';
          break;
        case 'auth/cancelled-popup-request':
          message = 'Popup request was cancelled. Please try again.';
          break;
        case 'auth/account-exists-with-different-credential':
          message = 'An account already exists with the same email but different sign-in credentials.';
          break;
        case 'auth/popup-blocked':
          message = 'Popup blocked by the browser. Please allow popups and try again.';
          break;
        case 'auth/unauthorized-domain':
          message = 'Unauthorized domain. Please check your Firebase Auth settings.';
          break;
        case 'auth/internal-error':
          message = 'Internal error. Please try again later.';
          break;
        default:
          message = err.message || message;
      }
  
      setSignUpErrors(message);
      console.error('Google sign-in error:', err);
    }
  };
  
  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
      navigate('/signInSubmit');
    } catch (err) {
      setSignUpErrors('Apple sign-in failed. Please try again.');
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Sign up successful:", user);
      navigate('/');
    } catch (err) {
      let message = 'Something went wrong. Please try again.';
  
      switch (err.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already in use. Try logging in instead.';
          break;
        case 'auth/invalid-email':
          message = 'The email address is not valid.';
          break;
        case 'auth/weak-password':
          message = 'Your password is too weak. It should be at least 6 characters.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password accounts are not enabled. Contact admin.';
          break;
        case 'auth/internal-error':
          message = 'Internal error. Please try again later.';
          break;
        default:
          message = err.message;
      }
  
      setSignUpErrors(message);
      console.error('Signup error:', err);
    }
  };
  


  return (
    <>
      <div className="min-h-screen flex items-center justify-center pt-15">
        <div className="py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6" onSubmit={handleSignup}>
                <div className="mb-1">
                  <h3 className="text-slate-900 text-3xl font-semibold flex flex-wrap">Sign in
                    <motion.div
                      whileHover={{ rotateY: 20, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className=" pl-4 flex items-center gap-3 text-white font-bold no-underline"
                    >
                      <Link to="/" className="flex items-center gap-3 text-white font-bold" style={{ textDecoration: "none" }}>
                        <img
                          src={logo1}
                          alt="Logo"
                          className="h-12 w-12 rounded-full shadow-lg object-cover"
                        />
                        <span className="text-3xl font-bold text-black drop-shadow-lg">OBRM</span>
                      </Link>
                    </motion.div></h3>
                </div>

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-2 block">Email Id </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter Email "
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-slate-800 text-sm font-medium mb-1 block">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"} // Toggle input type
                      required
                      className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128" onClick={togglePasswordVisibility}>
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" ></path>
                    </svg>
                  </div>
                </div>
                {signUpErrors && (
                  <div className="text-red-500 text-xs mb-2">{signUpErrors}</div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)} />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-500">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="!mt-2">
                  <button
                    type="submit" // Changed to submit
                    className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="login-with-google-btn flex items-center justify-center w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-black bg-red-600 hover:bg-red-700 focus:outline-none mt-3"
                    onClick={handleGoogleSignIn}
                  >
                    Sign in with Google
                  </button>

                  <p className="text-sm !mt-1 text-center text-slate-500">
                    Already have an account{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">
                      Login Page
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <img
              src={logo}
              className="w-4/5 md:w-[500px] lg:w-[600px] mx-auto block object-contain"
              alt="login img"
            />
          </div>
        </div>
      </div>

    </>
  );
}