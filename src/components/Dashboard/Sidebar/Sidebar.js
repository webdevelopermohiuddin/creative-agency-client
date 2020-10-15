import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../../images/logos/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faCommentDots, faPlus, faShoppingCart, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://immense-island-63375.herokuapp.com/adminCheck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data);
            })
    }, [])
    return (
        <div className="sidebar d-flex flex-column py-5 px-4" style={{ height: "100vh" }}>
            <Link to="/">
                <img src={logo} className="mx-auto d-block logoSize" alt="logo" />
            </Link>
            <ul className="list-unstyled mt-5">
                { !isAdmin && <div>
                <li>
                    <Link to="/order" className="nav-link text-dark">
                        <FontAwesomeIcon icon={faShoppingCart} /><span>Order</span>
                    </Link>
                </li>
                <li>
                    <Link to="/serviceList" className="nav-link text-dark">
                        <FontAwesomeIcon icon={faClipboardList} /> <span>Service list</span>
                    </Link>
                </li>
                <li>
                    <Link to="/review" className="nav-link text-dark">
                        <FontAwesomeIcon icon={faCommentDots} /><span>Review</span>
                    </Link>
                </li>
                </div>
                }
                {
                    isAdmin && <div>
                        <li>
                            <Link to="/allServiceList" className="nav-link text-dark">
                                <FontAwesomeIcon icon={faClipboardList} /> <span>All Services List</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/addService" className="nav-link text-dark">
                                <FontAwesomeIcon icon={faPlus} /><span>Add Service</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/makeAdmin" className="nav-link text-dark">
                                <FontAwesomeIcon icon={faUserPlus} /><span>Make Admin</span>
                            </Link>
                        </li>
                    </div>
                }

            </ul>
        </div>
    );
};

export default Sidebar;