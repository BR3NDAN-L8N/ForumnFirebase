// REACT
import React, { ReactElement, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// DATABASE
import { DB_getThreadById } from '../../Firebase/DB/Threads'
// INTERFACE
import { IThreadObject } from '../../Interfaces/_index';

export default function Thread(): ReactElement {

    const [thread, setThread] = useState<IThreadObject>(Object)

    let { id }: any = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const currentThread = await DB_getThreadById(id)
            if (currentThread === undefined) { return }
            if (currentThread.status === 'fail') {
                setThread({
                    id: 'unavailable',
                    title: 'unavailable',
                    message: 'unavailable',
                    creatorsName: 'unavailable',
                    creatorsIcon: 'unavailable',
                    creatorsId: 'unavailable'
                })
                return
            }
            return setThread({
                id: currentThread.id,
                title: currentThread.title,
                message: currentThread.message,
                creatorsName: currentThread.creatorsName,
                creatorsIcon: currentThread.creatorsIcon,
                creatorsId: currentThread.creatorsId
            })
        }

        fetchData()
    }, [id])

    return (
        <section>
            <h2>{thread.title}</h2>
            <p>{thread.message}</p>
            <strong>Author: </strong><span>{ thread.creatorsName}</span>
        </section>
    )
}
