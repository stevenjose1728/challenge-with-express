import React from 'react'
import { Movement, Team, User, MovementParams as Form } from 'models'
import { quitLoading, setLoading, showError, showSuccess } from 'utils'
import { MovementService, TeamService, UserService } from 'services'
import { Button, Datepicker, Modal, Select, Table } from 'components'
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
            const _form = {
                ... IFormState,
                userId: _users?.[0]?.id || 0,
                teamId: _teams?.[0]?.id || 0
            }
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
        const _form: Form = {
            ... IFormState,
            userId: element.userId,
            teamId: element.teamId,
            since: moment(element.since).toDate(),
            until: moment(element.until).toDate(),
            id: element.id
        }
        setForm(_form)
        setVisible(true)
    }
    const handleDelete = (element: Movement) => {
        console.log('>>: delete > ')
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(!form.userId || !form.teamId){
                showSuccess('Debe llenar el campo de usuario y equipo')
            }else{
                setLoading()
                let msg = ''
                console.log('>>: form > ', form)
                if(!form.id){
                    const res = await MovementService.save(form)
                    msg = res.message
                }else{
                    const update = await MovementService.update(form)
                    msg = update.message
                }
                showSuccess(msg)
                handleClose()
            }
        } catch (error) {
            showError()
        }finally{
            quitLoading()
        }
    }
    return (
        <>
            <Modal
                onClose={handleClose}
                visible={visible}
                title="Crear/Editar movimiento"
            >
                <form
                    onSubmit={handleSubmit}
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
                            <div className="col-md-6 col-sm-12">
                                <Datepicker
                                    onChange={(value: Date) => handleChange('since', value)}
                                    value={form.since}
                                    labelColor="text-dark"
                                    label="Desde"
                                    minDate={moment().toDate()}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <Datepicker
                                    onChange={(value: Date) => handleChange('until', value)}
                                    value={form.until}
                                    label="Hasta"
                                    labelColor="text-dark"
                                    minDate={moment().toDate()}
                                />
                            </div>
                        </div>
                        <Button
                            label="Guardar"
                            type="submit"
                        />
                    </div>
                </form>
            </Modal>
            <Table
                header={
                    ['#', 'Usuario', 'Equipo', 'Desde', 'Hasta', 'Acciones']
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
                                <td> {element.user?.name} </td>
                                <td> {element.team?.name} </td>
                                <td> {moment(element.since).format('DD-MM-YYYY HH:mm A')} </td>
                                <td> {moment(element.until).format('DD-MM-YYYY HH:mm A')} </td>
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
