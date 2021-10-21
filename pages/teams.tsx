import React from 'react'
import { Team } from 'models'
import { quitLoading, setLoading, showError, showSuccess } from 'utils'
import { TeamService } from 'services'
import { Button, Input, Modal, Table } from 'components'

type Form = {
  name: string,
  id?: number
}
export default function teams() {
    const defaultFormState: Form = {
      name: ''
    }
    const [teams, setTeams] = React.useState<Team[]>([])
    const [visible, setVisible] = React.useState<boolean>(false)
    const [form, setForm] = React.useState<Form>(defaultFormState)
    const load = async () => {
        try {
            setLoading()
            const _teams = await TeamService.getAll()
            setTeams(_teams) 
        } catch (error) {
            showError()
        }finally{
            quitLoading()
        }
    }
    React.useEffect(() => {
        load()
    }, [])
    const handleEdit = (element: Team) => {
      const _form = {
        name: element.name,
        id: element.id
      }
      setForm(_form)
      setVisible(true)
    }
    const handleDelete = (element: Team) => {
      console.log('>>: delete > ', element)
    }
    const handleClose = () => {
      setVisible(false)
      load()
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        setLoading()
        if(!form.name){
          showError('Debe llenar el nombre del equipo')
        }else{
          let msg = ''
          if(form.id){
            const update = await TeamService.update(form.name, form.id)
            msg = update.message
          }else{
            const res = await TeamService.save(form.name)
            msg = res.message
          }
          showSuccess(msg)
          handleClose()
        }
      } catch (error) {
        showError()
      }finally{
        quitLoading()
      }
      console.log('on submit')
    }
    const handleChange = (name: string) => {
      const _form = {
        ... form,
        name
      }
      setForm(_form)
    }
    return (
      <>
        <Modal
          visible={visible}
          onClose={handleClose}
          title='Crear/Editar Equipos'
        >
          <form onSubmit={handleSubmit}>
            <div className="container">
              <Input
                name="name"
                value={form.name}
                onChange={(value: string) => handleChange(value)}
                label="Nombre"
              />
              <Button
                label="Guardar"
                type="submit"
              />
            </div>
          </form>
        </Modal>
        <Table
            header={
                ['#', 'Nombre', 'Acciones']
            }
            data={teams.length}
            title="Equipos"
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
                teams?.map((element, i) => {
                    return(
                        <tr key={ i }>
                            <th scope="row">{ element.id }</th>
                            <td> {element.name} </td>
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
