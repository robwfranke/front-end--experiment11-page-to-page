import React from 'react';
import {Link, useHistory} from 'react-router-dom';


export default function Logout({loggedIn,setLoggedIn}) {

    console.log("op logout page")
    localStorage.clear();
setLoggedIn=(false);


    const history = useHistory();
    history.push("/")
    window.location.reload();
    return null;
}