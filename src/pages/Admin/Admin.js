import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from "../../components/context/AuthContext";
import {Link, useHistory} from 'react-router-dom';




function Admin() {
    const {role}=useContext(AuthContext);
    const history = useHistory();

    if ((role==="COMPANY_USER" || role === "CUSTOMER")){

        history.push("/")

    }







    return (
        <section>
            <h1>Admin pagina</h1>
            <h2>Deze moet nog uitgewerkt worden</h2>
            <p>De admin heeft alle bevoegdheden</p>
        </section>
    );
}

export default Admin;
