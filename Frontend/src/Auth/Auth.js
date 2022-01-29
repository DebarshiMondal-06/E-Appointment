import React, { useState } from "react";
import Svg1 from "./Svg1";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Svg2 from "./Svg2";
import Forgot from "./Forgot";

const Auth = () => {
  const [signup, setSignUp] = useState(false);
  var loc = useLocation();

  return <>
    <article className="not--member">
      {(loc.pathname === "/forgot")
        ? <Link to="/auth">
          <button className="btn">
            Sign In
          </button> </Link>
        : <> {!signup ? "Not a member?" : "Already have account?"} &nbsp;
          <button onClick={() => setSignUp(!signup)} className="btn">
            {!signup ? "SignUp" : "SignIn"}
          </button> </>
      }
    </article>

    <main className="signin--section">
      <div className="section--img">
        <Link to="/">
          <FaLongArrowAltLeft className="back--btn" size={30} />
        </Link>
        {signup ? <Svg2 /> : <Svg1 />}
      </div>
      {signup ? <SignUp /> : (loc.pathname === '/forgot') ? <Forgot /> : <SignIn />}
    </main>
  </ >
};

export default Auth;
