import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { DollarSign, TrendingUp } from 'lucide-react';
import { getDonationStats, createDonation } from '../services/api';

function Donations() {
  const [stats, setStats] = useState(null);
  const [formData, setFormData] = useState({
    donor_name: '',
    amount: '',
    donation_type: 'tithe',
    payment_method: 'mpesa',
    transaction_reference: '',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDonationStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching donation stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDonation(formData);
      setShowSuccess(true);
      setFormData({
        donor_name: '',
        amount: '',
        donation_type: 'tithe',
        payment_method: 'mpesa',
        transaction_reference: '',
        notes: ''
      });
      fetchStats();
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('Failed to submit donation. Please try again.');
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

  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Give</h1>
          <p>Support the ministry through your generous giving</p>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-4">
          {/* Donation Stats */}
          {stats && (
            <>
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <DollarSign size={32} className="text-success" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Total Donations</h6>
                        <h2 className="mb-0">KSh {stats.total_donations.toLocaleString()}</h2>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <TrendingUp size={32} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Total Contributions</h6>
                        <h2 className="mb-0">{stats.total_count}</h2>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={12}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <h5 className="mb-3">Donations by Type</h5>
                    <Row className="g-3">
                      {stats.by_type.map((item, index) => (
                        <Col key={index} md={4}>
                          <div className="bg-light p-3 rounded">
                            <div className="text-capitalize fw-semibold mb-1">
                              {item.donation_type.replace('_', ' ')}
                            </div>
                            <div className="text-success fw-bold">
                              KSh {item.total.toLocaleString()}
                            </div>
                            <div className="text-muted small">
                              {item.count} contribution{item.count !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}

          {/* Donation Form */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4">Make a Donation</h4>

                {showSuccess && (
                  <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                    Thank you for your generous donation!
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="donor_name"
                          value={formData.donor_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Amount (KSh)</Form.Label>
                        <Form.Control
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          min="1"
                          step="0.01"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Donation Type</Form.Label>
                        <Form.Select
                          name="donation_type"
                          value={formData.donation_type}
                          onChange={handleChange}
                          required
                        >
                          <option value="tithe">Tithe</option>
                          <option value="offering">Offering</option>
                          <option value="building_fund">Building Fund</option>
                          <option value="missions">Missions</option>
                          <option value="special">Special Offering</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Select
                          name="payment_method"
                          value={formData.payment_method}
                          onChange={handleChange}
                          required
                        >
                          <option value="mpesa">M-Pesa</option>
                          <option value="cash">Cash</option>
                          <option value="bank">Bank Transfer</option>
                          <option value="card">Card</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Transaction Reference (Optional)</Form.Label>
                        <Form.Control
                          type="text"
                          name="transaction_reference"
                          value={formData.transaction_reference}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Notes (Optional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg"
                        disabled={loading}
                        className="px-5"
                      >
                        {loading ? 'Submitting...' : 'Submit Donation'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Donations;
