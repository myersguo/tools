import type { TemplateDefinition, TemplateValues } from '../templates'

interface Props {
 template:TemplateDefinition
 values:TemplateValues
 onChange:(values:TemplateValues)=>void
}

export function TemplateFields({template,values,onChange}:Props){
 return <div className="field-stack">
 {template.fields.map((field)=><div className="field" key={field.id}>
 <label htmlFor={field.id}>{field.label}</label>
 {field.kind==='textarea'
 ? <textarea id={field.id} rows={field.rows} value={values[field.id]} onChange={(event)=>onChange({...values,[field.id]:event.target.value})}/>
 : <input id={field.id} value={values[field.id]} onChange={(event)=>onChange({...values,[field.id]:event.target.value})}/>} 
 <p className="hint">{field.hint}</p>
 </div>)}
 </div>
}
