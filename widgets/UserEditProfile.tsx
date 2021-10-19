import { Button } from 'components'
import React from 'react'

type Props = {
    editProfile: () => void
}
export default function UserEditProfile(props: Props) {
    return (
        <div className='w-100 text-center'>
            Para Editar tu perfil
            <Button
                label="Haz click aqui"
                icon="edit"
                onClick={props.editProfile}
            />
        </div>
    )
}
