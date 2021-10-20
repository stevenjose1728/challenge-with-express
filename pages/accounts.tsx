import { Button, Input, Modal, Select, Table } from 'components'
import { Account, User } from 'models'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { AccountService, UserService } from 'services'
import { quitLoading, setLoading, showError, showSuccess } from 'utils'

export default function accounts() {
    const defaultAccountState: Account = {
        createdAt: '',
        updatedAt: '',
        deletedAt: null,
        name: '',
        teamConsultation: '',
        responsableId: 0,
        userId: 0
    }
    const user = useSelector((state: RootState) => state.user)
    const [accounts, setAccounts] = React.useState<Account[]>([])
    const [users, setUsers] = React.useState<User[]>([])
    const [visible, setVisible] = React.useState<boolean>(false)
    const [form, setForm] = React.useState<Account>(defaultAccountState)
    const router = useRouter()
    const handleEdit = (element: Account) => {
        let _element = {... element}
        if(_element.responsable)
            delete _element.responsable
        if(_element.user)
            delete _element.user
        setForm(_element)
        setVisible(true)
    }
    const handleDelete = (element: Account) => {
        console.log('>>: handleDelete > ', element)
    }
    const load = async () => {
        try {
            setLoading()
            const res = await AccountService.getAll()
            const users = await UserService.getAll()
            setForm({
                ... defaultAccountState,
                userId: users?.[0]?.id || 0,
                responsableId: users?.[0]?.id || 0
            })
            setUsers(users)
            setAccounts(res)
        } catch (error) {
            showError()
        }finally{
            quitLoading()
        }
    }
    React.useEffect(() => {
        load()
        if(!user || !user.isAdmin){
            router.push({
                pathname: '/',
            });
        }
    }, [user])
    const handleClose = () => {
        setForm(defaultAccountState)
        load()
        setVisible(false)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!!!form.responsableId || !!!form.userId){
            showError('Los campos de Responsable y usuarios son requeridos')
        }else{
            try {
                setLoading()
                const res = await AccountService.save(form)
                showSuccess(res.message)
                load()
                handleClose()
                setForm(defaultAccountState)
            } catch (error) {
                showError()
            }finally{
                quitLoading()
            }
        }
    }
    const handleForm = (key: keyof Account, value: string | number) => {
        const _form = {
            ... form,
            [key]: value
        }
        setForm(_form)
    }
    return (
        <>
            <Modal
                visible={visible}
                onClose={() => handleClose()}
                title="Crear/Editar cuenta"
            >
                <div className="container w-100">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={(value: string) => handleForm('name', value)}
                                    label="Nombre"
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <Input
                                    name="teamConsultation"
                                    value={form.teamConsultation}
                                    onChange={(value: string) => handleForm('teamConsultation', value)}
                                    label="Consulta de equipo"
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <Select
                                    name="user"
                                    options={users.map(element => {
                                        return{
                                            label: element.name,
                                            value: element.id || ''
                                        }
                                    })}
                                    label="Usuario"
                                    value={form.userId}
                                    onChange={(value: string) => handleForm('userId', parseInt(value))}
                                    />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <Select
                                    name="responsableId"
                                    label="Responsable"
                                    options={users.map(element => {
                                        return{
                                            label: element.name,
                                            value: element.id || ''
                                        }
                                    })}
                                    value={form.responsableId}
                                    onChange={(value: string) => handleForm('responsableId', parseInt(value))}
                                />
                            </div>
                        </div>
                        <div className="w-100 text-center">
                            <Button
                                label="Guardar"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </Modal>
            <Table
                header={
                    ['#', 'Nombre', 'Consulta de equipo', 'Usuario', 'Responsable', 'Acciones']
                }
                data={accounts.length}
                title="Cuentas"
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
                    accounts?.map((element, i) => {
                        return(
                            <tr key={ i }>
                                <th scope="row">{ element.id }</th>
                                <td> {element.name} </td>
                                <td> {element.teamConsultation} </td>
                                <td> {element.user?.name} </td>
                                <td> {element.responsable?.name} </td>
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
