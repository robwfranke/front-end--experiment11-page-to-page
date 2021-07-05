import React, {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../components/context/AuthContext";


function ProfielImage() {
    const {register, handleSubmit, formState: {errors}} = useForm();


    const token = localStorage.getItem('token');
    console.log("TOKEN IN ProfielImage.js", token)

    const decoded = jwt_decode(token);
    const user = decoded.sub;


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


    useEffect(() => {
        getFilesFromBackend()


        // setupdateFiles(true)
    }, []);

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
        console.log("FILE URL:", fileUrl)
        try {

            const response = await axios.delete(`http://localhost:8080/files/${fileID}`, {
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
            console.log("IN PROFILEIMAGE: getFilesFromBackend")

            const response = await axios.get("http://localhost:8080/files")

            setLength(response.data.length);
            setAllImages(response.data);
            setFileID(response.data[0].id)


        } catch (e) {


            console.log("IN PROFILEIMAGE Geen image of verkeerd endpoint. Status moet nog")

            console.log("exception:", e)
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


            const response = await axios.post("http://localhost:8080/files", formData, {
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


    function onSubmit() {

        console.log("IN onSubmit")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)
        sendFileToBackend();
    }


    return (


        <>

            {allImages.length === 0 &&
            <>
                <form
                    key={1}
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


            </>
            }

            {allImages.length > 0 &&
            <>
                <img
                    className={styles.image}
                    alt={"Profiel foto"}
                    src={allImages[0].url}
                />
            </>
            }

            {allImages.length > 0 &&
                <>
            <button
                onClick={deletePicture}
            >
                verwijder profiel foto
            </button>
                </>

            }


            {errorDeleteFile &&

            <div className={styles.warning}>Er is iets fout gegaan bij het verwijderen
                Probeer het nog een keer!
                Of neem contact op met ons.</div>

            }


        </>

    )
}


export default ProfielImage;
