import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();




    // state voor de gebruikersdata, object voorgebruikersdata
    const [authState, setAuthState] = useState({
        // hier komt later nog een object bij
        user: null,
        status: 'pending',
        loginStatus: false,
        role: "",
        email: "",
        updatePage: false,
    });

    //******************************************************************************
    async function fetchUserData(jwtToken) {
        console.log('AuthContext start fetchUserData ')
        console.log('AuthContext jwtToken', jwtToken)
        //we hebben de jwt token nodig om daaruit de user id te halen
        //Hier gebruiken we de package npm install jwt-deco
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        console.log("AuthContext decoded.sub: ", decoded.sub);


        console.log('AuthContext jwt DECODED', decoded);
        // gebruikersdata ophalen
        try {



            const response = await axios.get(`http://localhost:8080/users/name/${userId}`, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            //check wat je binnen krijgt
            console.log("Data binnengehaald!")
            console.log("response:", response)
            console.log("addresses", response.data.addresses)


            // street: response.data.addresses[0].street,
            //     city: response.data.addresses[0].city,
            //     postalcode: response.data.addresses[0].postalcode,
            //     telnumber:response.data.addresses[0].telnumber,








            //maak een Array waarin alle authorities in staan
            const testArray = response.data.authorities.map((x) => {
                return x
            });

            console.log("testArray:", testArray)


            let roleTest = ""
            // testen of Role = ADMIN
            let testFilter = testArray.filter((y) => {
                return y.authorityRole === "ADMIN"
            })
            if (testFilter.length >= 1) {
                roleTest = "ADMIN";
            }

            //testen of Role = COMPANY_USER
            testFilter = testArray.filter((y) => {
                return y.authorityRole === "COMPANY_USER"
            })
            if ((testFilter.length >= 1) && roleTest !== "ADMIN") {
                roleTest = "COMPANY_USER";
            }


            //testen of Role = CUSTOMER
            testFilter = testArray.filter((y) => {
                return y.authorityRole === "CUSTOMER"
            })

            if ((testFilter.length >= 1) && roleTest !== "ADMIN" && roleTest !== "COMPANY_USER") {
                roleTest = "CUSTOMER";
            }
            console.log("role na filter: ", roleTest)


            setAuthState({
                ...authState,
                user: {
                    username: response.data.username,
                    email: response.data.email,

                },
                status: 'done',
                loginStatus: true,
                role: roleTest,
                email: response.data.email,
                street: response.data.addresses[0].street,
                city: response.data.addresses[0].city,
                postalcode: response.data.addresses[0].postalcode,
                telnumber:response.data.addresses[0].telnumber,


            });
            console.log("na setAuthState")
            console.log("AuthState na inloggen", authState)


        } catch (e) {

            console.log("fout in Authcontext, nu wordt ook de AuthState gereset en de localstorage gecleared")
            localStorage.clear();
            setAuthState({
                user: null,
                status: 'done',
                loginStatus: false,
            });


            console.error(e);
        }
    }

    //******************************************************************************


    // wanneer de applicatie geladen wordt willen we checken of er een token is, als die er is, maar er is
    // geen gebruiker dan willen we alsnog de gebruikersdata ophalen

    useEffect(() => {
        //is er een token in de local storage (token!==) maar geen gegevens (authState.user === null)
        // (want daar zit ook user gegevens in) haal dan gegevens op



        console.log('AuthContext.js, useEffect gestart')

        const token = localStorage.getItem('token');
        if (token !== null && authState.user === null) {


            console.log('AuthContext.js, User gegevens opvragen ER IS EEN TOKEN')
            fetchUserData(token);

        } else {


            //is er een token, maar geen user (situatie ontstaat na verlaten webpagina, maar zonder uitloggen!
            //is er GEEN user?
            //haal data dan op (zoals bij login)

            //zo nee, dan geen user maar wel de status op 'done' zetten

            console.log("geen token")

            setAuthState({
                user: null,
                status: 'done',
                role:"empty"

            });
        }
    }, []);



    async function updatePageFunction(){
        console.log("AuthContext, start loginFunction")

        const jwtToken = localStorage.getItem('token');

        // gebruikersdata ophalen
        fetchUserData(jwtToken);

        console.log("AuthContext, net loginFunction uitgevoerd")


        setAuthState({
            updatePage: true,
        });
    }










    //inlogfunctie
    // jwtToken nodig om daaruit de user ID te halen
    //jwtToken in de localStorage zetten
    //gebruikersdata ophalen
    //die data gebruiken om de context te vullen.
    // de jwtToken (anyName), wordt meegegeven vanuit de signin.js page
    // vanuit:  login(response.data.accessToken)
    //dan doorlinken naar de profiel pagina (of andere zoals home ed)







    async function loginFunction(jwtToken) {
        console.log("AuthContext, start loginFunction")

        //jwt token in de local storage
        localStorage.setItem('token', jwtToken);

        // gebruikersdata ophalen
        fetchUserData(jwtToken);

        console.log("AuthContext, net loginFunction uitgevoerd")

    }



    //omdat authState een object is,
    // en we nog steeds gebruik willen maken van de automatische state updates zullen we de authState "spreadden"
    // copieer en verwijs naar dat object. als er dan wat veranderd wordt de inhoud van authState direct geplaatst in data

    const data = {
        ...authState,
        login: loginFunction,
        updatePageFromAuthState:updatePageFunction,
        // logout: logoutFunction,
    }


    console.log("auth authstate", authState)

    // geef const data mee aan de <AuthContext.Provider>
    return (

        <AuthContext.Provider value={data}>

            {authState.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;