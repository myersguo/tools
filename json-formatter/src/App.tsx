import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { JsonView, defaultStyles, darkStyles } from 'react-json-view-lite';
import { parse as bestEffortParse } from 'best-effort-json-parser';
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
  const [warning, setWarning] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 尝试解析 JSON，支持自动修复非法/截断的 JSON
  const parseJson = (input: string): { data: any; repaired: boolean; unescaped: boolean } => {
    let current = input.trim();
    let unescaped = false;

    // 先尝试标准解析
    try {
      const data = JSON.parse(current);
      return { data, repaired: false, unescaped };
    } catch (firstError) {
      // 如果包含转义字符（如 \" 或 \\），尝试反转义
      if (current.includes('\\"') || current.includes('\\\\')) {
        try {
          // 递归反转义：把 \" 替换为 "，把 \\ 替换为 \
          let prev = '';
          let iterations = 0;
          const maxIterations = 10;

          while (prev !== current && iterations < maxIterations) {
            prev = current;
            // 使用 replace 进行反转义
            current = current.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            iterations++;
          }

          // 尝试解析反转义后的字符串
          const data = JSON.parse(current);
          unescaped = true;
          return { data, repaired: false, unescaped };
        } catch (unescapeError) {
          // 反转义后仍然失败，继续尝试 best-effort 解析
        }
      }

      // 标准解析失败，使用 best-effort 解析器处理截断的 JSON
      try {
        const data = bestEffortParse(current);
        return { data, repaired: true, unescaped };
      } catch (err) {
        // 如果所有方法都失败，抛出原始错误
        throw firstError;
      }
    }
  };

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
      const { data, repaired, unescaped } = parseJson(inputJson);
      const formatted = JSON.stringify(data, null, indent);
      setFormattedJson(formatted);
      setParsedData(data);
      setError('');

      const warnings: string[] = [];
      if (unescaped) warnings.push('Input was auto-unescaped (converted escape sequences)');
      if (repaired) warnings.push('JSON was auto-repaired (truncated or malformed input was fixed)');
      setWarning(warnings.join('. '));
    } catch (err) {
      setError(`Cannot parse JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
      setWarning('');
    }
  };

  const minifyJson = () => {
    try {
      const { data, repaired, unescaped } = parseJson(inputJson);
      const minified = JSON.stringify(data);
      setFormattedJson(minified);
      setParsedData(data);
      setError('');

      const warnings: string[] = [];
      if (unescaped) warnings.push('Input was auto-unescaped (converted escape sequences)');
      if (repaired) warnings.push('JSON was auto-repaired (truncated or malformed input was fixed)');
      setWarning(warnings.join('. '));
    } catch (err) {
      setError(`Cannot parse JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
      setWarning('');
    }
  };

  const escapeJson = () => {
    try {
      const { data, repaired, unescaped } = parseJson(inputJson);
      const jsonString = JSON.stringify(data);
      // Escape the JSON string
      const escaped = JSON.stringify(jsonString);
      setFormattedJson(escaped);
      setParsedData(null);
      setError('');

      const warnings: string[] = [];
      if (unescaped) warnings.push('Input was auto-unescaped before escaping');
      if (repaired) warnings.push('JSON was auto-repaired (truncated or malformed input was fixed)');
      setWarning(warnings.join('. '));
    } catch (err) {
      setError(`Cannot parse JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
      setWarning('');
    }
  };

  const unescapeJson = () => {
    try {
      let current = inputJson.trim();
      let repaired = false;
      let unescaped = false;
      let iterations = 0;
      const maxIterations = 10; // Prevent infinite loops

      // Recursively unescape until we get an object/array or hit max iterations
      while (iterations < maxIterations) {
        const { data, repaired: currentRepaired, unescaped: currentUnescaped } = parseJson(current);
        repaired = repaired || currentRepaired;
        unescaped = unescaped || currentUnescaped;

        if (typeof data === 'string') {
          // If result is a string, continue unescaping
          current = data;
          iterations++;
        } else {
          // If it's an object or array, we're done
          const formatted = JSON.stringify(data, null, 2);
          setFormattedJson(formatted);
          setParsedData(data);
          setError('');

          // Build warning message
          const warnings: string[] = [];
          if (unescaped) {
            warnings.push('Input was auto-unescaped (converted escape sequences)');
          }
          if (repaired) {
            warnings.push('JSON was auto-repaired (truncated or malformed input was fixed)');
          }
          if (iterations > 0) {
            warnings.push(`Unescaped ${iterations + 1} layer(s) of escaped JSON`);
          }
          setWarning(warnings.join('. '));
          return;
        }
      }

      // Reached max iterations
      throw new Error(`Exceeded maximum unescape iterations (${maxIterations}). The input might be infinitely escaped.`);
    } catch (err) {
      setError(`Cannot unescape JSON: ${(err as Error).message}`);
      setFormattedJson('');
      setParsedData(null);
      setWarning('');
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
    setWarning('');
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

            {warning && (
              <Alert variant="warning" className="mt-3">
                {warning}
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
