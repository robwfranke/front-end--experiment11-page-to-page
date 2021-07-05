import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../../components/context/AuthContext";
import axios from "axios";
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import jwt_decode from "jwt-decode";
import ProfileData from "./ProfileData";
import ProfileImage from "./ProfileImage";
import ProfileUpdate from "./ProfileUpdate";


function Profile() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2
    } = useForm();

    const token = localStorage.getItem('token');
    console.log("TOKEN IN PROFILE.js", token)
    const decoded = jwt_decode(token);
    const user = decoded.sub;



    const[newEmail,setNewEmail]=useState("")
    const[newStreet,setNewStreet]=useState("")
    const[newCity,setNewCity]=useState("")
    const[newPostalcode,setnewPostalcode]=useState("")
    const[newTelnumber,setnewTelnumber]=useState("")



    const [changeProfileData, setChangeProfileData] = useState(false)
   const {errorSubmit2,setErrorSubmit2}=useState(false);



    function showUpdateDataProfile() {
        if (changeProfileData) {
            setChangeProfileData(false)
        } else {
            setChangeProfileData(true)
        }
    }


    function onSubmit2(data) {

        console.log("IN onSubmit2")
        console.log("DATA: ",data)
        // sendFileToBackend();
    }

    return (


        <>
            <div>

                <h2>Profile Page</h2>
            </div>


            <div className={styles.container}>


                {/************* PROFILE DATA   ***********/}

                <div className={styles.leftColumn}>

                    <ProfileData/>

                    <button
                        className={styles.button1}
                        onClick={showUpdateDataProfile}
                    >
                        verander gegevens
                    </button>


                </div>


                {/*************  PROFILE IMAGE   ***********/}


                <div className={styles.centerColumn}>

                    <ProfileImage/>

                </div>


                {/*************  RIGHT COLUMN   ***********/}

                {changeProfileData &&

                <div className={styles.rightColumn}>

                    <ProfileUpdate/>





                </div>
                }


            </div>
        </>

    )

}

export default Profile;

