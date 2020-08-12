import React from 'react'
import PlaceList from '../components/PlaceList';
import {useParams} from 'react-router-dom';

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
const UserPlaces = () => {
   const userId = useParams().userId; // the userId is coming from the @App.js  <Route path='/:userId/places' exact>
   const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
   return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
