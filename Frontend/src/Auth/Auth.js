import React, { useState } from "react";
import Svg1 from "./svg1";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [signup, setSignUp] = useState(false);

  return (
    <>
      <article className="not--member">
        {!signup ? "Not a member?" : ""} &nbsp;
        <button onClick={() => setSignUp(!signup)} className="btn">
          {!signup ? "SignUp" : "SignIn"}
        </button>
      </article>
      <main className="signin--section">
        <div className="section--img">
          <Link to="/">
            <FaLongArrowAltLeft className="back--btn" size={30} />
          </Link>
          <Svg1 />
        </div>
        {signup ? <SignUp /> : <SignIn />}
      </main>
    </>
  );
};

export default Auth;
