import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Modal, Form, Toast, ToastContainer } from 'react-bootstrap';
import { Calendar, BookOpen, Users, Heart, ArrowRight, LogIn, UserPlus, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUpcomingEvents, getSermons, getActiveAnnouncements } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentSermons, setRecentSermons] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const result = await login(loginData);
    
    if (result.success) {
      setShowLoginModal(false);
      setSuccessMessage('Login successful! Welcome back.');
      setShowSuccessToast(true);
      setLoginData({ email: '', password: '' });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/events');
      }, 1500);
    } else {
      setErrors({ login: result.error });
    }
    
    setIsSubmitting(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!signupData.name) newErrors.name = 'Name is required';
    if (!signupData.email) newErrors.email = 'Email is required';
    if (!signupData.password) newErrors.password = 'Password is required';
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (signupData.password && signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await signup({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      password: signupData.password
    });
    
    if (result.success) {
      setShowSignupModal(false);
      setSuccessMessage('Account created successfully! Welcome to Hallelujah Church.');
      setShowSuccessToast(true);
      setSignupData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } else {
      setErrors({ signup: result.error });
    }
    
    setIsSubmitting(false);
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
          
          {/* Login/Signup Buttons - Only show if not authenticated */}
          {!isAuthenticated && (
            <div className="d-flex gap-3 justify-content-center mb-5" style={{
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}>
              <Button 
                size="lg"
                onClick={() => setShowLoginModal(true)}
                className="d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  fontWeight: '700',
                  padding: '0.85rem 2.5rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }}
              >
                <LogIn size={22} />
                Login
              </Button>
              <Button 
                size="lg"
                onClick={() => setShowSignupModal(true)}
                className="d-flex align-items-center gap-2"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  fontWeight: '700',
                  padding: '0.85rem 2.5rem',
                  fontSize: '1.1rem',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }}
              >
                <UserPlus size={22} />
                Sign Up
              </Button>
            </div>
          )}

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
          {errors.login && (
            <Alert variant="danger" dismissible onClose={() => setErrors({})}>
              {errors.login}
            </Alert>
          )}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
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
                  setErrors({});
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
          {errors.signup && (
            <Alert variant="danger" dismissible onClose={() => setErrors({})}>
              {errors.signup}
            </Alert>
          )}
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your full name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Optional)</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Enter phone number"
                value={signupData.phone}
                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Create password (min 6 characters)"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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
                  setErrors({});
                }}
              >
                Login here
              </Button>
            </small>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showSuccessToast} 
          onClose={() => setShowSuccessToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <CheckCircle size={20} className="text-success me-2" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {successMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Home;
