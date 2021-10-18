import React from 'react'
interface Props {
    name: string,
    onClick?: () => void,
    style?: React.CSSProperties
    className?: string
}
const Icon = (props: Props) => {
    return (
        <i
            className={"fa fa-"+props.name+' '+(props.className || '')}
            onClick={props.onClick}
            style={props.style}
        />
    )
}

export default Icon