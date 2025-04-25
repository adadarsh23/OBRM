import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../../Firebase';
import logo1 from "../assets/android-chrome-192x192.png";
import logo from '../assets/Animation - 1745576861500.gif';
import { motion } from "framer-motion";
function Login() {
  // const options = {
  //   animationData: AnimationData,
  //   loop: true,
  //   autoplay: true,
  // };

  // const { View } = useLottie(options);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [showPassword, setShowPassword] = useState(false); // New state variable
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [signInError, setSignInError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error("GoogleAuthProvider.credentialFromResult returned null");
      }
      console.log("Google credential:", credential);
      navigate('/');
    } catch (err) {
      console.error("Google sign-in error:", err);
      setSignInError('Google sign-in failed. Please check console for details.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`Login failed: ${errorMessage} (${errorCode})`);
        });
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center pt-15">
        <div className="py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
            <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-1">
                  <h3 className="text-slate-900 text-3xl font-semibold flex flex-wrap">Log In
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
                      name="Email"
                      type="text"
                      required
                      className="w-full text-sm text-slate-800 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter Email "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128" onClick={togglePasswordVisibility}>
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000" ></path>
                    </svg>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
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
                    Log in
                  </button>
                  <button
                    type="button"
                    className="login-with-google-btn flex items-center justify-center w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-black bg-red-600 hover:bg-red-700 focus:outline-none mt-3"
                    onClick={handleGoogleSignIn}
                  >
                    Log in with Google
                  </button>

                  <p className="text-sm !mt-1 text-center text-slate-500">
                    Don't have an account{' '}
                    <Link to="/sign" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            <img
              src={logo}
              className="w-4/5 md:w-[400px] lg:w-[600px] mx-auto block object-contain"
              alt="login img"
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;