import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getReports } from '../services/reportService';

const Report = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Reports</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.type}</td>
                            <td>{new Date(report.date).toLocaleDateString()}</td>
                            <td>{report.details}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => window.print()}>Print Reports</Button>
        </div>
    );
};

export default Report;