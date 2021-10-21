import { Table } from 'components'
import { Log } from 'models'
import moment from 'moment'
import React from 'react'
import { LogService } from 'services'
import { quitLoading, setLoading, showError } from 'utils'

export default function logs() {
    const [logs, setLogs] = React.useState<Log[]>([])
    const load = async () => {
        try {
            setLoading()
            const _logs = await LogService.getAll()
            setLogs(_logs)
        } catch (error) {
            showError()
        }finally{
            quitLoading()
        }
    }
    React.useEffect(() => {
        load()
    }, [])
    return (
        <Table
            header={
                ['#', 'Acciones']
            }
            data={logs.length}
            title="Equipos"
        >
            {
                logs?.map((element, i) => {
                    return(
                        <tr key={ i }>
                            <th scope="row">{ element.id }</th>
                            <td>
                                {element.type+' el movimiento #'+element.movementId}
                                {
                                    element.movement && (
                                        <div className='row'>
                                            <div className="col-md-6 col-sm-12">
                                                <p>
                                                    Desde: {moment(element.movement.since).format('DD-MM-YYYY HH:mm A')}
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <p>
                                                    Hasta: {moment(element.movement.until).format('DD-MM-YYYY HH:mm A')}
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <p>
                                                    Equipo: {element.movement.team?.name}
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <p>
                                                    Usuario: {element.movement.user?.name}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                    )
                })
            }
        </Table>
    )
}
