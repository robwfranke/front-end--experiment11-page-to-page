import React, {useState, Component} from 'react';
import {useLocation, useHistory, NavLink} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';

import styles from "../Customer/Customer.module.css";

function CustomerOrderItem() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const itemIndividual = location.state.item;

    const orderStatus= location.state.status;
    console.log("STATUS",orderStatus)





    const [changeStatus, setChangeStatus] = useState(false);

    const [jobId, setJobId] = useState("")
    const [jobname, setJobname] = useState("")

    const [addJobStatus, setAddJobStatus] = useState(false)
    const [warningJobExists, setWarningJobExists] = useState(false)

    const [messageJob, setMessageJob]=useState(false)

    console.log("itemIndividual: ", itemIndividual)


    function addJob() {
        console.log("Function addJob")
        setAddJobStatus(true);
    }


    async function postAddJob(data) {

        const dataAddNewJob = {
            itemName: itemIndividual.itemname,
            jobName: data.jobname
        };

        console.log("in postAddJob")
        console.log("itemname", itemIndividual.itemname)
        console.log("jobName", dataAddNewJob.jobName)


        try {

            //
            const response = await axios.post(`http://localhost:8080/items/addJob`, dataAddNewJob, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })

            setWarningJobExists(false)
            setTimeout(() => {
            history.push("/customer")
            }, 2500);


        } catch (error) {


            console.error(error);


        }


    }


    function startChange(job) {

        setJobId(job.id)
        setJobname(job.jobname)

        setChangeStatus(true);
        console.log("setChangeOrderItem true")
        console.log("jobId: ", job)

        console.log("id: ", job.id)
    }


   async function deleteJob(jobName){
       console.log("DELETEJOB FUNCTION")
       console.log("JOBNAME",jobName)

   }


    async function onSubmit(data) {

        console.log("Onsubmit fuction")
        console.log("data ", data)
        console.log("itemIndividual.jobsFromItem:", itemIndividual.jobsFromItem)
        // check of the jobname er al is, dan setWarning)
        const found = itemIndividual.jobsFromItem.some(item => item.jobname === data.jobname);
        console.log("found: ", found)

        if (found === true) {
            setWarningJobExists(true)
            console.log("warningJobExists true", warningJobExists)
        } else {
            setWarningJobExists(false)
            setMessageJob(true)
            console.log("warningJobExists false dus nu toevoegen!", warningJobExists)
        }

        postAddJob(data);


    }

    async function putStatus(data) {
        //
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  ordername: ",orderIndividual.ordername)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  status: ",data.status)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA token: ",token)
        const dataPut = {
            ordername: itemIndividual.itemname,
            quantity: data.quantity
        };


        try {
            console.log("PutStatus")
            const response = await axios.put(`http://localhost:8080/orders/update/${itemIndividual.itemname}`, dataPut, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })


        } catch (e) {
            console.log("PutStatus fout gegaan")


        }


    }


    return (

        <section>
            <h1>CustomerOrderItem pagina</h1>
            <h3>item naam: {itemIndividual.itemname}</h3>
            <h3>quantity: {itemIndividual.quantity}</h3>
            <h3>jobs: {itemIndividual.jobsFromItem.length}</h3>


            <button
                onClick={addJob}

            >
                Voeg Job toe

            </button>





            <ul>
                {itemIndividual.jobsFromItem.map((job) => {
                    return <li key={job.id}>

                        <div>job id: {job.id}</div>
                        <div>jobname: {job.jobname}</div>
                        <div>afdeling: {job.department}</div>

                        {orderStatus==='open'&&
                        <button

                            onClick={() => deleteJob(job.jobname)}
                            type="text"
                        >
                            Delete
                        </button>
                        }


                    </li>


                })}


            </ul>


            <>


                {addJobStatus &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles["registration-container"]}>
                        <h3>Voeg job toe</h3>


                        <p>jobname</p>
                        <select
                            {...register("jobname",)}
                        >
                            <option value="voordraaien">voordraaien</option>
                            <option value="nadraaien">nadraaien</option>
                            <option value="voorfrezen">voorfrezen</option>
                            <option value="nafrezen">nafrezen</option>
                            <option value="slijpen">slijpen</option>
                        </select>


                        <button
                            type="submit"
                        >
                            Voeg toe!
                        </button>

                        {warningJobExists &&
                        <div>bestaat al!!</div>
                        }
                        {messageJob &&
                        <div>Job is opgeslagen, terug naar order bladzijde</div>
                        }

                    </fieldset>
                </form>
                }


            </>


        </section>
    );
};

export default CustomerOrderItem;