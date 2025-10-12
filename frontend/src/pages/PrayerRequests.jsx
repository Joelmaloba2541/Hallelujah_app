import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { Heart } from 'lucide-react';
import { getPrayerRequests, createPrayerRequest } from '../services/api';

function PrayerRequests() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const fetchPrayerRequests = async () => {
    try {
      const response = await getPrayerRequests();
      setPrayerRequests(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPrayerRequest(formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', request: '' });
      fetchPrayerRequests();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error creating prayer request:', error);
      alert('Failed to submit prayer request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'praying': return 'primary';
      case 'answered': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Prayer Requests</h1>
          <p>Share your prayer needs with our community</p>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-4">
          {/* Submit Prayer Request Form */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <Heart size={32} className="text-primary" />
                  </div>
                  <h4 className="mb-0">Submit Prayer Request</h4>
                </div>

                {showSuccess && (
                  <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                    Your prayer request has been submitted. We will be praying for you!
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Prayer Request</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="request"
                      value={formData.request}
                      onChange={handleChange}
                      required
                      placeholder="Share your prayer need..."
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? 'Submitting...' : 'Submit Prayer Request'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Prayer Requests List */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">Recent Prayer Requests</h4>
                
                {prayerRequests.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <Heart size={48} className="mb-3" />
                    <p>No prayer requests yet</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {prayerRequests.map((request) => (
                      <Card key={request.id} className="border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <strong>{request.name}</strong>
                            <Badge bg={getStatusVariant(request.status)} className="text-capitalize">
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-muted mb-2">{request.request}</p>
                          <small className="text-muted">
                            {new Date(request.created_at).toLocaleDateString()}
                          </small>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrayerRequests;
