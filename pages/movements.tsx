import React from 'react'
import { Movement, Team, User, MovementParams as Form } from 'models'
import { quitLoading, setLoading, showError } from 'utils'
import { MovementService, TeamService, UserService } from 'services'
import { Button, Modal, Select, Table } from 'components'
import moment from 'moment'

export default function movements() {
    const IFormState: Form = {
        userId: 0,
        since: moment().toDate(),
        until: moment().toDate(),
        teamId: 0
    }
    const [movements, setMovements] = React.useState<Movement[]>([])
    const [teams, setTeams] = React.useState<Team[]>([])
    const [users, setUsers] = React.useState<User[]>([])
    const [visible, setVisible] = React.useState<boolean>(false)
    const [form, setForm] = React.useState<Form>(IFormState)
    const load = async () => {
        try {
            setLoading()
            const _movements = await MovementService.getAll()
            const _teams = await TeamService.getAll()
            const _users = await UserService.getAll()
            setMovements(_movements)
            setTeams(_teams)
            setUsers(_users)
        } catch (error) {
            showError()
        }finally{
            quitLoading()
        }
    }
    React.useEffect(() => {
        load()
    }, [])

    const handleClose = () => {
        load()
        setVisible(false)
    }
    const handleChange = (key: keyof Form, value: string | number | Date) => {
        const _form = {
            ... form,
            [key]: value
        }
        setForm(_form)
    }
    const handleEdit = (element: Movement) => {
        console.log('>>: edit')
    }
    const handleDelete = (element: Movement) => {
        console.log('>>: delete > ')
    }
    return (
        <>
            <Modal
                onClose={handleClose}
                visible={visible}
                title="Crear/Editar movimiento"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <Select
                                name="userId"
                                value={form.userId}
                                options={users.map(element => {
                                    return{
                                        label: element.name,
                                        value: element.id || ''
                                    }
                                })}
                                label="Usuario"
                                onChange={(value: string) => handleChange('userId', parseInt(value))}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <Select
                                name="teamId"
                                value={form.teamId}
                                options={teams.map(element => {
                                    return{
                                        label: element.name,
                                        value: element.id || ''
                                    }
                                })}
                                label="Equipo"
                                onChange={(value: string) => handleChange('teamId', parseInt(value))}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <Table
                header={
                    ['#', 'Nombre', 'Acciones']
                }
                data={teams.length}
                title="Movimientos"
                right={
                    <Button
                        icon="plus"
                        className="primary"
                        small
                        onClick={() => setVisible(true)}
                    />
                }
            >
                {
                    movements?.map((element, i) => {
                        return(
                            <tr key={ i }>
                                <th scope="row">{ element.id }</th>
                                {/* <td> {element.name} </td> */}
                                <td>
                                    <Button
                                        icon="edit"
                                        className="info text-white"
                                        onClick={() => handleEdit(element)}
                                        small
                                    />
                                    <Button
                                        icon="trash"
                                        className="danger text-white"
                                        onClick={() => handleDelete(element)}
                                        small
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
            </Table>
        </>
    )
}
