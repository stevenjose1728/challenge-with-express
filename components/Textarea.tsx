import React from 'react';
interface Props {
    name: string,
    label?: string,
    rows?: number,
    value?: string,
    onChange: (value: string) => void,
	placeholder?: string
}
const Textarea = (props: Props) => (
	<div className="form-group">
		{ props.label && <label htmlFor={ props.name }>{ props.label }</label> }
		<textarea 
			{ ...props }
            value={props.value ||''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange?.(e.target.value)}
			rows={ props.rows || 4 }
			placeholder={props.placeholder}
			// type={ props.type ? props.type : 'text' }
			className="form-control"
			name={ props.name }>
		</textarea>
	</div>
)

export default Textarea;