import React from "react";
import Login from "./form/Login";
import SignUp from "./form/SignUp";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import ForgotPassword from "./form/ForgotPassword";
import ResetPassword from "./form/ResetPassword";
import Reservation from "./form/Reservation";

function ContactUs() {
  return (
    <>
      <section className="ContactUs" id="ContactUs">
        <h1 style={{ textAlign: "center" }}>ContactUs</h1>
        {/* <BrowserRouter>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </Router>
        </BrowserRouter> */}
        <Reservation />
        <SignUp />
        <Login />
        <ForgotPassword />
        <ResetPassword />
      </section>
    </>
  );
}

export default ContactUs;
