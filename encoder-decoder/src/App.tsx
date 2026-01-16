import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, Alert, Tab, Tabs } from 'react-bootstrap';
import './App.css';

type EncodingType = 'base64' | 'url' | 'html' | 'hex' | 'unixtime';

interface EncoderResult {
  output: string;
  error: string;
}

// Base64 encoding/decoding
const base64Encode = (input: string): EncoderResult => {
  try {
    // Handle Unicode characters
    const utf8Bytes = new TextEncoder().encode(input);
    const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
    return { output: btoa(binaryString), error: '' };
  } catch (err) {
    return { output: '', error: `Base64 encode error: ${(err as Error).message}` };
  }
};

const base64Decode = (input: string): EncoderResult => {
  try {
    const binaryString = atob(input);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return { output: new TextDecoder().decode(bytes), error: '' };
  } catch (err) {
    return { output: '', error: `Base64 decode error: ${(err as Error).message}` };
  }
};

// URL encoding/decoding
const urlEncode = (input: string): EncoderResult => {
  try {
    return { output: encodeURIComponent(input), error: '' };
  } catch (err) {
    return { output: '', error: `URL encode error: ${(err as Error).message}` };
  }
};

const urlDecode = (input: string): EncoderResult => {
  try {
    return { output: decodeURIComponent(input), error: '' };
  } catch (err) {
    return { output: '', error: `URL decode error: ${(err as Error).message}` };
  }
};

// HTML encoding/decoding
const htmlEncode = (input: string): EncoderResult => {
  try {
    const element = document.createElement('div');
    element.textContent = input;
    return { output: element.innerHTML, error: '' };
  } catch (err) {
    return { output: '', error: `HTML encode error: ${(err as Error).message}` };
  }
};

const htmlDecode = (input: string): EncoderResult => {
  try {
    const element = document.createElement('div');
    element.innerHTML = input;
    return { output: element.textContent || '', error: '' };
  } catch (err) {
    return { output: '', error: `HTML decode error: ${(err as Error).message}` };
  }
};

// Hex encoding/decoding
const hexEncode = (input: string): EncoderResult => {
  try {
    const utf8Bytes = new TextEncoder().encode(input);
    const hexString = Array.from(utf8Bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    return { output: hexString, error: '' };
  } catch (err) {
    return { output: '', error: `Hex encode error: ${(err as Error).message}` };
  }
};

const hexDecode = (input: string): EncoderResult => {
  try {
    // Remove any spaces or common separators
    const cleanHex = input.replace(/[\s:-]/g, '');
    if (cleanHex.length % 2 !== 0) {
      return { output: '', error: 'Hex decode error: Invalid hex string length' };
    }
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      const byte = parseInt(cleanHex.substr(i, 2), 16);
      if (isNaN(byte)) {
        return { output: '', error: `Hex decode error: Invalid hex character at position ${i}` };
      }
      bytes[i / 2] = byte;
    }
    return { output: new TextDecoder().decode(bytes), error: '' };
  } catch (err) {
    return { output: '', error: `Hex decode error: ${(err as Error).message}` };
  }
};

