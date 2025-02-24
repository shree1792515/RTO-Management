import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { getLicenses, applyForLicense, renewLicense } from '../services/licenseService';

const LicenseManagement = () => {
    const [licenses, setLicenses] = useState([]);
    const [licenseId, setLicenseId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const data = await getLicenses();
                setLicenses(data);
            } catch (err) {
                setError('Failed to fetch licenses');
            }
        };
        fetchLicenses();
    }, []);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            await applyForLicense({ licenseId });
            setMessage('License application submitted successfully');
            setError('');
            setLicenseId('');
            // Refresh the license list
            const data = await getLicenses();
            setLicenses(data);
        } catch (err) {
            setError('Failed to apply for license');
            setMessage('');
        }
    };

    const handleRenew = async (e) => {
        e.preventDefault();
        try {
            await renewLicense(licenseId);
            setMessage('License renewed successfully');
            setError('');
            setLicenseId('');
            // Refresh the license list
            const data = await getLicenses();
            setLicenses(data);
        } catch (err) {
            setError('Failed to renew license');
            setMessage('');
        }
    };

    return (
        <Container>
            <h2>License Management</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleApply}>
                <Form.Group controlId="licenseId">
                    <Form.Label>License ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter License ID"
                        value={licenseId}
                        onChange={(e) => setLicenseId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Apply for License
                </Button>
            </Form>
            <Form onSubmit={handleRenew} className="mt-3">
                <Button variant="secondary" type="submit">
                    Renew License
                </Button>
            </Form>
            <h3 className="mt-4">Current Licenses</h3>
            <ul>
                {licenses.map((license) => (
                    <li key={license._id}>{license.licenseId} - {license.status}</li>
                ))}
            </ul>
        </Container>
    );
};

export default LicenseManagement;