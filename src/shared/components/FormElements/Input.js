import React, {useReducer, useEffect} from 'react'
import './Input.css'
import {validate} from '../../util/validators';

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return{
                // To not lose the data on the old state, 
                // we will create a copy of them. And we will do that
                // using the spread operator.
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators) // ---------------
                // ---------> If (action.type === 'CHANGE') 
                //-> the state will change to the one we define as return in case of 'CHANGE'
            };
            case 'TOUCH': {
                return {
                    ...state,
                    isTouched: true
                }
            }
        default:
            return state;
    }
}
//const Input = ({id, element, rows, label, type, placeholder, errorText, validators, contain, onInput, valid}) => {
const Input = props => {
    // const [enteredValue, setEnteredValue] = useState('');
    // const [isValid, setIsValid] = useState(false);
    const [inputState, dispatch] = useReducer(inputReducer, 
                                            {
                                                // The following is very important to work with 
                                                // initial values and support this as well
                                                value: props.initialValue || '', 
                                                isValid: props.initialIsValid || false, 
                                                isTouched: false
                                            });
    const { value, isValid } = inputState
    const {id, onInput} = props
    
    // We are going to use useEffect to run some logic whenever the input value
    // or validity changes
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])
    
    const changeHandler = event => {
        dispatch({
            type: 'CHANGE', 
            val: event.target.value,
            validators: props.validators
        })
    };
    
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }
    const elements = props.element === 'input' ? (<input 
                                            id={props.id} 
                                            type={props.type} 
                                            placeholder={props.placeholder} 
                                            onBlur={touchHandler}
                                            onChange = {changeHandler}
                                            value={inputState.value} />) : (
                                            <textarea 
                                            id={props.id}
                                            rows={props.rows || 3} 
                                            onBlur={touchHandler}
                                            onChange = {changeHandler} 
                                            value={inputState.value}
                                            />);
    // In the code : ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}
    // --> if inputState.isValid is not valid and inputState isTouched, then the className
    // has the property form-control--invalid
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {elements}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}
export default Input
