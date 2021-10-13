import React from 'react'
interface Props {
    name: string,
    onClick?: () => void,
    style?: React.CSSProperties
}
const Icon = (props: Props) => {
    return (
        <i
            className={"fa fa-"+props.name}
            onClick={props.onClick}
            style={props.style}
        />
    )
}

export default Icon