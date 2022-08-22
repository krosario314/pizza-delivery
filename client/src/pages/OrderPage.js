import React, { useState } from "react";
import "./OrderPage.css"
import { AddPizza } from "./AddPizza";
import { ADD_PIZZA } from '../utils/mutations';
import { useMutation } from '@apollo/client';


export const OrderPage = () => {
    const [formState, setFormState] = useState({ size: '', crust: '', meats: '', veggies: '' });
    const [hasOrdered, setHasOrdered] = useState(false);
    const [pizzaOrders, setPizzaOrders] = useState([]);
    const [orderInfo, setOrderInfo] = useState({});
    const [addPizzaToOrder] = useMutation(ADD_PIZZA);

    const addPizza = async (event) => {
        console.log(formState);
        event.preventDefault();
        setHasOrdered(true);

        const mutationResponse = await addPizzaToOrder({
            variables: {
                size: formState.size,
                crust: formState.crust,
                meats: formState.meats,
                veggies: formState.veggies,
            },
        });
       
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };


    const orderPage = (

        <div id="order-page">

            <div id="pizza-div-order">

                <div id="order-form">  </div>
                <div id="order-cards">

                    <span id="size">
                        <h2>Size</h2>
                        <h4>How hungry are you?</h4>
                        <input type="radio" id="small" name="size" value="small" onChange={handleChange} />
                        <label for="small"> Small: $10</label><br></br><br></br>
                        <input type="radio" id="medium" name="size" value="medium" onChange={handleChange} />
                        <label for="medium"> Medium: $15</label><br></br><br></br>
                        <input type="radio" id="large" name="size" value="large" onChange={handleChange} />
                        <label for="large"> Large: $20</label>
                    </span>

                    <span id="crust">
                        <h2>Crust</h2>
                        <h4>What'll it be?</h4>
                        <input type="radio" id="hand-tossed" name="crust" value="hand-tossed" onChange={handleChange} />
                        <label for="hand-tossed"> Hand-Tossed</label><br></br><br></br>
                        <input type="radio" id="deep-dish" name="crust" value="deep-dish" onChange={handleChange} />
                        <label for="deep-dish"> Deep-Dish</label><br></br><br></br>
                        <input type="radio" id="thin-crust" name="crust" value="thin-crust" onChange={handleChange} />
                        <label for="thin-crust"> Thin-Crust</label>
                    </span>

                    <span id="meats">
                        <h2>Meats</h2>
                        <h4>MMMeat-zza!</h4>
                        <div><input type="checkbox" name="meats" id="meats-pepperoni" value="pepperoni" onChange={handleChange}/>
                            <label for="meats-pepperoni"> Pepperoni</label></div><br />
                        <div><input type="checkbox" name="meats" id="meats-sausage" value="sausage" onChange={handleChange}/>
                            <label for="meats-sausage"> Sausage</label></div><br />
                        <div><input type="checkbox" name="meats" id="meats-anchovies" value="anchovies" onChange={handleChange}/>
                            <label for="meats-anchovies"> Anchovies</label></div><br />
                        <div><input type="checkbox" name="meats" id="meats-bacon" value="bacon" onChange={handleChange}/>
                            <label for="meats-bacon"> Bacon</label></div>
                    </span>


                    <span id="veggies">
                        <h2>Veggies</h2>
                        <h4>Turtle Power!</h4>
                        <div><input type="checkbox" name="veggies" id="veggies-onions" value="onions" onChange={handleChange}/> 
                        <label for="veggies-onions"> Onions</label></div><br />
                        <div><input type="checkbox" name="veggies" id="veggies-olives" value="olives" onChange={handleChange}/> 
                        <label for="veggies-olives"> Olives</label></div><br />
                        <div><input type="checkbox" name="veggies" id="veggies-peppers" value="peppers" onChange={handleChange}/> 
                        <label for="veggies-peppers"> Green Peppers</label></div><br />
                        <div><input type="checkbox" name="veggies" id="veggies-mushrooms" value="mushrooms" onChange={handleChange}/> 
                        <label for="veggies-mushrooms"> Mushrooms</label></div>
                    </span>



                </div>

            </div>


            <div id="order-button"><button id="add-pizza" onClick={addPizza}>Add Pizza!</button></div>
        </div>)
    return (
        <>
            {hasOrdered ? <AddPizza orderAgain={setHasOrdered} /> : orderPage}
        </>

    )
}