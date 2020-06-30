import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from '../payments/payments';
const Header = ({ auth }) => {
  const URL = 'http://localhost:5000';
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>Credits: {auth.credits}</li>
            <li>
              <a href={`${URL}/auth/google`}>Login with Google</a>
            </li>
          </>
        );
      default:
        return (
          <li>
            <a href={`${URL}/api/logout`}>LogOut</a>
          </li>
        );
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? '/surveys' : '/'} className="brand-logo">
          Emaily
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, null)(Header);
