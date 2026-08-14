import { buildStandaloneHtml as buildDocument } from '../core/document'
import type { TemplateDefinition, TemplateId, TemplateValues } from '../core/types'
import { cardsTemplate } from './cards'
import { featureTemplate } from './feature'
import { heroTemplate } from './hero'
import { stepsTemplate } from './steps'

export function defineTemplate(definition:TemplateDefinition):TemplateDefinition{
 if(!/^[a-z0-9-]+$/.test(definition.id))throw new Error(`Invalid template id: ${definition.id}`)
 const fieldIds=new Set<string>()
 for(const field of definition.fields){
 if(fieldIds.has(field.id))throw new Error(`Duplicate field id: ${field.id}`)
 fieldIds.add(field.id)
 }
 return definition
}

export const templateRegistry:TemplateDefinition[]=[
 featureTemplate,heroTemplate,stepsTemplate,cardsTemplate,
].map(defineTemplate)

const templateMap=new Map<TemplateId,TemplateDefinition>(templateRegistry.map((template)=>[template.id,template]))

export function getTemplate(id:TemplateId):TemplateDefinition{
 const template=templateMap.get(id)
 if(!template)throw new Error(`Unknown template: ${id}`)
 return template
}

export function buildStandaloneHtml(template:TemplateDefinition,values:TemplateValues):string{
 return buildDocument(template,values)
}

export type { TemplateDefinition, TemplateId, TemplateValues }
