// import React, {createContext, useEffect, useState} from 'react';
// import {useHistory} from 'react-router-dom';
//
//
// export const OrderContext = createContext({});
//
// function OrderContextProvider({children}) {
//     const history = useHistory();
//
//
//
//
//     // state voor de gebruikersdata, object voorgebruikersdata
//     const [orderState, setOrderState] = useState({
//
//         status: 'pending'
//
//     });
//
//
//     const data = {
//
//         ...orderState,
//
//     }
//
//
//     //******************************************************************************
//
//
//
//     return (
//
//         <OrderContextProvider value={data}>
//
//             {orderState.status === 'pending'
//                 ? children
//                 : <p>Loading...</p>
//             }
//         </OrderContextProvider>
//     );
//
// }
//
// export default OrderContextProvider;