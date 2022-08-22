import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { QUERY_PIZZAS } from "../utils/queries";
import { DELETE_PIZZA } from "../utils/mutations";
// import { DELETE_ORDER } from '../utils/mutations';
import "./EmployeePage.css"



export default function Cart() {
    console.log("EmployeePage");
    const { loading:loadingOrders, data:orderData } = useQuery(QUERY_PIZZAS);
    const [ deletePizza ]  = useMutation(DELETE_PIZZA);
    let pizzaOrders;
    const deletePizzaFunction = async (event) => {

        console.log(event.target.id)
        const _id = event.target.id;
        await deletePizza({
            variables: {id: event.target.id}
        })
        window.location.reload();
    }
    //orderData.orders (use this syntax to access data in orderData)
    // const orders = data?.orders || [];
    
    if (loadingOrders) {
        return <div>Loading...</div>;
    }

    
    return (

        <div className = "fade-in">
        <div id="pizza-div-employee-page">
        <div id="order-form">  </div>
            <div id = "order-cards">
            {orderData.pizzas.map((pizza) => (
                
               <div id="employee-order-card">
               <h4>{pizza.size}</h4>
               <h4>{pizza.crust}</h4>
               <h4>{pizza.meats}</h4>
               
               
               <button id={pizza._id} onClick = {deletePizzaFunction}>Remove Pizza</button>


               {/* <div id="employee-order-btn"><button id="add-pizza">Complete Order</button></div> */}
           </div>
            ))}</div>
            {console.log(orderData.pizzas)}
          

            

        </div>
      

        </div>
        // <>
           
        // </>
    )
}

