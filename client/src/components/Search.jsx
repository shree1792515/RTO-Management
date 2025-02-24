import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { searchRecords } from '../services/searchService';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await searchRecords(query);
            setResults(response.data);
        } catch (err) {
            setError('Error fetching search results. Please try again.');
        }
    };

    return (
        <div>
            <h2>Search Records</h2>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="searchQuery">
                    <Form.Label>Enter Search Query</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search by vehicle number or license number"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {results.length > 0 && (
                <div>
                    <h3>Search Results</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{JSON.stringify(result)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;