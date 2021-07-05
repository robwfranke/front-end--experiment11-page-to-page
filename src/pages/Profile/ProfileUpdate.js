import React, {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../components/context/AuthContext";


function ProfielUpdate() {

    const {register, handleSubmit, formState: {errors}} = useForm();


    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.sub;

    const {role} = useContext(AuthContext);
    const {email} = useContext(AuthContext);
    const {street} = useContext(AuthContext);
    const {city} = useContext(AuthContext);
    const {postalcode} = useContext(AuthContext);
    const {telnumber} = useContext(AuthContext);

    const [changeProfileData, setChangeProfileData] = useState(false)


    function showUpdateDataProfile() {
        if (changeProfileData) {
            setChangeProfileData(false)
        } else {
            setChangeProfileData(true)
        }
    }


    function onSubmit(data) {

        console.log("PROFILE UPDATE IN onSubmit2")
        console.log("DATA: ", data)
        // sendFileToBackend();
    }


    return (
        <>


            <div>
                <form

                    className={styles.onSubmit}
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/*<label htmlFor="password-field">*/}
                    {/*    Password:*/}
                    {/*    <input*/}
                    {/*        type="password"*/}
                    {/*        placeholder="min 8 karakters"*/}
                    {/*        {...register("password", {*/}
                    {/*            required:true,*/}
                    {/*            minLength: {*/}
                    {/*                value: 8,*/}
                    {/*            }*/}
                    {/*        })}*/}
                    {/*    />*/}
                    {/*    {errors.password && (*/}
                    {/*        <span className={styles["alert"]}>Minimaal 8 karakters!</span>*/}
                    {/*    )}*/}
                    {/*</label>*/}





                    <label htmlFor="city-field">
                        Stad:
                        <input
                            type="text"
                            defaultValue={city}
                            placeholder="min 3 karakters"
                            {...register("city", {
                                required: true,
                                minLength: {
                                    value: 3,
                                }

                            })}
                        />
                        {errors.city && (
                            <span className={styles["alert"]}>check uw stad!</span>
                        )}
                    </label>


                    <label htmlFor="street-field">
                        Straatnaam en nummer:
                        <input
                            type="text"
                            defaultValue={street}
                            placeholder="min 5 karakters"
                            {...register("street", {
                                required: true,
                                minLength: {
                                    value: 5,
                                }

                            })}
                        />
                        {errors.street && (
                            <span className={styles["alert"]}>check uw straatnaam!</span>
                        )}
                    </label>


                    <label htmlFor="postalcode-field">
                        Postcode:
                        <input
                            type="text"
                            defaultValue={postalcode}
                            placeholder="1234 AA"
                            {...register("postalcode", {
                                required: true,
                                pattern: /^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i,
                            })}
                        />
                        {errors.postalcode && (
                            <span className={styles["alert"]}>check uw postcode!</span>
                        )}
                    </label>




                    <label htmlFor="email-field">
                        email:
                        <input
                            type="email"
                            defaultValue={email}
                            placeholder="vb. naam@nogwat.nl"
                            {...register("email", {
                                required: true,
                                pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                            })}
                        />
                        {errors.email && (
                            <span className={styles["alert"]}>check uw email!</span>
                        )}
                    </label>


                    <label htmlFor="telephone-field">
                        Telefoonnummer:
                        <input
                            type="text"
                            defaultValue={telnumber}
                            placeholder="012-3456789"
                            {...register("telnumber", {
                                required: true,
                                pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            })}
                        />
                        {errors.telnumber && (
                            <span className={styles["alert"]}>check uw nummer!</span>
                        )}
                    </label>




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


        </>

    )
}


export default ProfielUpdate;
