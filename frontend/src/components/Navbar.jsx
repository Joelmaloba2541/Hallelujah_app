import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Church, Calendar, BookOpen, Users, Heart, DollarSign, Info, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Church },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/sermons', label: 'Sermons', icon: BookOpen },
    { path: '/ministries', label: 'Ministries', icon: Users },
    { path: '/donations', label: 'Give', icon: DollarSign },
    { path: '/prayer-requests', label: 'Prayer', icon: Heart },
    { path: '/about', label: 'About', icon: Info },
  ];

  const handleNavClick = () => {
    setExpanded(false);
  };

  const handleLogout = () => {
    logout();
    handleNavClick();
  };

  return (
    <BSNavbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      sticky="top" 
      expanded={expanded}
      onToggle={setExpanded}
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
      }}
    >
      <Container>
        <BSNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center gap-2"
          onClick={handleNavClick}
        >
          <Church size={32} />
          <span className="fw-bold">Hallelujah Church</span>
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  active={location.pathname === item.path}
                  className="d-flex align-items-center gap-2"
                  onClick={handleNavClick}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Nav.Link>
              );
            })}
            
            {isAuthenticated && user ? (
              <Dropdown align="end" className="ms-lg-3">
                <Dropdown.Toggle 
                  variant="light" 
                  id="user-dropdown"
                  className="d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff'
                  }}
                >
                  <User size={18} />
                  <span>{user.name || user.email}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <small className="text-muted">{user.email}</small>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
