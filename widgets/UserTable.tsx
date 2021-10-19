import { Button, Table } from 'components'
import { User } from 'models'
import React from 'react'

type UserForm = User & {
    password: string,
    password_confirmation: string
    edit?: boolean
}
type Props = {
    users: User[],
    setVisible: (param: boolean) => void,
    getRoleNameById: (role: number) => string,
    editUser: (element: User) => void,
    deleteUser: (element: User) => void
}
export default function UserTable(props: Props) {
    return (
        <Table
            header={
                ['#', 'Nombre', 'Email', 'Rol', 'Acciones']
            }
            data={props.users.length}
            title="Usuarios"
            right={
                <Button
                    icon="plus"
                    className="primary"
                    small
                    onClick={() => props.setVisible(true)}
                />
            }
        >
            {
                props.users?.map((element, i) => {
                    return(
                        <tr key={ i }>
                            <th scope="row">{ element.id }</th>
                            <td> {element.name} </td>
                            <td> {element.email} </td>
                            <td> {props.getRoleNameById(element.role)} </td>
                            <td>
                                <Button
                                    icon="edit"
                                    className="info text-white"
                                    onClick={() => props.editUser(element)}
                                    small
                                />
                                <Button
                                    icon="trash"
                                    className="danger text-white"
                                    onClick={() => props.deleteUser(element)}
                                    small
                                />
                            </td>
                        </tr>
                    )
                })
            }
        </Table>
    )
}
