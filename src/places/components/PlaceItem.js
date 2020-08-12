import React, {useState, useContext} from 'react'
import './PlaceItem.css'
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import {AuthContext} from '../../shared/Context/auth-context';

const PlaceItem = ({image, title, address, description, id, coordinates}) => {
    
    const auth = useContext(AuthContext);
    
    const [showMap, setShwoMap] = useState(false);
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const openMapHandler = () => setShwoMap(true);
    
    const closeMapHandler = () => setShwoMap(false);
    
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }
    
    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }
    
    const confirmDeleteHandler = () => {
        setShowConfirmModal(false)
        console.log('DELETING...')
    }
    
    return (
        <React.Fragment>
        <Modal  
            show={showMap} 
            onCancel={closeMapHandler} 
            header={address} 
            contentClass="place-item__modal-content" 
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className="map-container">
                <Map center={coordinates} zoom={16}/>
            </div>
        </Modal>
        <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
            <p>
                Do you want to proceed and delete this place? please note that 
                it can't be undone thereafter       
            </p>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={image} alt={title}/>
                </div>
                <div className="place-item__info">
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>View on Map</Button>
                    {
                        auth.isLoggedIn &&  (
                        <Button to={`/places/${id}`}>Edit</Button>
                        )
                    }
                    {
                        auth.isLoggedIn &&  (
                        <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                        )
                    }                   
                </div>
            </Card>
        </li>
        </React.Fragment>
    )
}

export default PlaceItem
