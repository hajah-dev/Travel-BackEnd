import React, {useState} from 'react';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import {Link} from 'react-router-dom';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';


const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState (false);
    
    const openDrawerHanlder = () => {
        setDrawerIsOpen(true);
    }
    

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }
    
    return (
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
        {/** && means that if the condition in left is true, the code 
         in right will be executed */}
            
                <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks />
                    </nav>
                </SideDrawer>
                
            <MainHeader>
            {/** Now we need to make sure that when we click the button
             the drawer is shown */}
                <button className="main-navigation__menu-btn" onClick={openDrawerHanlder}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your place</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation
