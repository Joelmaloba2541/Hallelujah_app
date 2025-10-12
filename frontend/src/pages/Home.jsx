import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Modal, Form } from 'react-bootstrap';
import { Calendar, BookOpen, Users, Heart, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents, getSermons, getActiveAnnouncements } from '../services/api';
import './Home.css';

function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentSermons, setRecentSermons] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, sermonsRes, announcementsRes] = await Promise.all([
        getUpcomingEvents(),
        getSermons(),
        getActiveAnnouncements(),
      ]);
      
      setUpcomingEvents(eventsRes.data.slice(0, 3));
      setRecentSermons(sermonsRes.data.results?.slice(0, 3) || sermonsRes.data.slice(0, 3));
      setAnnouncements(announcementsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background shapes */}
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <Container style={{ position: 'relative', zIndex: 2 }} className="text-center">
          <h1 className="hero-title" style={{ 
            color: '#ffffff',
            textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            animation: 'fadeInDown 1s ease-out'
          }}>
            Welcome to Hallelujah Church
          </h1>
          <p className="hero-subtitle" style={{ 
            color: '#ffffff',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            marginBottom: '2rem',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            A place where faith comes alive and community thrives
          </p>
          
          {/* Login/Signup Buttons */}
          <div className="d-flex gap-3 justify-content-center mb-5" style={{
            animation: 'fadeInUp 1s ease-out 0.4s both'
          }}>
            <Button 
              size="lg"
              onClick={() => setShowLoginModal(true)}
              className="d-flex align-items-center gap-2 btn-hero"
              style={{
                backgroundColor: '#ffffff',
                color: '#6366f1',
                border: 'none',
                fontWeight: '600',
                padding: '0.75rem 2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <LogIn size={20} />
              Login
            </Button>
            <Button 
              size="lg"
              onClick={() => setShowSignupModal(true)}
              className="d-flex align-items-center gap-2 btn-hero-outline"
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                fontWeight: '600',
                padding: '0.75rem 2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <UserPlus size={20} />
              Sign Up
            </Button>
          </div>

          <Row className="mt-4" style={{
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}>
            <Col md={4} className="mb-3">
              <div className="hero-stat" style={{
                animation: 'scaleIn 0.6s ease-out 0.8s both'
              }}>
                <h3 className="h4" style={{ color: '#ffffff', fontWeight: '600' }}>Join Us</h3>
                <p style={{ color: '#ffffff', opacity: 0.95, margin: 0 }}>Sundays 9 AM & 11 AM</p>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="hero-stat" style={{
                animation: 'scaleIn 0.6s ease-out 1s both'
              }}>
                <h3 className="h4" style={{ color: '#ffffff', fontWeight: '600' }}>Location</h3>
                <p style={{ color: '#ffffff', opacity: 0.95, margin: 0 }}>Nairobi, Kenya</p>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="hero-stat" style={{
                animation: 'scaleIn 0.6s ease-out 1.2s both'
              }}>
                <h3 className="h4" style={{ color: '#ffffff', fontWeight: '600' }}>Community</h3>
                <p style={{ color: '#ffffff', opacity: 0.95, margin: 0 }}>Growing Together</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="bg-warning bg-opacity-10 py-4">
          <Container>
            <h2 className="text-center mb-4">Latest Announcements</h2>
            {announcements.map((announcement) => (
              <Alert key={announcement.id} variant="warning" className="border-start border-warning border-4">
                <Alert.Heading>{announcement.title}</Alert.Heading>
                <p>{announcement.content}</p>
              </Alert>
            ))}
          </Container>
        </div>
      )}

      {/* Quick Links */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card 
              as={Link} 
              to="/events" 
              className="h-100 text-decoration-none border-0 shadow-sm hover-lift quick-link-card"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
            >
              <Card.Body className="text-center">
                <Calendar size={48} className="text-primary mb-3 icon-bounce" />
                <Card.Title>Upcoming Events</Card.Title>
                <Card.Text className="text-muted">
                  Join us for worship, fellowship, and community events
                </Card.Text>
                <div className="text-primary fw-semibold mt-3">
                  View Events <ArrowRight size={16} className="ms-1" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card 
              as={Link} 
              to="/sermons" 
              className="h-100 text-decoration-none border-0 shadow-sm hover-lift quick-link-card"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
            >
              <Card.Body className="text-center">
                <BookOpen size={48} className="text-primary mb-3 icon-bounce" />
                <Card.Title>Recent Sermons</Card.Title>
                <Card.Text className="text-muted">
                  Watch and listen to inspiring messages from our pastors
                </Card.Text>
                <div className="text-primary fw-semibold mt-3">
                  Browse Sermons <ArrowRight size={16} className="ms-1" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card 
              as={Link} 
              to="/ministries" 
              className="h-100 text-decoration-none border-0 shadow-sm hover-lift quick-link-card"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
            >
              <Card.Body className="text-center">
                <Users size={48} className="text-primary mb-3 icon-bounce" />
                <Card.Title>Get Involved</Card.Title>
                <Card.Text className="text-muted">
                  Discover ministries and find your place to serve
                </Card.Text>
                <div className="text-primary fw-semibold mt-3">
                  Explore Ministries <ArrowRight size={16} className="ms-1" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card 
              as={Link} 
              to="/prayer-requests" 
              className="h-100 text-decoration-none border-0 shadow-sm hover-lift quick-link-card"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
            >
              <Card.Body className="text-center">
                <Heart size={48} className="text-primary mb-3 icon-bounce" />
                <Card.Title>Prayer Requests</Card.Title>
                <Card.Text className="text-muted">
                  Share your prayer needs with our community
                </Card.Text>
                <div className="text-primary fw-semibold mt-3">
                  Submit Request <ArrowRight size={16} className="ms-1" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Upcoming Events Preview */}
      {upcomingEvents.length > 0 && (
        <div className="bg-light py-5">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Upcoming Events</h2>
              <Button as={Link} to="/events" variant="primary">View All Events</Button>
            </div>
            <Row className="g-4">
              {upcomingEvents.map((event) => (
                <Col key={event.id} md={6} lg={4}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <Badge bg="primary" className="mb-2 text-capitalize">
                        {event.event_type.replace('_', ' ')}
                      </Badge>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text className="text-muted small">
                        {new Date(event.start_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Card.Text>
                      <Card.Text className="text-primary fw-semibold">{event.location}</Card.Text>
                      <Card.Text>{event.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      {/* Recent Sermons Preview */}
      {recentSermons.length > 0 && (
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Recent Sermons</h2>
            <Button as={Link} to="/sermons" variant="primary">View All Sermons</Button>
          </div>
          <Row className="g-4">
            {recentSermons.map((sermon) => (
              <Col key={sermon.id} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title>{sermon.title}</Card.Title>
                    <Card.Text className="text-primary fw-semibold">By {sermon.preacher}</Card.Text>
                    <Card.Text className="text-secondary fst-italic">{sermon.scripture_reference}</Card.Text>
                    <Card.Text className="text-muted small">
                      {new Date(sermon.date_preached).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>{sermon.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <LogIn size={24} />
            Login to Your Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
              >
                Sign up here
              </Button>
            </small>
          </div>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <UserPlus size={24} />
            Create New Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Create password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="I agree to the terms and conditions" 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
              >
                Login here
              </Button>
            </small>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
