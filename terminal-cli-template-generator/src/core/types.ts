export type TemplateId = string
export type FieldId = string
export type TemplateValues = Record<string, string>

export interface TemplateField {
 id: FieldId
 label: string
 kind: 'text' | 'textarea'
 hint: string
 rows?: number
}

export interface RenderResult {
 body: string
 title?: string
 css?: string
 script?: string
}

export interface TemplateDefinition {
 id: TemplateId
 name: string
 description: string
 fields: TemplateField[]
 sample: TemplateValues
 render(values: TemplateValues): RenderResult
}
