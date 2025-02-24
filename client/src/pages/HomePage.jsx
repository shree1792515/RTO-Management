import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1>Welcome to the RTO Management System</h1>
                    <p>Your one-stop solution for all transport-related services.</p>
                    <Link to="/login">
                        <Button variant="primary" size="lg">Login</Button>
                    </Link>
                    <Link to="/signup" className="ml-3">
                        <Button variant="secondary" size="lg">Sign Up</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;