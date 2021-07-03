import React, {useState, useContext, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import styles from "./Registration.module.css";
import axios from "axios";


function Registration() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const [error, setError] = useState(false)
    const [registrated, setRegistrated] = useState(false);


    async function onSubmit(data) {

        setError(false);
        setRegistrated(false);


        console.log("data ", data)

        /*hoofdletters en verwijderen spaties*/
        data.postalcode = data.postalcode.toUpperCase();
        data.postalcode = data.postalcode.replace(/\s+/g, '');

        //strip alle niet nummerieke karakters.
        data.telnumber = data.telnumber.replace(/[^\d]/g, '');


        try {


            const response = await axios.post("http://localhost:8080/customers", data);
            console.log("respons =", response)
            setRegistrated(true);

            setTimeout(() => {
                history.push("/login")
            }, 4000);


        } catch (error) {
            console.log("foutje in registratie")
            setError(true)
            console.error(error);

        }
    }


    return (

        <>


            <form onSubmit={handleSubmit(onSubmit)}>


                <fieldset className={styles["registration-container"]}>
                    <h3>Registratie pagina nieuwe klant</h3>


                    <label htmlFor="username-field">
                        Username:
                        <input
                            type="text"

                            placeholder="vb. Jan Klaassen"
                            {...register("username", {required: true})}
                        />
                        {errors.username && (
                            <span className={styles["alert"]}>Vul uw username in</span>

                        )}
                    </label>


                    <label htmlFor="password-field">
                        Password:
                        <input
                            type="password"
                            placeholder="min 8 karakters"
                            {...register("password", {
                                required: true,
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
                            {...register("email", {
                                required: true,
                                pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                            })}
                        />
                        {errors.email && (
                            <span className={styles["alert"]}>check uw email!</span>
                        )}
                    </label>


                    <label htmlFor="city-field">
                        Stad:
                        <input
                            type="text"
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


                    <label htmlFor="telephone-field">
                        Telefoonnummer:
                        <input
                            type="text"
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


                    <button
                        type="submit"
                        className={styles["submit-button"]}
                    >
                        Inloggen
                    </button>

                    {error &&
                    <div className={styles["error-axios"]}>
                        <p> er is wat misgegaan met de registratie!!</p>
                        <p> probeer het opnieuw of ga naar login</p>
                    </div>
                    }

                    {registrated &&
                    <div className={styles["registrated"]}>
                        <p> Het registreren is gelukt!!</p>
                        <p> u wordt doorgestuurd naar de inlogpagina</p>
                    </div>
                    }

                </fieldset>


            </form>

        </>
    );
}

export default Registration;
