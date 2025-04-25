import { useState, useEffect } from 'react';
import './App.css';
import Home from './Page/Home';
import About from './Page/About';
import Contact from './Page/Contact';
import Nopage from './Page/Nopage';
import Login from './Page/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../Firebase';
import Sign from './Page/Sign';
import Footer from './Components/Footer';

function App() {
  const [searchType, setSearchType] = useState("None");
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <BrowserRouter>
        <Navbar
          searchType={searchType}
          setSearchType={setSearchType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Routes>
          <Route>
            <Route
              path='/'
              index
              element={
                user ? (
                  <Home
                    searchType={searchType}
                    searchValue={searchValue}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/sign"
              element={user ? <Navigate to="/" replace /> : <Sign />}
            />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;