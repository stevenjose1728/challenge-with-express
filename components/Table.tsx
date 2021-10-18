import React from 'react';
import Title from './Title';

type Props = {
    data: number,
    header: string[],
    title?: string,
    right?: JSX.Element
    children: JSX.Element | JSX.Element[]
}
const Table = (props: Props) => {

	return (
		<div className="table-container">
			<Title right={ props.right } name={ props.title || '' } />
            {
                !props.data ?
                    <h2 className="no-table-data">No hay registros</h2>
                :
                <table className="table table-component table-responsive w-100 d-block d-md-table">
                    <thead>
                        <tr>
                            {
                                props.header.map((i,index) => {
                                    return (
                                        <th
                                            key={ index }
                                            scope="col"
                                            className="ellipsis"
                                        >
                                            { i }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { props.children }
                    </tbody>
                </table>
            }
		</div>
	)
}

export default Table;