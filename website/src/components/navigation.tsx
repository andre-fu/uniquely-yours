import React from 'react';
import { Navbar, NavbarBrandProps, NavbarBrand, Nav, Collapse, NavItem, NavLink, NavbarToggler } from 'reactstrap';


const Navigation = () => {
  const [toggle, setToggle] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Navbar color="gray" light expand="md">
    <NavbarBrand href="/">Uniquely Yours</NavbarBrand> 
    <NavbarToggler onClick={() => setToggle(true)} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="https://andrefu.ca">Andre Fu</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  );
}

export default Navigation;