import React from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = React.useState(true);
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : " "}
            onClick={() => setIsLogin(true)}
          >LOGIN</button>
          <button
            className={!isLogin ? "active" : " "} onClick={() => setIsLogin(false)}>
            SIGN UP
          </button>
        </div>
        {isLogin ? <>
            <div className="form">
              <h2>Login Form</h2>
              <input type="Email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
                <a href="#">Forgot Password? </a>
                <button type="submit">Login</button>
                <p> Not a Member? <a href="#" onClick={()=> setIsLogin(false)}>SignUp Now</a></p>
            </div>
          </> : <>
            <div className="form">
              <h2>Sign-Up</h2>
              <input type="text" placeholder="Full Name" required />
              <input type="Email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type ="password" placeholder="Confirm Password" required />
              <button type="submit">Sign Up</button>
              <p> Already a Member? <a href="#" onClick={()=> setIsLogin(true)}>Login</a></p>
            </div>
          </>}
      </div>
    </div>
  );
}
