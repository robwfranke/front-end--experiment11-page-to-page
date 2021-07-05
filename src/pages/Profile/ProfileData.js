import React, {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../components/context/AuthContext";





function ProfielData() {


    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.sub;

    const {role} = useContext(AuthContext);
    const {email} = useContext(AuthContext);
    const {street} = useContext(AuthContext);
    const {city} = useContext(AuthContext);
    const {postalcode} = useContext(AuthContext);
    const {telnumber} = useContext(AuthContext);




  return(
      <>



          <div className={styles.profileData}>
              <h3>Profiel gegevens:</h3>
              <div><strong>UserName: </strong>{user}</div>
              <div><strong>Stad: </strong>{city}</div>

              <div><strong>Straat (nr): </strong>{street}</div>

              <div><strong>Post code: </strong>{postalcode}</div>
              <div><strong>Email: </strong>{email}</div>
              <div><strong>Tel. nummer </strong>{telnumber}</div>


          </div>










      </>

  )
}


export default ProfielData;
