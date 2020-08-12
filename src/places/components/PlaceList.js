import React from 'react'
import './PlaceList.css'
import PlaceItem from './PlaceItem'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'

const PlaceList = ({items}) => {
   if(items.length === 0) {
       return (
        <div className="place-list center">
            <Card>
                <h2>No places found. Create one?</h2>
                <Button to="/places/new">Share Place</Button>
            </Card>
        </div>
        )
   }
   return (
        <ul className="place-list">
            {items.map(({id, imageUrl, title, description, address, creator, location}) => <PlaceItem 
                                    key={id} 
                                    id={id} 
                                    image={imageUrl} 
                                    title={title} 
                                    description={description} 
                                    address={address} 
                                    creatorId={creator}
                                    coordinates={location}
                />)}
        </ul>
    )
}

export default PlaceList
