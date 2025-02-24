import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getTests, createTest, updateTest, deleteTest } from '../services/testService';

const TestManagement = () => {
    const [tests, setTests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTest, setCurrentTest] = useState(null);
    const [testName, setTestName] = useState('');
    const [testDate, setTestDate] = useState('');

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        const data = await getTests();
        setTests(data);
    };

    const handleShow = (test = null) => {
        if (test) {
            setCurrentTest(test);
            setTestName(test.name);
            setTestDate(test.date);
        } else {
            setCurrentTest(null);
            setTestName('');
            setTestDate('');
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentTest) {
            await updateTest(currentTest._id, { name: testName, date: testDate });
        } else {
            await createTest({ name: testName, date: testDate });
        }
        fetchTests();
        handleClose();
    };

    const handleDelete = async (id) => {
        await deleteTest(id);
        fetchTests();
    };

    return (
        <div>
            <h2>Test Management</h2>
            <Button variant="primary" onClick={() => handleShow()}>Add Test</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test._id}>
                            <td>{test.name}</td>
                            <td>{test.date}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(test)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(test._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentTest ? 'Edit Test' : 'Add Test'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTestName">
                            <Form.Label>Test Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={testName} 
                                onChange={(e) => setTestName(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formTestDate">
                            <Form.Label>Test Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={testDate} 
                                onChange={(e) => setTestDate(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentTest ? 'Update Test' : 'Add Test'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TestManagement;