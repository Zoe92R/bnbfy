import React from 'react';
import { Link } from 'react-router-dom';

export function UserMenu({ toggleProfile, logout, loggedInUser }) {
  return (

    <div className="hamburger" onClick={() => toggleProfile()}>
      {loggedInUser && <div className="user-link"><Link to="/user/order" className="clean-list">Profile</Link></div>}
      {!loggedInUser && <div className="user-link"><Link to="/login" className="clean-list">Login</Link></div>}
      {loggedInUser && <div className="user-link" onClick={() => logout()}><Link to=''>Logout</Link></div>}
    </div>
  );
}
