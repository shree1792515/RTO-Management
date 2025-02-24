import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

import {  getAppointmentById } from '../../services/appointmentService';
import { getVehicleuserid } from '../../services/vehicleService';

const CitizenDashboard = () => {
    const { user } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await getAppointmentById(user.id);
            setAppointments(data);
        };

        const fetchVehicles = async () => {
            const data = await getVehicleuserid(user.id);
            setVehicles(data);
        };

        fetchAppointments();
        fetchVehicles();
    }, [user.id]);

    return (
        <Container>
            <h1>Welcome, {user.name}</h1>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Appointments</Card.Title>
                            {appointments.length > 0 ? (
                                appointments.map(appointment => (
                                    <Card key={appointment.id} className="mb-2">
                                        <Card.Body>
                                            <Card.Text>
                                                {appointment.service} - {appointment.date}
                                            </Card.Text>
                                            <Button variant="primary">View Details</Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Card.Text>No appointments found.</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Vehicles</Card.Title>
                            {vehicles.length > 0 ? (
                                vehicles.map(vehicle => (
                                    <Card key={vehicle.id} className="mb-2">
                                        <Card.Body>
                                            <Card.Text>
                                                {vehicle.registrationNumber} - {vehicle.model}
                                            </Card.Text>
                                            <Button variant="primary">View Details</Button>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Card.Text>No vehicles found.</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CitizenDashboard;