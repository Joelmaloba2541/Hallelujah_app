import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { BookOpen, Calendar, User, ExternalLink } from 'lucide-react';
import { getSermons } from '../services/api';

function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await getSermons();
      setSermons(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Sermons</h1>
          <p>Watch and listen to inspiring messages from our pastors</p>
        </Container>
      </div>

      <Container className="py-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading sermons...</p>
          </div>
        ) : sermons.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <BookOpen size={64} className="mb-3" />
            <p>No sermons available</p>
          </div>
        ) : (
          <Row className="g-4">
            {sermons.map((sermon) => (
              <Col key={sermon.id} lg={12}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <BookOpen size={24} className="text-primary mt-1" />
                      <div className="flex-grow-1">
                        <h3>{sermon.title}</h3>
                      </div>
                    </div>

                    <div className="d-flex gap-4 mb-3 flex-wrap">
                      <div className="d-flex align-items-center text-muted">
                        <User size={16} className="text-primary me-2" />
                        <span>{sermon.preacher}</span>
                      </div>
                      <div className="d-flex align-items-center text-muted">
                        <Calendar size={16} className="text-primary me-2" />
                        <span>
                          {new Date(sermon.date_preached).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="badge bg-gradient text-white px-3 py-2" style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                      }}>
                        <BookOpen size={14} className="me-2" />
                        {sermon.scripture_reference}
                      </span>
                    </div>

                    <p className="text-muted mb-3">{sermon.description}</p>

                    {sermon.video_url && (
                      <Button 
                        href={sermon.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="primary"
                        className="d-inline-flex align-items-center gap-2"
                      >
                        Watch Sermon <ExternalLink size={16} />
                      </Button>
                    )}
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

export default Sermons;
