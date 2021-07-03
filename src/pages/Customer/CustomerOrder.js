import React, {useContext, useState} from 'react';
import {useLocation, useHistory, NavLink} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from 'axios';

import styles from "../Customer/Customer.module.css";
import jwt_decode from "jwt-decode";

function CustomerOrder(CustomerUpdatePage) {

    const {updatePageFromAuthState}=useContext(AuthContext);



    const {register, handleSubmit, formState: {errors}, reset,} = useForm();
    const history = useHistory();

    const location = useLocation();

    const jwtToken = localStorage.getItem('token');

    const orderIndividual = location.state.order;


    console.log("orderIndividual: ", orderIndividual)


    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userNameInCustomerOrder = decoded.sub;


    const [changeStatus, setChangeStatus] = useState(false);
    const [addItemStatus, setAddItemStatus] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const [errorAddItem, setErrorAddItem] = useState(false);
    const [messageAddItem, setMessageAddItem] = useState("");

    const [errorMessageDeleteItem, setErrorMessageDeleteItem] = useState(false);
    const [messageDeleteItem, setMessageDeleteItem] = useState("");


    function StartChangeStatus() {

        setChangeStatus(true);
        setDisableButton(true);
        console.log("setChangeOrder true")
    }


    function cancelCustomerOrder() {
        history.push("/customer")
    }

    function cancelChangeStatusOrder() {
        setChangeStatus(false);
    }

    function cancelAddItem() {
        setErrorAddItem(false)
        setMessageAddItem("")
        setAddItemStatus(false);
    }


    function addItem() {
        setChangeStatus(false);
        setAddItemStatus(true);

    }


    async function deleteItem(itemName) {


        console.log("deleteItem CUSTOMERORDER", itemName)

        try {


            const response = await axios.delete(`http://localhost:8080/items/delete/itemname/${itemName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })
            setErrorMessageDeleteItem(false)
            setMessageDeleteItem(true);
            console.log("deleteItem na response")

            setTimeout(() => {
                history.push("/customer")
            }, 2500);

        } catch (error) {
            setErrorMessageDeleteItem(true)
            setMessageDeleteItem(false);
            console.error(error);


        }
    }



    async function onSubmit(data) {


        if (changeStatus === true) {


            console.log("data in onSubmit van changeStatus", data)
            putStatus(data);


            setChangeStatus(false)

            //roep updatePageFromOutside function aan uit de authstate:
            updatePageFromAuthState();

            history.push("/customer")
        }


        if (addItemStatus === true) {

            console.log("data in onSubmit van addItem", data)
            postAddItem(data);
            console.log("postAddItem gedaan")


        }

    }

    async function putStatus(data) {

        const dataPut = {
            ordername: orderIndividual.ordername,
            status: data.status
        };


        try {
            console.log("PutStatus")
            console.log("dataPut, ordername: ", dataPut.ordername)
            console.log("dataPut, status: ", dataPut.status)
            console.log("dataPut, userNameInCustomerOrder: ", userNameInCustomerOrder)


            const response = await axios.put(`http://localhost:8080/orders/update/${orderIndividual.ordername}`, dataPut, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })


        } catch (e) {
            console.log("PutStatus fout gegaan", e.response)
            console.log("PutStatus fout gegaan", e.response.status)

        }


    }


    async function postAddItem(data) {

        const dataAddNewItem = {
            orderName: orderIndividual.ordername,
            itemName: data.itemname,
            quantity: data.quantity
        };


        try {
            console.log("PostStatus")
            console.log("dataPost,ordername: ", dataAddNewItem.ordername)
            console.log("dataPost, itemname: ", dataAddNewItem.itemname)
            console.log("dataPost, quantity: ", dataAddNewItem.quantity)
            console.log("dataPost, userNameInCustomerOrder: ", userNameInCustomerOrder)

            console.log("dataAddNewItem", dataAddNewItem)


            const response = await axios.post(`http://localhost:8080/items/create`, dataAddNewItem, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })
            console.log("post gedaan nu reset ")
            setErrorAddItem(false)
            setMessageAddItem("")
            setAddItemStatus(false);
            history.push("/customer")


        } catch (error) {
            console.log("foutje bedankt")

            console.log("PostStatus fout gegaan", error.response.status)
            console.log("PostStatus fout gegaan", error.response.status)
            setErrorAddItem(true)
            if (error.response.status === 401) {
                setMessageAddItem("Item bestaat al!! (StatusCode 401)")

            }


        }

    }


    return (

        <section>
            <h1>CustomerOrder pagina</h1>


            <fieldset className={styles["listItem-buttons"]}>

                <button
                    type="text"
                    onClick={StartChangeStatus}
                    className={styles["submit-button"]}
                >
                    Wijzig status
                </button>


                <button
                    type="text"
                    onClick={addItem}
                    className={styles["submit-button"]}
                >
                    Voeg item toe!
                </button>


                <button
                    onClick={cancelCustomerOrder}
                    className={styles["submit-button"]}
                >
                    Start Page
                </button>


                <>


                    {changeStatus &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles["registration-container"]}>


                            <p>Selecteer status</p>
                            <select
                                {...register("status",)}
                            >
                                <option value="open">open</option>
                                <option value="pending">pending</option>
                                <option value="finished">finished</option>
                            </select>


                            <button
                                type="submit"
                            >
                                Wijzig!
                            </button>


                            <button
                                onClick={cancelChangeStatusOrder}
                                type="text"
                            >
                                Cancel
                            </button>


                        </fieldset>
                    </form>
                    }


                    {addItemStatus &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles["registration-container"]}>


                            <p>Voeg item toe</p>
                            <label htmlFor="itemname-field">
                                Item naam:
                                <input
                                    type="text"

                                    placeholder="vb. dwg 2021-001"
                                    {...register("itemname", {required: true})}
                                />
                                {errors.itemname && (
                                    <span className={styles["alert"]}>Vul uw itemname in</span>

                                )}
                            </label>


                            <label htmlFor="quantity-field">
                                Aantal:
                                <input
                                    type="integer"
                                    // type="reset"
                                    placeholder="min.1 en hele getallen"
                                    {...register("quantity", {
                                        required: true,
                                        pattern: /^[0-9\b]+$/,
                                        // pattern:/^([0-9)*$,
                                        min: 1
                                    })}
                                />
                                {errors.quantity && (
                                    <span className={styles["alert"]}>check invoer</span>

                                )}
                            </label>


                            {errorAddItem &&
                            <div className={styles["alert"]}>{messageAddItem}</div>
                            }

                            <button
                                type="submit"
                            >
                                Voeg toe!
                            </button>


                            <button
                                onClick={cancelAddItem}
                                type="text"
                            >
                                Cancel
                            </button>


                        </fieldset>
                    </form>
                    }


                </>
            </fieldset>

            <h2>{orderIndividual.ordername}</h2>
            <h3>status: {orderIndividual.status}</h3>

            {messageDeleteItem &&
            <h3>Item deleted!
            <div>Binnen enkele seconden terug naar customer bladzijde</div>
            </h3>

            }

            {errorMessageDeleteItem &&
            <h3>Er is iets misgegaan!!</h3>}

            <ul>
                {orderIndividual.items.map((item) => {
                    return <li key={item.id}>


                        <NavLink
                            to={
                                {
                                    pathname: `/customerOrderItem`,
                                    state: {
                                        item: item,
                                        status: orderIndividual.status

                                    }
                                }

                            }
                        >
                            <p>item naam:<span>{item.itemname}




                            </span>


                            </p>

                        </NavLink>


                        {/*<div>Naam: {item.itemname} </div>*/}
                        <div>Quantity: {item.quantity} </div>
                        <div>jobs: {item.jobsFromItem.length} </div>


                        <span>

    <div>
        {orderIndividual.status==='open'&&

    <button

        onClick={() => deleteItem(item.itemname)}
        type="text"
    >
        Delete Item
    </button>
        }
</div>


</span>
                    </li>
                })}
            </ul>


        </section>
    );
};

export default CustomerOrder;
