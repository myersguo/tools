import React, { useState, ChangeEvent } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { Container, Row, Col, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import './App.css';

const placeholderJson = {
  "name": "Gemini",
  "version": "1.0",
  "features": [
    "JSON Diff",
    "Side-by-side view",
    "Unified view"
  ],
  "bugs": null
};

const placeholderJson2 = {
  "name": "Gemini",
  "version": "1.5",
  "features": [
    "JSON Diff",
    "Side-by-side view",
    "Unified view",
    "File Upload"
  ],
  "status": "beta"
};


function App() {
  const [leftJson, setLeftJson] = useState(JSON.stringify(placeholderJson, null, 2));
  const [rightJson, setRightJson] = useState(JSON.stringify(placeholderJson2, null, 2));
  const [isSideBySide, setIsSideBySide] = useState(true);
  const [showDiff, setShowDiff] = useState(false);
  const [showDiffOnly, setShowDiffOnly] = useState(true);
  const [linesAroundDiff, setLinesAroundDiff] = useState(3);


  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDiffClick = () => {
    setShowDiff(true);
  }

  const radios = [
    { name: 'Side-by-Side', value: 'true' },
    { name: 'Unified', value: 'false' },
  ];

  return (
    <div className="App">
      <Container fluid>
        <div className="text-center">
          <h1 className="my-4">JSON Diff Viewer</h1>
          <p className="lead text-muted">
            Instantly compare two JSON documents and highlight the differences. Paste your code into the 'Old' and 'New' text areas, or load from a file, to analyze and view the changes.
          </p>
        </div>
        <Row>
          <Col md={6}>
            <h2>Old JSON</h2>
            <Form.Group>
              <Form.Label>Load from file</Form.Label>
              <Form.Control type="file" accept=".json" onChange={handleFileChange(setLeftJson)} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Or paste JSON here</Form.Label>
              <Form.Control
                as="textarea"
                rows={15}
                value={leftJson}
                onChange={(e) => setLeftJson(e.target.value)}
                className="json-textarea"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <h2>New JSON</h2>
            <Form.Group>
              <Form.Label>Load from file</Form.Label>
              <Form.Control type="file" accept=".json" onChange={handleFileChange(setRightJson)} />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Or paste JSON here</Form.Label>
              <Form.Control
                as="textarea"
                rows={15}
                value={rightJson}
                onChange={(e) => setRightJson(e.target.value)}
                className="json-textarea"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="my-4">
          <Col className="text-center">
            <Button onClick={handleDiffClick} size="lg">Show Diff</Button>
          </Col>
        </Row>

        {showDiff && (
          <>
            <Row className="my-3 justify-content-center align-items-center">
              <Col md="auto">
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={isSideBySide === (radio.value === 'true') ? 'primary' : 'outline-primary'}
                      name="radio"
                      value={radio.value}
                      checked={isSideBySide === (radio.value === 'true')}
                      onChange={(e) => setIsSideBySide(e.currentTarget.value === 'true')}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
              <Col md="auto" className="mx-2">
                <Form.Check
                  type="switch"
                  id="show-diff-only-switch"
                  label="Show Diffs Only"
                  checked={showDiffOnly}
                  onChange={() => setShowDiffOnly(!showDiffOnly)}
                />
              </Col>
              {showDiffOnly && (
                <Col md="auto">
                  <Form.Group as={Row} className="align-items-center m-0">
                    <Form.Label column sm="auto" className="pr-2">Lines around diff</Form.Label>
                    <Col sm="auto">
                      <Form.Control
                        type="number"
                        value={linesAroundDiff}
                        onChange={(e) => setLinesAroundDiff(parseInt(e.target.value, 10))}
                        min={0}
                        style={{ width: '80px' }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <ReactDiffViewer
                  oldValue={leftJson}
                  newValue={rightJson}
                  splitView={isSideBySide}
                  useDarkTheme={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches}
                  showDiffOnly={showDiffOnly}
                  extraLinesSurroundingDiff={linesAroundDiff}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;