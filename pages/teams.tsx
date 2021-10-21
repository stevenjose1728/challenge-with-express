import React from 'react'
import { Team } from 'models'
import { quitLoading, setLoading, showError } from 'utils'
import { TeamService } from 'services'
import { Button, Modal, Table } from 'components'

export default function teams() {
    const [teams, setTeams] = React.useState<Team[]>([])
    const [visible, setVisible] = React.useState<boolean>(false)
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
      console.log('>> edit', element)
    }
    const handleDelete = (element: Team) => {
      console.log('>>: delete > ', element)
    }
    const handleClose = () => {
      setVisible(false)
      load()
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('on submit')
    }
    return (
      <>
        <Modal
          visible={visible}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit}>


          </form>
        </Modal>
        <Table
            header={
                ['#', 'Nombre', 'Consulta de equipo', 'Usuario', 'Responsable', 'Acciones']
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
