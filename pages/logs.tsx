import { Log } from 'models'
import React from 'react'
import { LogService } from 'services'
import { quitLoading, setLoading, showError } from 'utils'

export default function logs() {
    const [logs, setLogs] = React.useState<Log[]>([])
    const load = async () => {
        try {
            setLoading()
            const _logs = await LogService.getAll()
            console.log('>>: res . ', _logs)
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
        <div>
            logs
        </div>
    )
}
