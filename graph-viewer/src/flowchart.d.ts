declare module 'flowchart.js' {
  interface FlowchartOptions {
    'line-width'?: number;
    'line-color'?: string;
    'element-color'?: string;
    'font-color'?: string;
    'font-size'?: number;
    'fill'?: string;
    [key: string]: any;
  }

  interface FlowchartDiagram {
    drawSVG(element: HTMLElement, options?: FlowchartOptions): void;
  }

  interface Flowchart {
    parse(code: string): FlowchartDiagram;
  }

  const flowchart: Flowchart;
  export default flowchart;
}
