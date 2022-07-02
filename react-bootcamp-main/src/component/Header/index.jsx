import React from "react";
import { Col, Row } from "reactstrap";
import './styles.css'

const Header = () => {

  const homeCatalog = () => {
    sessionStorage.removeItem('access_token');
    window.location = '/'
  }

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    window.location = '/login'
  }

  const adminDashboard = () => {
    sessionStorage.removeItem('access_token');
    window.location = '/*'
  }

  return (
    <div className="header">
      <Row>
        <Col md={9}>
          <h3> Product Catalog</h3>
        </Col>
        <Col md={1}>
          <span className="home" onClick={() => homeCatalog()} >  Home </span>
        </Col>
        <Col md={1}>
          <span className="admin" onClick={() => adminDashboard()} >  Admin </span>
        </Col>
        <Col md={1}>
          <span className="logout" onClick={() => handleLogout()} >  Logout </span>
        </Col>
      </Row>
    </div>
  )
}

export default Header;