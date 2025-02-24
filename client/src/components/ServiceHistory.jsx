import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { getServiceHistory } from '../services/userService';

const ServiceHistory = () => {
    const [serviceHistory, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceHistory = async () => {
            try {
                const history = await getServiceHistory();
                setServiceHistory(history);
            } catch (err) {
                setError('Failed to fetch service history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceHistory();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <h2>Service History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceHistory.map((service, index) => (
                        <tr key={index}>
                            <td>{service.type}</td>
                            <td>{new Date(service.date).toLocaleDateString()}</td>
                            <td>{service.status}</td>
                            <td>{service.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ServiceHistory;