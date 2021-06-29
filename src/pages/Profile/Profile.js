import React,{useState,useContext,useEffect} from 'react';
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

    const {role}=useContext(AuthContext);
    const {email}=useContext(AuthContext);
    const{street}=useContext(AuthContext);
    const{city}=useContext(AuthContext);
    const{postalcode}=useContext(AuthContext);
    const{telnumber}=useContext(AuthContext);

    console.log("Profile page role: ",role)
    console.log("Profile Page mail: ",email)
    console.log("Profile Page straat: ",street)
    console.log("Profile Page stad: ",city)
    console.log("Profile Page pc: ",postalcode)
    console.log("Profile Page tel: ",telnumber)
    console.log("user: ",user)






    // const {handleSubmit} = useForm();
    const [message, setMessage] = useState();
    const [imagesFromBackend, setImageFromBackend] = useState([]);
    const [length, setLength] = useState(0);
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [fileID, setFileID] = useState()
    const [showFileFromKeepName, setShowFileFromKeepName] = useState(false)
    const [fileToUpload, setFileToUpload] = useState();
    const [nameFileToUpload, setNameFileToUpload] = useState()
    const [updateFiles, setupdateFiles] = useState(false)


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


    // ***********************************************************

    function keepName(file) {

        console.log("file in keepName: ", file)

        setFileName(file.name)
        setFileUrl(file.url);
        setFileID(file.id);
        setShowFileFromKeepName(true)

    }
    // ***********************************************************

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

            console.log("PLAATJE WEG")


        } catch (error) {
            console.log("PLAATJE NIET WEG")
        }

    }


    async function getFilesFromBackend() {

        try {
            console.log("IN getFilesFromBackend")

            const response = await axios.get("http://localhost:8080/file/files")


            setMessage("Files goed opgehaald uit de backend")
            setLength(response.data.length);
            setImageFromBackend(response.data);


        } catch (e) {
            setMessage("Upload Fout")
            console.log("Er is iets fout gegaan bij het ophalen")
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

            console.log("Foutje bij het versturen naar backend")


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

        <div className={styles.background}>


            <h2>Profile Page</h2>


        <div>
            <p><strong>Post code: </strong>{postalcode}</p>
            <p><strong>Tel. nummer </strong>{telnumber}</p>

            <h2>Gegevens:</h2>
            <p><strong>UserName: </strong>{user}</p>

            <p><strong>Email: </strong>{email}</p>
            <p><strong>Stad: </strong>{city}</p>
            <p><strong>Straat: </strong>{street}</p>






        </div>
    </div>


















            <h3>Message {message} aantal files{length}</h3>


            <fieldset>

                <div className={styles.invoer}>
                    <h1>File kiezen en versturen naar Backend</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            onChange={(e) => setNameFileToUpload(e.target.value)}
                        />

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
                    </form>
                </div>


            </fieldset>


            {showFileFromKeepName &&
            <div>fileName uit keepName: {fileName}
                <div>
                    fileUrl uit keepName: {fileUrl}
                    fileID uit keepName:{fileID}
                </div>

            </div>

            }


            {/**************************************************************************************/}

            {imagesFromBackend.length > 0 &&
            <fieldset>

                <h3>Hier komt eerste file te staan</h3>
                <h4>{imagesFromBackend[0].name}</h4>
                <h4>{imagesFromBackend[0].url}</h4>
                <h4>{imagesFromBackend[0].id}</h4>

                <div>
                    <img
                        className={styles.plaatje}
                        alt={"Eerste file in fileinfos"}
                        src={imagesFromBackend[0].url}
                    />
                    <h3>{imagesFromBackend[0].name}</h3>
                </div>

            </fieldset>
            }

            {/**************************************************************************************/}


            {imagesFromBackend.length > 0 &&
            <fieldset>


                <ul>
                    {imagesFromBackend.map((file) => {
                            return <li key={file.url}>
                           <span
                               onClick={

                                   () => keepName(file)}
                           >naam bij opklikken worden de gegevens doorgestuurd naar keepName: <h3>{file.name}</h3>
                           </span>
                            </li>
                        }
                    )}
                </ul>

                <div>

                    {showFileFromKeepName &&
                    <fieldset className={styles.plaatjeContainer}>


                        <img
                            className={styles.plaatje}
                            alt={"Eerste file in fileinfos"}

                            src={fileUrl}
                        />
                        <h3>{fileName}</h3>
                        <button
                            onClick={deletePicture}
                        >
                            delete plaatje
                        </button>


                    </fieldset>
                    }

                </div>


            </fieldset>

            }


        </>

    )








}

export default Profile;