import { Container, Row, Col } from 'react-bootstrap';
import { Church, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto">
      <Container className="py-5">
        <Row className="g-4">
          {/* About Section */}
          <Col md={6} lg={3}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Church size={32} />
              <h5 className="mb-0">Hallelujah Church</h5>
            </div>
            <p className="text-white-50">
              A place where faith comes alive and community thrives. Join us in worship and fellowship.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={6} lg={3}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/events" className="text-white-50 text-decoration-none hover-link">
                  Events
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sermons" className="text-white-50 text-decoration-none hover-link">
                  Sermons
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/ministries" className="text-white-50 text-decoration-none hover-link">
                  Ministries
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donations" className="text-white-50 text-decoration-none hover-link">
                  Give
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none hover-link">
                  About Us
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={6} lg={3}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-white-50">Nairobi, Kenya</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-white-50">+254 700 000 000</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-white-50">info@hallelujahchurch.org</span>
              </li>
            </ul>
          </Col>

          {/* Service Times & Social */}
          <Col md={6} lg={3}>
            <h5 className="mb-3">Service Times</h5>
            <p className="text-white-50 mb-3">
              <strong>Sundays</strong><br />
              9:00 AM - First Service<br />
              11:00 AM - Second Service
            </p>
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 hover-link" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white-50 hover-link" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white-50 hover-link" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white-50 hover-link" aria-label="YouTube">
                <Youtube size={24} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <hr className="my-4 border-secondary" />
        <Row>
          <Col className="text-center text-white-50">
            <p className="mb-0">
              &copy; {currentYear} Hallelujah Church. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
