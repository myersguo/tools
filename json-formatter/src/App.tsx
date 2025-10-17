import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { JsonView, defaultStyles, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './App.css';

const placeholderJson = {
  "name": "JSON Formatter",
  "version": "1.0.0",
  "features": [
    "Format JSON",
    "Minify JSON",
    "Escape strings",
    "Unescape strings",
    "Tree view"
  ],
  "nested": {
    "level1": {
      "level2": {
        "value": "Deep nested value"
      }
    }
  },
  "array": [1, 2, 3, 4, 5],
  "boolean": true,
  "null": null
};

function App() {
  const [inputJson, setInputJson] = useState(JSON.stringify(placeholderJson, null, 2));
  const [formattedJson, setFormattedJson] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputJson(event.target?.result as string);
        setError('');
        setFormattedJson('');
        setParsedData(null);
      };
      reader.readAsText(file);
    }
  };

  const formatJson = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indent);
      setFormattedJson(formatted);
      setParsedData(parsed);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setParsedData(parsed);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
    }
  };

  const escapeJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const jsonString = JSON.stringify(parsed);
      // Escape the JSON string
      const escaped = JSON.stringify(jsonString);
      setFormattedJson(escaped);
      setParsedData(null);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
    }
  };

  const unescapeJson = () => {
    try {
      // Try to unescape the input
      const unescaped = JSON.parse(inputJson);
      if (typeof unescaped === 'string') {
        // If the result is a string, parse it again to get the JSON object
        const parsed = JSON.parse(unescaped);
        const formatted = JSON.stringify(parsed, null, 2);
        setFormattedJson(formatted);
        setParsedData(parsed);
        setError('');
      } else {
        // If it's already an object, just format it
        formatJson();
      }
    } catch (err) {
      setError(`Invalid escaped JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
    }
  };

  const copyToClipboard = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const clearAll = () => {
    setInputJson('');
    setFormattedJson('');
    setParsedData(null);
    setError('');
  };

  return (
    <div className="App">
      <Container fluid>
        <div className="text-center mb-4">
          <h1 className="my-4">JSON Formatter</h1>
          <p className="lead text-muted">
            Format, minify, escape, or unescape your JSON data. View it in a tree structure or copy the formatted output.
          </p>
        </div>

        <Row>
          {/* Left Panel - Input */}
          <Col md={6}>
            <h3>Input JSON</h3>
            <Form.Group className="mb-3">
              <Form.Label>Load from file</Form.Label>
              <Form.Control type="file" accept=".json" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Or paste JSON here</Form.Label>
              <Form.Control
                as="textarea"
                rows={20}
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="json-textarea"
                placeholder="Paste your JSON here..."
              />
            </Form.Group>

            {/* Action Buttons */}
            <ButtonGroup className="action-buttons d-flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => formatJson(2)}>
                Format (2 spaces)
              </Button>
              <Button variant="primary" onClick={() => formatJson(4)}>
                Format (4 spaces)
              </Button>
              <Button variant="secondary" onClick={minifyJson}>
                Minify
              </Button>
              <Button variant="info" onClick={escapeJson}>
                Escape
              </Button>
              <Button variant="info" onClick={unescapeJson}>
                Unescape
              </Button>
              <Button variant="danger" onClick={clearAll}>
                Clear
              </Button>
            </ButtonGroup>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Col>

          {/* Right Panel - Output */}
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3>Output</h3>
              {formattedJson && (
                <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                  {copySuccess ? '✓ Copied!' : 'Copy'}
                </Button>
              )}
            </div>

            {/* Formatted Text Output */}
            {formattedJson && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Formatted JSON (Text)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={formattedJson}
                    readOnly
                    className="json-textarea"
                  />
                </Form.Group>

                {/* Tree View */}
                {parsedData && (
                  <div>
                    <Form.Label>Tree View</Form.Label>
                    <div className="formatted-output">
                      <JsonView
                        data={parsedData}
                        shouldExpandNode={(level) => level < 2}
                        style={isDarkMode ? darkStyles : defaultStyles}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {!formattedJson && !error && (
              <div className="text-muted text-center mt-5">
                <p>Your formatted JSON will appear here</p>
                <p>Click one of the action buttons to process your input</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
