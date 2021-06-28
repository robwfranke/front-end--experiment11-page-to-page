import './App.css';

import React, {useContext, useState} from 'react';
import {AuthContext} from "./components/context/AuthContext";


import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from "./components/navigation/Navigation";
import Login from "./pages/Login/Login"
import Logout from "./pages/Logout";
import Registration from "./pages/Registration/Registration";
import Admin from "./pages/Admin/Admin";
import CompanyUser from "./pages/CompanyUser/CompanyUser";
import Customer from "./pages/Customer/Customer";
import CustomerOrder from "./pages/Customer/CustomerOrder";
import CustomerOrderItem from "./pages/Customer/CustomerOrderItem";
import Profile from "./pages/Profile/Profile";


function App() {
    const history = useHistory();


    const {role} = useContext(AuthContext);
    const {email} = useContext(AuthContext);

    console.log("Navigation, role uit authcontext: ", role)

    let isAuthCustomer = false;
    let isAuthUser = false;
    let isAuthAdmin = false;

    if (role == "ADMIN") {
        isAuthAdmin = true

    }
    if (role == "COMPANY_USER") {
        isAuthUser = true
    }
    if (role == "CUSTOMER") {
        isAuthCustomer = true

    }


    console.log("APP.js, ADMIN: ", isAuthAdmin)
    console.log("APP.js, COMPANY_USER: ", isAuthUser)
    console.log("APP.js, CUSTOMER: ", isAuthCustomer)
    if ((isAuthCustomer === false) && (isAuthUser === false) && (isAuthAdmin === false)) {
        history.push("/")
    }


    return (
        <div>
            <Navigation
                isAuthCustomer={isAuthCustomer}
                isAuthUser={isAuthUser}
                isAuthAdmin={isAuthAdmin}

            />


            <Switch>

                <Route exact path="/home">
                    <Home/>
                </Route>


                <Route exact path="/login">
                    <Login/>
                </Route>

                <Route exact path="/profile">
                    <Profile/>
                </Route>


                <Route exact path="/logout">
                    <Logout/>
                </Route>


                <Route exact path="/registration">
                    <Registration/>
                </Route>

                <Route exact path="/admin1">
                    <Admin/>
                </Route>

                <Route exact path="/companyUser">
                    <CompanyUser/>
                </Route>


                <Route exact path="/customer">
                    <Customer/>
                </Route>


                <Route exact path="/customerOrder">
                    <CustomerOrder/>

                </Route>

                <Route exact path="/customerOrderItem">
                    <CustomerOrderItem/>

                </Route>


            </Switch>


        </div>


    )
}

export default App;
