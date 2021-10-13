import React from 'react';
import Icon from './Icon'
interface PropsButton {
	onClick?:() => void,
	key?:string|number,
	label?:string,
	className?:string,
	type?:"button" | "submit" | "reset",
	disabled?: boolean
    icon?: string
}


const _Button:React.FC<PropsButton>  = (props: PropsButton) => {
	return (
        <button
            disabled={props.disabled}
            className={'btn btn-'+(props.className || 'primary')}
            onClick={props.onClick}
            type={props.type || 'button'}
        >
            {
                props.label
            }
            {
                props.icon && (
                    <Icon
                        name={props.icon}
                    />
                )
            }
        </button>
	)

}

export default _Button;
