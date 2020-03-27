import React from "react"; 
import {useState,useEffect} from "react"; 
import * as yup from "yup"; 
import Axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().min(2, "name must be longer than 2 characters").required(),
    size: yup.string().required("Please Select a Size"), 
    pepperoni: yup.string(), 
    canadianbacon: yup.string(), 
    jalapenos: yup.string(), 
    sausage: yup.string(), 
    cheese: yup.string(),
    instructions: yup.string(),
})

function PizzaForm() {

    // create state for form
    const [formState, setFormState] = useState({
        name: '',
        size: '', 
        pepperoni: '', 
        canadianbacon: '', 
        jalapenos: '', 
        sausage: '', 
        cheese: '',
        instructions:'', 
    }); 

    // create state for errors 
    const [errors, setErrors] = useState({
        name: '',
        size: '', 
        pepperoni: '', 
        canadianbacon: '', 
        jalapenos: '', 
        sausage: '', 
        cheese: '',
        instructions:'', 
    }); 

    // set state for button 
    const [disabledButton, setDisabledButton] = useState(true)

    //set state to set our post request and be able to see it 
    const [thePizza, setThePizza] = useState([]); 

    // set useEffect for submit button 

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setDisabledButton(!valid); 
        })
    }, [formState])

    const validateChange = event => {
        yup 
        .reach(formSchema,event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({
                ...errors, 
                [event.target.name]: ''
            }); 
        })
        .catch(err => {
            setErrors({
                ...errors, 
                [event.target.name]: err.errors[0]
            }); 
        }); 
    }// end of validate change function 
    // form submit function

    const formSubmit = event => {
        event.preventDefault(); 
        Axios
        .post('https://reqres.in/api/users', formState)
        .then(res => {
            setThePizza(res.data); 
            console.log("successful order", thePizza); 

            setFormState({
                name: '',
                size: '', 
                pepperoni: '', 
                canadianbacon: '', 
                jalapenos: '', 
                sausage: '', 
                cheese: '',
                instructions:'',
            }); 
        })
        .catch(err => {
            console.log(err.res); 
        }); 

    }

    // input change function 

    const inputChange = event => {
        event.persist(); 
        const newPizza = {
            ...formState,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }; 
        validateChange(event); 
        setFormState(newPizza); 
    }
    


    return (
        <div>
            <h1>The Pizza Maker</h1><br/>

            <div>
                <h2>Create Your Pizza!</h2><br/>

                <form onSubmit={formSubmit}>

                    <label htmlFor="name">
                        Name:
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}/>
                        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                    </label><br/>

                    <label htmlFor="size">
                        Please Select a Pizza Size:
                        <select id="size" name="size" onChange={inputChange}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </label><br/><br/>

                    <p>Select Toppings (if no toppings are desired, please select cheese) </p>
                    <label htmlFor="toppings">
                       
                        <input
                        type="checkbox"
                        name="pepperoni"
                        checked={formState.pepperoni}
                        onChange={inputChange}/>Pepperoni
                        <input
                        type="checkbox"
                        name="canadianbacon"
                        checked={formState.canadianbacon}
                        onChange={inputChange}
                        />Canadian Bacon
                        <input
                        type="checkbox"
                        name="jalapenos"
                        checked={formState.jalapenos}
                        onChange={inputChange}
                        />Jalapenos
                        <input
                        type="checkbox"
                        name="sausage"
                        checked={formState.sausage}
                        onChange={inputChange}
                        />Sausage
                        <input
                        type="checkbox"
                        name="cheese"
                        checked={formState.cheese}
                        onChange={inputChange}
                        />Cheese
                    </label><br/><br/>
                    {/* <label>
                        <input/>
                    </label>
                    <label>
                        <input/>
                    </label>
                    <label>
                        <input/>
                    </label> */}

                    <label htmlFor="instructions">
                        <textarea
                        id="instructions"
                        name="instructions"
                        value={formState.instructions}
                        onChange={inputChange}
                        />
                    </label><br/><br/>

                    <pre>{JSON.stringify(thePizza, null, 2)}</pre>

                    <button data-cy="submit" disabled={disabledButton}>Place Order!</button>


                </form>
            </div>
        </div>
    )
}

export default PizzaForm