import React from 'react';
interface InputProps {
    name: string,
    type?: string,
    value: string,
    label?:string,
    labelClass?:string,
    isRequired?:boolean,
    placeholder?:string,
    className?:string,
    hasError?:boolean,
    errorMessage?:string,
    isDirty?:boolean,
    onChange?: (val: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    required?:boolean,
    disabled?: boolean
}

const Input = (props: InputProps) => {
    const getDefaultMessageError = (): string => {
        let defaultMessage = 'Este campo es requerido'
        const haveSymbol = props.value.includes('@')
        if(props.type === 'email' && !haveSymbol){
            defaultMessage = 'Correo electronico incorrecto, este debe incluir un @'
        }
        return defaultMessage
    }
    return (
        <div className="form-group">
            {
                props?.label && (
                    <label
                        className={props.labelClass}
                    >
                        {props.label} 
                        {
                            props.required && (
                                <strong className="text-danger ml-2">(*)</strong>
                            )
                        }
                    </label>
                )
            }
            <input
                disabled={props.disabled}
                name={props.name}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                type={props.type || 'text'}
                className={ `form-control ${props.className || ''} ${props.hasError ? 'is-invalid' : ''} ${props.value && !props.hasError ? 'is-valid' : ''}` }
                placeholder={props.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange?.(e.target.value)}
                value={props.value}
                required={props.required || false}
            />
            {
                props.hasError && (
                    <div className="invalid-feedback">
                        {props.errorMessage || getDefaultMessageError()}
                    </div>
                )
            }
        </div>
    )
}
export default Input;
