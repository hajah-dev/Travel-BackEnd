import React from 'react'
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { VALIDATOR_MINLENGTH  } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';

const NewPlace = () => {
        const [formState, inputHandler] = useForm({
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    )
    // const [formState, dispatch] = useReducer(formReducer, {
        // isValid will stores the information whether the overall form is valid
        // inputs is a nested object that stores information about the validity
        // of the individual inputs. 
        // The following is the initial state and this is the state that we need to 
        // update inside the formReducer based on the different actions we might
        // receive
    //     inputs:{
    //         title: {
    //             value: '',
    //             isValid: false
    //         },
    //         description: {
    //             value: '',
    //             isValid: false
    //         }
    //     },
    //     isValid: false
    // });
    // const inputHandler = useCallback((id, value, isValid) => {
    //     dispatch({
    //         type: 'INPUT_CHANGE', 
    //         value: value, 
    //         isValid: isValid, 
    //         inputId: id});
    // }, []);
   // To handle the input submission, we need a new function
   
   const placeSubmitHandler = event => {
       event.preventDefault();
       console.log(formState.inputs);
   }
   
   
    return (
        <form className="place-form" onSubmit = {placeSubmitHandler}>
            <Input 
                id='title'
                element="input" 
                type="text" 
                label="Title" 
                // With the VALIDATOR_REQUIRE, we are passing all the information
                // to the Input element that it needs to know that for this
                // Input, we want to make sure that the value the user enters is not
                // empty because that is what we check for in @validators.js file                
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />
            <Input 
                id='description'
                element="textarea"  
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Input 
                id='address'
                element="input"  
                label="Address" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={inputHandler}
            />  
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>          
        </form>
    )
}
export default NewPlace
