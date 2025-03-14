import Event from "@/widget/Event/Event";
import ModalRecord from "@/widget/Modal/ModalRecord/ModaRecord";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetEvents } from "../model/service/fetchEventList";
import ModalGroup from "@/widget/Modal/ModalRecordGroup/ModalGroup";
const Events = () => {

    const dispatch = useDispatch()
    const events = useSelector((state: any) => state.events.eventList)
    const isLoading = useSelector((state: any) => state.events.isLoading)
    useEffect(() => {
        dispatch(fetchGetEvents())
    }, [])

    const [modalRecord, setModalRecord] = useState(false)
    const [currentEventId, setCurrentEventId] = useState<number | null>(null)

    const [modalGroup, setModalGroup] = useState(false)


    const openModal = (id: number) => {
        setCurrentEventId(id)
        setModalRecord(true)
    }

    const closeModal = () => {
        setModalRecord(false)
    }

    const openModalGroup = (id: any) => {
        setCurrentEventId(id)
        setModalGroup(true)
    }

    const closeModalGroup = () => {
        setModalGroup(false)
    }
    return <>
        {
            isLoading ? <h2>Загрузка...</h2> :
                events && events.length ? events?.map((e: any) => {
                    return (<Event event={e.event} key={e.event.id} openModal={() => openModal(e.event.id)} openModalGroup={() => openModalGroup(e.event.id)} mest={e.ostalosMest} />)
                }) : <h2>Мероприятий нет</h2>
        }
        <ModalRecord isOpen={modalRecord} closeModal={closeModal} idEvent={currentEventId} />
        <ModalGroup isOpen={modalGroup} closeModal={closeModalGroup} idEvent={currentEventId} />
    </>;
}

export default Events;