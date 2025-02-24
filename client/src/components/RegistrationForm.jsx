import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { vehicleService } from '../services/vehicleService';

const RegistrationForm = () => {
    const [vehicleData, setVehicleData] = useState({
        vehicleNumber: '',
        ownerName: '',
        vehicleType: '',
        model: '',
        year: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({ ...vehicleData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await vehicleService.registerVehicle(vehicleData);
            setMessage(response.data.message);
            setVehicleData({
                vehicleNumber: '',
                ownerName: '',
                vehicleType: '',
                model: '',
                year: '',
            });
        } catch (err) {
            setError(err.response.data.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Vehicle Registration</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formVehicleNumber">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter vehicle number"
                        name="vehicleNumber"
                        value={vehicleData.vehicleNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formOwnerName">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter owner name"
                        name="ownerName"
                        value={vehicleData.ownerName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formVehicleType">
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter vehicle type"
                        name="vehicleType"
                        value={vehicleData.vehicleType}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter model"
                        name="model"
                        value={vehicleData.model}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter year"
                        name="year"
                        value={vehicleData.year}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register Vehicle
                </Button>
            </Form>
        </div>
    );
};

export default RegistrationForm;