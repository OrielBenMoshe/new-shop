import React, { useState, useEffect } from "react";
import "./header.css";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  let location = useLocation();

  const [adminOrClient, setAdminOrClient] = useState();

  useEffect(() => {
    const toggle = location.pathname === "/" ? "/admin" : "/";

    setAdminOrClient(toggle);
  }, [location]);

  return (
    <header className="Header">
      <h1>ONLINE REACT STORE</h1>
      <Link to={adminOrClient}>
        <Button className="adminOrClientButton">
          {adminOrClient === "/admin" ? "Admin" : "Client"}
        </Button>
      </Link>
    </header>
  );
}
export default Header;
