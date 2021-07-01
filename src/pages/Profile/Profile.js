import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../../components/context/AuthContext";
import axios from "axios";
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import jwt_decode from "jwt-decode";


function Profile() {

    const {handleSubmit} = useForm();

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.sub;

    const {role} = useContext(AuthContext);
    const {email} = useContext(AuthContext);
    const {street} = useContext(AuthContext);
    const {city} = useContext(AuthContext);
    const {postalcode} = useContext(AuthContext);
    const {telnumber} = useContext(AuthContext);

    console.log("Profile page role: ", role)
    console.log("Profile Page mail: ", email)
    console.log("Profile Page straat: ", street)
    console.log("Profile Page stad: ", city)
    console.log("Profile Page pc: ", postalcode)
    console.log("Profile Page tel: ", telnumber)
    console.log("user: ", user)








    const [errorSaveFile, setErrorSaveFile] = useState(false);
    const [errorDeleteFile, setErrorDeleteFile] = useState(false);
    const [errorGetFile, setErrorGetFile] = useState(false);/*als er tijd is dit toevoegen!*/
    const [errorUpdateFile, setErrorUpdateFile] = useState(false);/*als er tijd is dit toevoegen!*/

    const [allImages, setAllImages] = useState([]);
    const [length, setLength] = useState(0);
    const [fileUrl, setFileUrl] = useState()
    const [fileID, setFileID] = useState()
    const [showFileFromKeepName, setShowFileFromKeepName] = useState(false)
    const [fileToUpload, setFileToUpload] = useState();
    const [nameFileToUpload, setNameFileToUpload] = useState()
    const [updateFiles, setupdateFiles] = useState(false)
    const [changeProfileData, setChangeProfileData] = useState(false)














    // *******************UseEffect********************

    useEffect(() => {
        getFilesFromBackend()


        // setupdateFiles(true)
    }, []);

    //
    useEffect(() => {
        console.log("UseEffect updateFiles")
        if (updateFiles) {
            getFilesFromBackend()
            setupdateFiles(false)
        }

    }, [updateFiles]);


    async function deletePicture() {
        setFileUrl("")
        setShowFileFromKeepName(false)
        console.log("FILE ID:", fileID)
        try {

            const response = await axios.delete(`http://localhost:8080/file/files/${fileID}`, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                }
            })
            setupdateFiles(true)


        } catch (error) {


            setErrorDeleteFile(true)
            setTimeout(() => {
                setErrorDeleteFile(false);
            }, 3500);


        }

    }


    async function getFilesFromBackend() {

        try {
            console.log("IN getFilesFromBackend")

            const response = await axios.get("http://localhost:8080/file/files")

            setLength(response.data.length);
            setAllImages(response.data);
            setFileID(response.data[0].id)


        } catch (e) {


            console.log("Geen image of verkeerd endpoint. Status moet nog")


        }


    }


    async function sendFileToBackend() {

        console.log("IN sendFileToBackend() ")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)


        try {
            let formData = new FormData()

            console.log("TRY fileToUpload:", fileToUpload)

            // LET OP!!!! name: "file"  DIT MOET DUS "file" blijven
            formData.append("file", fileToUpload);

            console.log("FormData:", formData)


            const response = await axios.post("http://localhost:8080/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                    "Content-type": "application/json",
                },
            });

            setupdateFiles(true)
            console.log("response", response)
        } catch (error) {

            setErrorSaveFile(true)
            setTimeout(() => {
                setErrorSaveFile(false);
            }, 3500);

        }

    }

    async function updateProfileDataToBackend(){
        console.log("HIER ACTIE UPDATE PROFILE")

        setChangeProfileData(false)
    }


    function showUpdateDataProfile() {
        if (changeProfileData) {
            setChangeProfileData(false)
        } else {
            setChangeProfileData(true)
        }
    }


    function onSubmit() {


        sendFileToBackend();
    }

    function onSubmit() {

        console.log("IN onSubmit")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)
        sendFileToBackend();
    }


    return (




        //     <h2>Profile Page</h2>
        //
        //
        //
        //
        //     <div className={styles.alignUserdata}>
        //
        //
        //         <div className={styles.userData}>
        //
        //             <fieldset>
        //
        //                 <h2>Gegevens:</h2>
        //
        //                 <p><strong>Post code: </strong>{postalcode}</p>
        //                 <p><strong>Tel. nummer </strong>{telnumber}</p>
        //
        //
        //                 <p><strong>UserName: </strong>{user}</p>
        //
        //                 <p><strong>Email: </strong>{email}</p>
        //                 <p><strong>Stad: </strong>{city}</p>
        //                 <p><strong>Straat: </strong>{street}</p>
        //
        //             </fieldset>






            <div className={styles.container}>

                {/*************  LEFT COlUMN   ***********/}

                <div className={styles.item1}>Lorem ipsum dolor sit amet.
                    nog meer text
                    Naam: Robbie
                    <button
                        className={styles.button1}
                        onClick={showUpdateDataProfile}
                    >
                        verander gegevens</button>


                </div>


                {/*************  CENTER COLUMN   ***********/}


                <div className={styles.containerCenter}>

                    {allImages.length > 0 &&
                    <img
                        className={styles.image}
                        alt={"Eerste file in fileinfos"}
                        src={allImages[0].url}
                    />
                    }


                    {allImages.length === 0 &&
                    <div>
                        <form
                            className={styles.onSubmit}
                            onSubmit={handleSubmit(onSubmit)}>

                            <input

                                type="file"
                                accept="image/*"
                                onChange={(e) => setFileToUpload(e.target.files[0])}
                            />


                            <button
                                type="submit"

                            >
                                SAVE!
                            </button>
                            {errorSaveFile &&

                            <div className={styles.warning}>Er is iets fout gegaan bij het ophalen
                                Probeer het nog een keer!
                                Of neem contact op met ons.</div>

                            }

                        </form>


                    </div>
                    }

                    {allImages.length > 0 &&
                    <button
                        onClick={deletePicture}
                    >
                        verwijder profiel foto
                    </button>
                    }

                    {errorDeleteFile &&

                    <div className={styles.warning}>Er is iets fout gegaan bij het verwijderen
                        Probeer het nog een keer!
                        Of neem contact op met ons.</div>

                    }




                </div>


                {/*************  RIGHT COLUMN   ***********/}

                {changeProfileData &&

                <div className={styles.item2}>

                    <div>

                        <div>Lorem ipsum dolor sit amet.</div>
                        <div>Naam:</div>
                        <div>email:</div>
                    </div>

                    <div>

                        <button
                            className={styles.button2}
                            onClick={updateProfileDataToBackend}

                        >
                            Update!</button>


                        <button
                            className={styles.button2}
                            onClick={showUpdateDataProfile}
                        >
                            cancel
                        </button>


                    </div>


                </div>
                }


            </div>






    )

}

export default Profile;
