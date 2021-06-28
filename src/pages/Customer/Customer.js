import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import {useLocation, useHistory, NavLink} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";
import styles from "./Customer.module.css";
import {useForm} from 'react-hook-form';


// import {OrderContext} from "../../components/context/OrderContext";


function Customer() {

    const {register, handleSubmit, formState: {errors}} = useForm();


    const [orders, setOrders] = useState([]);
    const [addOrderStatus, setAddOrderStatus] = useState(false);
    const [loadOrderState, setLoadOrderState] = useState(false);


    const [errorFetchData, setErrorFetchData] = useState(false);
    const [messageFetchData, setMessageFetchData] = useState("");


    const [errorAddOrder, setErrorAddOrder] = useState(false);
    const [messageAddOrder, setMessageAddOrder] = useState("");


    const [errorMessageDeleteOrder, setErrorMessageDeleteOrder] = useState(false);
    const [messageDeleteOrder, setMessageDeleteOrder] = useState(false);


    const {user} = useContext(AuthContext);

    const [customerPageUpdate, setCustomerUpdatePage] = useState(false);


    const jwtToken = localStorage.getItem('token');
    const history = useHistory();


    function getOrders() {
        console.log("getOrders")
        fetchData(jwtToken)
    }


    function addOrder() {
        setAddOrderStatus(true)
    }


    function cancelAddOrder() {
        setLoadOrderState(true);
        setAddOrderStatus(false)

    }


    async function deleteOrder(orderName) {


        console.log("deleteOrder", orderName)

        try {
            const response = await axios.delete(`http://localhost:8080/orders/delete/ordername/${orderName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                }
            })
            // setErrorMessageDeleteOrder(false)
            setMessageDeleteOrder(true);
            setTimeout(() => {
                setLoadOrderState(true)
                setMessageDeleteOrder(false);
                history.push("/customer")
            }, 2500);

            console.log("ORDER DELETED", orderName)

        } catch (error) {

            console.log("error bij deleten order")
            // setErrorMessageDeleteOrder(true)
            // setMessageDeleteOrder(false);
            console.error(error);

        }

    }


    useEffect(() => {


        fetchData(jwtToken)
        setLoadOrderState(false)
        setCustomerUpdatePage(false)


    }, [loadOrderState]);


    async function fetchData(jwtToken) {

        try {
            console.log("Customer Page")

            const response = await axios.get(`http://localhost:8080/orders/inlog`, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })

            console.log("response CustomerOrderItem", response)
            // ?maak een array waar alle orders in staan
            // const testArray= response.data.
            console.log(response.data.length)

            setOrders(response.data)


        } catch (e) {
            console.log("Er is iets fout gegaan bij het ophalen")

            setErrorFetchData(true);
            setMessageFetchData("Er is iets fout gegaan bij het ophalen")


        }

    }


    async function onSubmit(data) {
        console.log("CustomerOrder add:", data)
        const dataNewOrder = {

            ordername: data.ordername,
            description: data.description
        };

        console.log("dataNewOrder: ", dataNewOrder)

        try {
            setErrorAddOrder(false)
            setMessageAddOrder("")

            const response = await axios.post(`http://localhost:8080/orders/create`, dataNewOrder, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                }
            })

            setLoadOrderState(true);

            setAddOrderStatus(false);

        } catch (error) {
            // console.log("errorAddData: ",errorAddData)
            // console.log("STATUSCODE: ",errorAddData)
            console.log(error.response.status)
            console.log("foutje in addOrder")
            setErrorAddOrder(true);
            if (error.response.status === 401) {
                setMessageAddOrder("Order bestaat al!! (StatusCode 401)")

            }


        }


    }


    return (
        <section>
            <h3>Customer pagina {user.username}</h3>

            {/***************** BUTTONS *******************************/}
            <fieldset className={styles["listOrder-buttons"]}>


                <button onClick={addOrder}
                >
                    Voeg order toe
                </button>


                {messageDeleteOrder &&
                <h3>Item deleted!
                    <div>Binnen enkele seconden terug naar customer bladzijde</div>
                </h3>}


                {addOrderStatus &&
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className={styles["addOrder-container"]}>
                        <h3>Voeg nieuwe order toe</h3>


                        <label htmlFor="username-field">
                            Naam van de order:
                            <input
                                type="text"

                                placeholder="vb tekening nummer"
                                {...register("ordername", {required: true})}
                            />
                            {errors.ordername && (
                                <span className={styles["alert"]}>Vul order naam in</span>

                            )}
                        </label>


                        <label htmlFor="description">
                            Klant Omschrijving
                            <textarea
                                placeholder="Optioneel"

                                {...register("description",)}

                            />

                        </label>


                        {errorAddOrder &&
                        <div className={styles["alert"]}>{messageAddOrder}</div>
                        }

                        <div>
                            <button
                                type="submit"
                                className={styles["submit-button"]}
                            >
                                Voeg toe!
                            </button>


                            <button
                                onClick={cancelAddOrder}
                                className={styles["submit-button"]}
                            >
                                Cancel
                            </button>
                        </div>


                    </fieldset>
                </form>
                }


            </fieldset>
            {/************************************************/}


            {/***************** LIST of ORDERS ************************/}
            <fieldset className={styles["listOrder-container"]}>

                <ul>
                    {orders.map((order) => {
                        return <li key={order.id}>
                            <NavLink
                                to={
                                    {
                                        pathname: `/customerOrder`,
                                        state: {
                                            order: order,
                                            // setCustomerUpdatePage:{setCustomerUpdatePage}
                                        }
                                    }

                                }
                            >
                                <p>ordernaam:<span>{order.ordername}</span></p>

                            </NavLink>
                            <p>Status:{order.status}</p>

                            <p>Omschrijving:<span>{order.description}</span></p>

                            {order.status === 'open' &&
                            <div>
                                <button

                                    onClick={() => deleteOrder(order.ordername)}
                                    type="text"
                                >
                                    Delete order
                                </button>

                            </div>
                            }
                            {/* **************************************************************** */}
                            {/*per order mappen over de items (altijd minimaal 1 aanwezig*/}
                            <ul>
                                {order.items.map((item) => {
                                    return <li key={item.id}>
                                        <span>itemname: </span>{item.itemname}<span>    </span><span>aantal:</span>{item.quantity}
                                    </li>
                                })}
                            </ul>
                            {/* **************************************************************** */}
                        </li>
                    })}

                </ul>

            </fieldset>
            {/************************************************/}


        </section>


    );
}

export default Customer;