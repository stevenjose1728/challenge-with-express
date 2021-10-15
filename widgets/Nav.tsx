import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';

function Nav() {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({
            type: 'REMOVE_USER'
        })
    }
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <p className="text-white">
                    {user?.name}
                </p>
                <NavLink href="/" exact className="nav-item nav-link">
                    <p>Home</p>
                </NavLink>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}

export { Nav };