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




                    <div>
                        <form
                            key={2}
                            className={styles.onSubmit}
                            onSubmit={handleSubmit2(onSubmit2)}>

                            <label htmlFor="password-field">
                                Password:
                                <input
                                    type="password"
                                    placeholder="min 8 karakters"
                                    {...register2("password", {
                                        required:true,
                                        minLength: {
                                            value: 8,
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <span className={styles["alert"]}>Minimaal 8 karakters!</span>
                                )}
                            </label>


                            <label htmlFor="email-field">
                                email:
                                <input
                                    type="email"
                                    placeholder="vb. naam@nogwat.nl"
                                    {...register2("email", {
                                        required: true,
                                        pattern:/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                                    })}
                                />
                                {errors.email && (
                                    <span className={styles["alert"]}>check uw email!</span>
                                )}
                            </label>





                            <div>
                                <label htmlFor="city-field">
                                    Stad:
                                    <input defaultValue=""
                                           type="text"
                                           {...register2("city2",)}
                                    />

                                </label>

                            </div>

                            <div>

                            <button
                                className={styles.button2}

                                type="submit"

                            >
                                Update!
                            </button>



                            <button
                                className={styles.button2}
                                onClick={showUpdateDataProfile}
                            >
                                cancel
                            </button>


                            </div>




                        </form>


                    </div>

                </div>
                }


            </div>
        </>

    )

}

export default Profile;

