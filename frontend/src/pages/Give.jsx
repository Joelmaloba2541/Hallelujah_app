import { Container, Row, Col, Card } from 'react-bootstrap';
import { Heart, HandHeart, Gift, Info } from 'lucide-react';

function Give() {
  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Give</h1>
          <p>Support God's work through your generous giving</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {/* Coming Soon Notice */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
              <Card.Body className="p-4 text-center">
                <Info size={48} className="text-primary mb-3" />
                <h4 className="mb-3">Online Giving Coming Soon!</h4>
                <p className="text-muted mb-0">
                  We're working on integrating secure online payment options to make giving easier. 
                  In the meantime, you can give through the methods listed below.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Why Give Section */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <Heart size={64} className="text-primary mb-3" />
                  <h2>Why Give?</h2>
                  <p className="lead text-muted">
                    Your generosity helps us spread the Gospel and serve our community
                  </p>
                </div>

                <Row className="g-4 mb-4">
                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <HandHeart size={40} className="text-primary" />
                      </div>
                      <h5>Support Ministry</h5>
                      <p className="text-muted">
                        Enable us to preach the Word, worship together, and grow in faith
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <Gift size={40} className="text-primary" />
                      </div>
                      <h5>Serve the Community</h5>
                      <p className="text-muted">
                        Help us reach out to those in need with love and compassion
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <Heart size={40} className="text-primary" />
                      </div>
                      <h5>Advance God's Kingdom</h5>
                      <p className="text-muted">
                        Partner with us in missions and spreading the Gospel message
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Giving Options */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <h3 className="mb-4 text-center">How to Give</h3>
                
                <Row className="g-4">
                  <Col md={6}>
                    <Card className="border h-100">
                      <Card.Body className="p-4">
                        <h5 className="mb-3">
                          <span className="text-primary">📱</span> M-Pesa
                        </h5>
                        <p className="text-muted mb-2">
                          Send your contribution via M-Pesa:
                        </p>
                        <div className="bg-light p-3 rounded">
                          <p className="mb-1"><strong>Paybill Number:</strong> Coming Soon</p>
                          <p className="mb-1"><strong>Account Number:</strong> Your Name/Donation Type</p>
                          <p className="mb-0 small text-muted">
                            (e.g., Tithe, Offering, Building Fund, Missions)
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="border h-100">
                      <Card.Body className="p-4">
                        <h5 className="mb-3">
                          <span className="text-primary">🏦</span> Bank Transfer
                        </h5>
                        <p className="text-muted mb-2">
                          Direct bank transfer to:
                        </p>
                        <div className="bg-light p-3 rounded">
                          <p className="mb-1"><strong>Bank Name:</strong> Coming Soon</p>
                          <p className="mb-1"><strong>Account Name:</strong> Hallelujah Church</p>
                          <p className="mb-1"><strong>Account Number:</strong> Coming Soon</p>
                          <p className="mb-0"><strong>Branch:</strong> Kakamega</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="border h-100">
                      <Card.Body className="p-4">
                        <h5 className="mb-3">
                          <span className="text-primary">💵</span> Cash/Cheque
                        </h5>
                        <p className="text-muted mb-2">
                          Give during service or visit the church office:
                        </p>
                        <div className="bg-light p-3 rounded">
                          <p className="mb-1"><strong>Location:</strong> Mwamba, Kakamega</p>
                          <p className="mb-1"><strong>Service Times:</strong></p>
                          <p className="mb-1 ms-3">Sunday: 9:00 AM & 11:00 AM</p>
                          <p className="mb-0 ms-3">Wednesday: 6:00 PM</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="border h-100">
                      <Card.Body className="p-4">
                        <h5 className="mb-3">
                          <span className="text-primary">📞</span> Contact Us
                        </h5>
                        <p className="text-muted mb-2">
                          For more information about giving:
                        </p>
                        <div className="bg-light p-3 rounded">
                          <p className="mb-1"><strong>Email:</strong> info@hallelujahchurch.org</p>
                          <p className="mb-0"><strong>Phone:</strong> Coming Soon</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="mt-4 p-4 bg-light rounded text-center">
                  <p className="mb-0 text-muted">
                    <em>"Each of you should give what you have decided in your heart to give, 
                    not reluctantly or under compulsion, for God loves a cheerful giver." 
                    - 2 Corinthians 9:7</em>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Donation Types */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <h3 className="mb-4 text-center">Types of Giving</h3>
                
                <Row className="g-3">
                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Tithes</h6>
                      <p className="text-muted small mb-0">
                        10% of your income dedicated to God's work
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Offerings</h6>
                      <p className="text-muted small mb-0">
                        Voluntary gifts above tithes to support ministry
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Building Fund</h6>
                      <p className="text-muted small mb-0">
                        Contributions toward church facilities and infrastructure
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Missions</h6>
                      <p className="text-muted small mb-0">
                        Support for evangelism and missionary work
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Special Offerings</h6>
                      <p className="text-muted small mb-0">
                        Designated gifts for specific projects or needs
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Benevolence</h6>
                      <p className="text-muted small mb-0">
                        Helping those in need within our community
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Give;
