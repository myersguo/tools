import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Form } from 'react-bootstrap';
import mermaid from 'mermaid';
import plantumlEncoder from 'plantuml-encoder';
import { Graphviz } from '@hpcc-js/wasm';
import flowchart from 'flowchart.js';
import { templates } from './templates';
import './App.css';

type DiagramType = 'mermaid' | 'plantuml' | 'graphviz' | 'flowchart';

function App() {
  const [diagramType, setDiagramType] = useState<DiagramType>('mermaid');
  const [mermaidCode, setMermaidCode] = useState<string>(templates.mermaid[0].code);
  const [plantumlCode, setPlantumlCode] = useState<string>(templates.plantuml[0].code);
  const [graphvizCode, setGraphvizCode] = useState<string>(templates.graphviz[0].code);
  const [flowchartCode, setFlowchartCode] = useState<string>(templates.flowchart[0].code);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('0');
  const [error, setError] = useState<string>('');
  const mermaidRef = useRef<HTMLDivElement>(null);
  const graphvizRef = useRef<HTMLDivElement>(null);
  const flowchartRef = useRef<HTMLDivElement>(null);

  // 根据当前类型获取对应的代码
  const code =
    diagramType === 'mermaid' ? mermaidCode :
    diagramType === 'plantuml' ? plantumlCode :
    diagramType === 'graphviz' ? graphvizCode :
    flowchartCode;

  // 更新当前类型的代码
  const handleCodeChange = (value: string) => {
    if (diagramType === 'mermaid') {
      setMermaidCode(value);
    } else if (diagramType === 'plantuml') {
      setPlantumlCode(value);
    } else if (diagramType === 'graphviz') {
      setGraphvizCode(value);
    } else {
      setFlowchartCode(value);
    }
  };

  // 初始化 Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  // 渲染图表
  useEffect(() => {
    const renderDiagram = async () => {
      setError('');

      if (diagramType === 'mermaid') {
        if (mermaidRef.current) {
          try {
            mermaidRef.current.innerHTML = '';
            const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
            mermaidRef.current.innerHTML = svg;
          } catch (err: any) {
            setError(`Mermaid 渲染错误: ${err.message || '未知错误'}`);
            mermaidRef.current.innerHTML = '';
          }
        }
      } else if (diagramType === 'graphviz') {
        if (graphvizRef.current) {
          try {
            graphvizRef.current.innerHTML = '';
            const graphviz = await Graphviz.load();
            const svg = graphviz.dot(graphvizCode);
            graphvizRef.current.innerHTML = svg;
          } catch (err: any) {
            setError(`Graphviz 渲染错误: ${err.message || '未知错误'}`);
            graphvizRef.current.innerHTML = '';
          }
        }
      } else if (diagramType === 'flowchart') {
        if (flowchartRef.current) {
          try {
            flowchartRef.current.innerHTML = '';
            const diagram = flowchart.parse(flowchartCode);
            diagram.drawSVG(flowchartRef.current, {
              'line-width': 2,
              'line-color': '#334BFA',
              'element-color': '#334BFA',
              'font-color': '#1a1a1a',
              'font-size': 14,
              'fill': 'white',
            });
          } catch (err: any) {
            setError(`Flowchart 渲染错误: ${err.message || '未知错误'}`);
            flowchartRef.current.innerHTML = '';
          }
        }
      }
    };

    const debounce = setTimeout(renderDiagram, 500);
    return () => clearTimeout(debounce);
  }, [mermaidCode, plantumlCode, graphvizCode, flowchartCode, diagramType]);

  // 切换图表类型
  const handleTypeChange = (type: DiagramType) => {
    setDiagramType(type);
    setSelectedTemplate('0'); // 重置为第一个模板
    setError('');
  };

  // 选择模板
  const handleTemplateChange = (templateIndex: string) => {
    setSelectedTemplate(templateIndex);
    const index = parseInt(templateIndex);
    const currentTemplates = templates[diagramType];

    if (currentTemplates && currentTemplates[index]) {
      const templateCode = currentTemplates[index].code;

      if (diagramType === 'mermaid') {
        setMermaidCode(templateCode);
      } else if (diagramType === 'plantuml') {
        setPlantumlCode(templateCode);
      } else if (diagramType === 'graphviz') {
        setGraphvizCode(templateCode);
      } else if (diagramType === 'flowchart') {
        setFlowchartCode(templateCode);
      }
    }
  };

  // 获取 PlantUML 图片 URL
  const getPlantUMLUrl = () => {
    try {
      const encoded = plantumlEncoder.encode(plantumlCode);
      return `https://www.plantuml.com/plantuml/png/${encoded}`;
    } catch (err) {
      setError('PlantUML 编码错误');
      return '';
    }
  };

  return (
    <div className="App">
      <div className="header">
        <Container fluid>
          <h1 className="title">Graph Viewer</h1>
          <p className="subtitle">可视化 Mermaid、PlantUML、Graphviz 和 Flowchart 图表</p>
        </Container>
      </div>

      <Container fluid className="main-content">
        <div className="toolbar">
          <div className="toolbar-top">
            <ButtonGroup>
              <Button
                variant={diagramType === 'mermaid' ? 'primary' : 'outline-primary'}
                onClick={() => handleTypeChange('mermaid')}
                className="type-button"
              >
                Mermaid
              </Button>
              <Button
                variant={diagramType === 'plantuml' ? 'primary' : 'outline-primary'}
                onClick={() => handleTypeChange('plantuml')}
                className="type-button"
              >
                PlantUML
              </Button>
              <Button
                variant={diagramType === 'graphviz' ? 'primary' : 'outline-primary'}
                onClick={() => handleTypeChange('graphviz')}
                className="type-button"
              >
                Graphviz
              </Button>
              <Button
                variant={diagramType === 'flowchart' ? 'primary' : 'outline-primary'}
                onClick={() => handleTypeChange('flowchart')}
                className="type-button"
              >
                Flowchart
              </Button>
            </ButtonGroup>
          </div>
          <div className="toolbar-bottom">
            <Form.Label className="template-label">选择模板：</Form.Label>
            <Form.Select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="template-select"
            >
              {templates[diagramType].map((template, index) => (
                <option key={index} value={index}>
                  {template.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <Row className="editor-row">
          <Col md={6} className="editor-col">
            <div className="panel">
              <div className="panel-header">
                <h5>代码编辑器</h5>
              </div>
              <Form.Control
                as="textarea"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="code-editor"
                placeholder={`在此输入 ${
                  diagramType === 'mermaid' ? 'Mermaid' :
                  diagramType === 'plantuml' ? 'PlantUML' :
                  diagramType === 'graphviz' ? 'Graphviz (DOT)' :
                  'Flowchart'
                } 代码...`}
                spellCheck={false}
              />
            </div>
          </Col>

          <Col md={6} className="preview-col">
            <div className="panel">
              <div className="panel-header">
                <h5>预览</h5>
              </div>
              <div className="preview-content">
                {error ? (
                  <div className="error-message">{error}</div>
                ) : (
                  <>
                    {diagramType === 'mermaid' && (
                      <div ref={mermaidRef} className="mermaid-container" />
                    )}
                    {diagramType === 'plantuml' && (
                      <div className="plantuml-container">
                        <img
                          src={getPlantUMLUrl()}
                          alt="PlantUML Diagram"
                          onError={() => setError('PlantUML 图片加载失败')}
                        />
                      </div>
                    )}
                    {diagramType === 'graphviz' && (
                      <div ref={graphvizRef} className="graphviz-container" />
                    )}
                    {diagramType === 'flowchart' && (
                      <div ref={flowchartRef} className="flowchart-container" />
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="footer">
        <Container fluid>
          <p>
            支持{' '}
            <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">Mermaid</a>、
            <a href="https://plantuml.com/" target="_blank" rel="noopener noreferrer">PlantUML</a>、
            <a href="https://graphviz.org/" target="_blank" rel="noopener noreferrer">Graphviz</a> 和{' '}
            <a href="http://flowchart.js.org/" target="_blank" rel="noopener noreferrer">Flowchart</a> 语法
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
