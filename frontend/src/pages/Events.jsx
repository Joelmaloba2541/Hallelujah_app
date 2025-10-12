import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { getEvents } from '../services/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.event_type === filter);

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'service', label: 'Church Service' },
    { value: 'prayer', label: 'Prayer Meeting' },
    { value: 'bible_study', label: 'Bible Study' },
    { value: 'youth', label: 'Youth Meeting' },
    { value: 'conference', label: 'Conference' },
    { value: 'outreach', label: 'Outreach' },
  ];

  return (
    <div>
      <div className="page-header">
        <Container>
          <h1>Church Events</h1>
          <p>Join us for worship, fellowship, and community events</p>
        </Container>
      </div>

      <Container className="py-4">
        <ButtonGroup className="mb-4 flex-wrap">
          {eventTypes.map(type => (
            <Button
              key={type.value}
              variant={filter === type.value ? 'primary' : 'outline-primary'}
              onClick={() => setFilter(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </ButtonGroup>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <Calendar size={64} className="mb-3" />
            <p>No events found</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredEvents.map((event) => (
              <Col key={event.id} lg={12}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <span className="badge bg-primary text-capitalize mb-2">
                        {event.event_type.replace('_', ' ')}
                      </span>
                      <h3>{event.title}</h3>
                    </div>
                    
                    <div className="bg-light p-3 rounded mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <Calendar size={18} className="text-primary me-2" />
                        <span>
                          {new Date(event.start_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-2">
                        <Clock size={18} className="text-primary me-2" />
                        <span>
                          {new Date(event.start_date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {' - '}
                          {new Date(event.end_date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <MapPin size={18} className="text-primary me-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-0">{event.description}</p>
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

export default Events;
