import { Container, Row, Col, Card } from 'react-bootstrap';
import { Church, Heart, Users, BookOpen } from 'lucide-react';

function About() {
  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>About Us</h1>
          <p>Learn more about Hallelujah Church</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <Church size={64} className="text-primary mb-3" />
                  <h2>Welcome to Hallelujah Church</h2>
                  <p className="lead text-muted">
                    A vibrant community of believers dedicated to worship, fellowship, and service
                  </p>
                </div>

                <Row className="g-4 mb-5">
                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <Heart size={40} className="text-primary" />
                      </div>
                      <h4>Our Mission</h4>
                      <p className="text-muted">
                        To spread the love of Christ and make disciples of all nations through worship, 
                        teaching, and compassionate service.
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <Users size={40} className="text-primary" />
                      </div>
                      <h4>Our Vision</h4>
                      <p className="text-muted">
                        To be a beacon of hope and transformation in our community, 
                        building a family of believers who live out their faith daily.
                      </p>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="text-center">
                      <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block mb-3">
                        <BookOpen size={40} className="text-primary" />
                      </div>
                      <h4>Our Values</h4>
                      <p className="text-muted">
                        Faith, Love, Unity, Excellence, and Service guide everything we do 
                        as we seek to honor God in all aspects of church life.
                      </p>
                    </div>
                  </Col>
                </Row>

                <div className="bg-light p-4 rounded mb-4">
                  <h3 className="mb-3">Our Story</h3>
                  <p className="text-muted mb-3">
                    Hallelujah Church was founded with a vision to create a welcoming space where people 
                    from all walks of life can encounter God's love and grow in their faith. Since our 
                    inception, we have been committed to biblical teaching, authentic worship, and 
                    meaningful community.
                  </p>
                  <p className="text-muted mb-0">
                    Today, we continue to grow as a diverse family of believers, united in our love for 
                    Christ and our desire to see lives transformed by the Gospel. We invite you to join 
                    us as we worship together, serve our community, and make a difference in the world.
                  </p>
                </div>

                <div className="bg-light p-4 rounded">
                  <h3 className="mb-3">Service Times</h3>
                  <Row>
                    <Col md={6}>
                      <h5>Sunday Services</h5>
                      <p className="text-muted mb-3">
                        First Service: 9:00 AM<br />
                        Second Service: 11:00 AM
                      </p>
                    </Col>
                    <Col md={6}>
                      <h5>Midweek Service</h5>
                      <p className="text-muted mb-3">
                        Wednesday Bible Study: 6:00 PM
                      </p>
                    </Col>
                  </Row>
                  <h5>Location</h5>
                  <p className="text-muted mb-0">
                    Mwamba, Kakamega, Kenya<br />
                    Contact: info@hallelujahchurch.org
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
