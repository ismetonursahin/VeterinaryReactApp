import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Customer from "./pages/Customer/Customer";
import Appointment from "./pages/Appointment/Appointment";
import Report from "./pages/Report/Report";
import Vaccine from "./pages/Vaccine/Vaccine";
import Doctor from "./pages/Doctor/Doctor";
import Animal from "./pages/Animal/Animal";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/appointment">{<Appointment />}</Route>
          <Route path="/report">{<Report />}</Route>
          <Route path="/vaccine">{<Vaccine />}</Route>
          <Route path="/doctor">{<Doctor />}</Route>
          <Route path="/animal">{<Animal />}</Route>
          <Route path="/customer">{<Customer />}</Route>
          <Route path="/">{<Home />}</Route>
        </Switch>{" "}
      </div>
    </Router>
  );
}