// Unix timestamp conversion functions
const unixtimeToDate = (input: string): EncoderResult => {
  try {
    // Try to parse as integer timestamp (seconds since Unix epoch)
    const timestamp = parseInt(input.trim(), 10);
    if (isNaN(timestamp)) {
      return { output: '', error: 'Please enter a valid Unix timestamp' };
    }

    // Handle both seconds and milliseconds timestamps
    const date = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
    if (isNaN(date.getTime())) {
      return { output: '', error: 'Invalid timestamp' };
    }

    // Generate multiple format representations
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formats = [
      `Local: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      `ISO 8601: ${date.toISOString()}`,
      `UTC: ${date.toUTCString()}`,
      `Date: ${date.toLocaleDateString()}`,
      `Time: ${date.toLocaleTimeString()}`,
      `Year: ${date.getFullYear()}`,
      `Month: ${date.getMonth() + 1} (${date.toLocaleDateString('en-US', { month: 'long' })})`,
      `Day: ${date.getDate()}`,
      `Hours: ${date.getHours()}`,
      `Minutes: ${date.getMinutes()}`,
      `Seconds: ${date.getSeconds()}`
    ];

    return { output: formats.join('\n'), error: '' };
  } catch (err) {
    return { output: '', error: `Unix timestamp decode error: ${(err as Error).message}` };
  }
};

const dateToUnixtime = (input: string): EncoderResult => {
  try {
    // Try parsing as various date formats
    let date: Date;

    // First try ISO format
    date = new Date(input);
    if (isNaN(date.getTime())) {
      // Try parsing common date formats
      date = new Date(Date.parse(input));
      if (isNaN(date.getTime())) {
        return { output: '', error: 'Invalid date format. Try ISO format (2024-01-01T00:00:00Z) or common date strings.' };
      }
    }

    // Get timestamps in both seconds and milliseconds
    const timestampSeconds = Math.floor(date.getTime() / 1000);
    const timestampMs = date.getTime();

    const result = [
      `Unix timestamp (seconds): ${timestampSeconds}`,
      `Unix timestamp (milliseconds): ${timestampMs}`,
      `ISO 8601: ${date.toISOString()}`
    ];

    return { output: result.join('\n'), error: '' };
  } catch (err) {
    return { output: '', error: `Date to timestamp error: ${(err as Error).message}` };
  }
};

function App() {
  const [activeTab, setActiveTab] = useState<EncodingType>('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleEncode = () => {
    let result: EncoderResult;
    switch (activeTab) {
      case 'base64':
        result = base64Encode(input);
        break;
      case 'url':
        result = urlEncode(input);
        break;
      case 'html':
        result = htmlEncode(input);
        break;
      case 'hex':
        result = hexEncode(input);
        break;
      case 'unixtime':
        result = dateToUnixtime(input);
        break;
      default:
        result = { output: '', error: 'Unknown encoding type' };
    }
    setOutput(result.output);
    setError(result.error);
  };

  const handleDecode = () => {
    let result: EncoderResult;
    switch (activeTab) {
      case 'base64':
        result = base64Decode(input);
        break;
      case 'url':
        result = urlDecode(input);
        break;
      case 'html':
        result = htmlDecode(input);
        break;
      case 'hex':
        result = hexDecode(input);
        break;
      case 'unixtime':
        result = unixtimeToDate(input);
        break;
      default:
        result = { output: '', error: 'Unknown encoding type' };
    }
    setOutput(result.output);
    setError(result.error);
  };

  const handleTabChange = (tab: string | null) => {
    if (tab) {
      setActiveTab(tab as EncodingType);
      setOutput('');
      setError('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const swapInputOutput = () => {
    setInput(output);
    setOutput('');
    setError('');
  };

  const getTabDescription = (tab: EncodingType): string => {
    switch (tab) {
      case 'base64':
        return 'Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format.';
      case 'url':
        return 'URL encoding converts characters into a format that can be transmitted over the Internet.';
      case 'html':
        return 'HTML encoding converts special characters to their HTML entity equivalents.';
      case 'hex':
        return 'Hex encoding converts text to its hexadecimal representation.';
      case 'unixtime':
        return 'Convert between Unix timestamps (seconds since Jan 1, 1970) and formatted date strings.';
      default:
        return '';
    }
  };

  return (
    <div className="App">
      <Container fluid>
        <div className="text-center mb-4">
          <h1 className="my-4">Encoder / Decoder</h1>
          <p className="lead text-muted">
            Encode or decode text using Base64, URL, HTML, Hex, or Unix timestamps.
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={handleTabChange}
          className="mb-4 justify-content-center"
        >
          <Tab eventKey="base64" title="Base64" />
          <Tab eventKey="url" title="URL" />
          <Tab eventKey="html" title="HTML" />
          <Tab eventKey="hex" title="Hex" />
          <Tab eventKey="unixtime" title="Unix Time" />
        </Tabs>

        <p className="text-center text-muted mb-4">{getTabDescription(activeTab)}</p>

        <Row>
          {/* Input Panel */}
          <Col md={6}>
            <h3>Input</h3>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={12}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="code-textarea"
                placeholder={
                  activeTab === 'unixtime'
                    ? 'Enter Unix timestamp (e.g., 1704067200) or date string (e.g., 2024-01-01T00:00:00Z)...'
                    : 'Enter text to encode or decode...'
                }
              />
            </Form.Group>

            {/* Action Buttons */}
            <div className="action-buttons d-flex flex-wrap gap-2 mt-3">
              <ButtonGroup>
                <Button variant="primary" onClick={handleEncode}>
                  {activeTab === 'unixtime' ? 'Date → Timestamp' : 'Encode'}
                </Button>
                <Button variant="secondary" onClick={handleDecode}>
                  {activeTab === 'unixtime' ? 'Timestamp → Date' : 'Decode'}
                </Button>
              </ButtonGroup>
              <Button variant="outline-primary" onClick={swapInputOutput} disabled={!output}>
                Swap
              </Button>
              <Button variant="outline-danger" onClick={clearAll}>
                Clear
              </Button>
            </div>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Col>

          {/* Output Panel */}
          <Col md={6}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3>Output</h3>
              {output && (
                <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                  {copySuccess ? 'Copied!' : 'Copy'}
                </Button>
              )}
            </div>

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={12}
                value={output}
                readOnly
                className="code-textarea"
                placeholder="Result will appear here..."
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Quick Reference */}
        <Row className="mt-5">
          <Col>
            <h4 className="text-center mb-3">Quick Reference</h4>
            <div className="reference-cards">
              <Row>
                <Col md={3} className="mb-3">
                  <div className="reference-card">
                    <h5>Base64</h5>
                    <p><strong>Example:</strong></p>
                    <code>Hello World</code>
                    <p className="mt-2"><strong>Encoded:</strong></p>
                    <code>SGVsbG8gV29ybGQ=</code>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="reference-card">
                    <h5>URL</h5>
                    <p><strong>Example:</strong></p>
                    <code>hello world&amp;test</code>
                    <p className="mt-2"><strong>Encoded:</strong></p>
                    <code>hello%20world%26test</code>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="reference-card">
                    <h5>HTML</h5>
                    <p><strong>Example:</strong></p>
                    <code>&lt;div&gt;Hello&lt;/div&gt;</code>
                    <p className="mt-2"><strong>Encoded:</strong></p>
                    <code>&amp;lt;div&amp;gt;Hello&amp;lt;/div&amp;gt;</code>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div className="reference-card">
                    <h5>Hex</h5>
                    <p><strong>Example:</strong></p>
                    <code>Hello</code>
                    <p className="mt-2"><strong>Encoded:</strong></p>
                    <code>48656c6c6f</code>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12} className="mb-3">
                  <div className="reference-card">
                    <h5>Unix Timestamps</h5>
                    <p><strong>Current Timestamp (seconds):</strong> <code>{Math.floor(Date.now() / 1000)}</code></p>
                    <p><strong>Current Timestamp (milliseconds):</strong> <code>{Date.now()}</code></p>
                    <p><strong>Example:</strong> <code>1704067200</code> → <code>2024-01-01 00:00:00 UTC</code></p>
                    <p><strong>Supported formats:</strong> ISO 8601, RFC 2822, common date strings</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
