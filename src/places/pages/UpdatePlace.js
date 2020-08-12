import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators' 
import './PlaceForm.css'
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire state building',
        description: 'One of the best place in Canada',
        imageUrl: 'https://source.unsplash.com/random',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Manhattan Tours',
        description: 'One of the best place in USA',
        imageUrl: 'https://source.unsplash.com/random',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UpdatePlace = () => {
    // the placeId is from @App.js <Route path='/places/:placeId'>
    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true);


    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
        
    }, false)

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    useEffect(() => {
        if(identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setIsLoading(false)
    }, [setFormData, identifiedPlace]);


    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place</h2>
                </Card>
            </div>
        )
    }

    if(isLoading) {
            return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }
    // We want to render a form which we initialize with values from
    // that place.
    return (
       // The input we have here will be just for the tittle and the 
       // description because these shoud be the two pieces of information
       // that should be changeable, editable by users after a place
       // was created. 

       <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
                id="title" 
                element="input" 
                type="text" 
                label="Title" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a valid title"
                onInput={inputHandler}
                //initialValue and initialValid are used just to initialize the value
                initialValue={formState.inputs.title.value}
                initialIsValid={formState.inputs.title.isValid}
            />
             <Input 
                id="description" 
                element="textarea" 
                label="Description" 
                validators={[VALIDATOR_MINLENGTH(5)]} 
                errorText="Please enter a valid description (min 5 characters)"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialIsValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
       </form>
    )
}
export default UpdatePlace
