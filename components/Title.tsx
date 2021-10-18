import React from 'react';

type Props = {
    name: string,
    right?: JSX.Element
}
const Title = (props: Props) => (
	<h2 className="title-component">
		<div className="row">
			<div className="col-md-10 col-sm-12">
				{ props.name }
			</div>
			<div className="col-md-2 col-sm-12 text-right">
				{ props.right && <div className="title-component-right">
					{ props.right }
				</div> }
			</div>
		</div>
	</h2>
)

export default Title;