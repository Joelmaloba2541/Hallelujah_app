import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { Users, Clock, Calendar } from 'lucide-react';
import { getMinistries } from '../services/api';

function Ministries() {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const response = await getMinistries();
      setMinistries(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching ministries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Our Ministries</h1>
          <p>Discover ministries and find your place to serve</p>
        </Container>
      </div>

      <Container className="py-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading ministries...</p>
          </div>
        ) : ministries.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <Users size={64} className="mb-3" />
            <p>No ministries available</p>
          </div>
        ) : (
          <Row className="g-4">
            {ministries.map((ministry) => (
              <Col key={ministry.id} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <Users size={32} className="text-primary" />
                      </div>
                      <h4 className="mb-0">{ministry.name}</h4>
                    </div>

                    <p className="text-muted mb-3">{ministry.description}</p>

                    {ministry.leader_name && (
                      <div className="mb-2">
                        <strong>Leader:</strong> {ministry.leader_name}
                      </div>
                    )}

                    {ministry.meeting_day && (
                      <div className="d-flex align-items-center gap-2 text-muted mb-2">
                        <Calendar size={16} className="text-primary" />
                        <span>{ministry.meeting_day}</span>
                      </div>
                    )}

                    {ministry.meeting_time && (
                      <div className="d-flex align-items-center gap-2 text-muted mb-2">
                        <Clock size={16} className="text-primary" />
                        <span>{ministry.meeting_time}</span>
                      </div>
                    )}

                    <div className="mt-3">
                      <Badge bg="primary" pill>
                        {ministry.member_count || 0} Members
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Ministries;
