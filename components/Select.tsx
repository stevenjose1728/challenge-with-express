import React from 'react';
type Options = {
    value: number | string,
    label: string,
}

interface SelectProps {
    name: string,
    value: string|number,
    label?:string,
    labelClass?:string,
    isRequired?:boolean,
    placeholder?:string,
    className?:string,
    msgError?:string,
    isDirty?:boolean,
    onChange?: (value: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    hasError?: boolean,
    errorMessage?: string,
    required?:boolean,
    options:Options[],
    disabled?: boolean,
}

export default class Select extends React.Component<SelectProps, {value:string|number|{}}> {
    render() {
        return (
            <div className="form-group">
                {
                    this.props?.label && (
                        <label className={this.props.labelClass}>
                            {this.props.label} 
                            {
                                this.props.required && (
                                    <strong className="text-danger ml-2">(*)</strong>
                                )
                            }
                        </label>
                    )
                }
                <select
                    disabled={this.props.disabled}
                    name={this.props.name}
                    value={this.props.value}
                    className={ `form-control ${ this.props.className } ${this.props.hasError ? 'is-invalid' : ''} ${this.props.value && !this.props.hasError ? 'is-valid' : ''}` }
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.props.onChange?.(e.target.value)}
                    placeholder={this.props.placeholder}
                >
					<option value="" disabled>Seleccione</option>
					{
                        this.props.options.map((i,index) => {
                            return (
                                <option 
                                    key={ index } 
                                    value={ i.value }
                                >
                                    { i.label }
                                </option>
                            )
                        })
                    }
				</select>
                {
                    this.props.hasError && (
                        <div className="invalid-feedback">
                            {this.props.msgError}
                        </div>
                    )
                }
            </div>
        )
    }
};