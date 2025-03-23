import Event from "@/widget/Event/Event";
import ModalRecord from "@/widget/Modal/ModalRecord/ModaRecord";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetEvents } from "../model/service/fetchEventList";
import ModalGroup from "@/widget/Modal/ModalRecordGroup/ModalGroup";
import Flex from "antd/es/flex";
import { RootState } from "@/app/providers/store/store";

const Events = memo(() => {
    const dispatch = useDispatch()
    const events = useSelector((state: RootState) => state.events.eventList)
    const isLoading = useSelector((state: RootState) => state.events.isLoading)

    useEffect(() => {
        dispatch(fetchGetEvents())
    }, [dispatch])

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

    const openModalGroup = (id: number) => {
        setCurrentEventId(id)
        setModalGroup(true)
    }

    const closeModalGroup = () => {
        setModalGroup(false)
    }

    return <>
        <Flex gap="middle" wrap="wrap" flex="1">
            {
                isLoading ? <h2>Загрузка...</h2> :
                    Array.isArray(events) && events?.length ? events?.map((e: any) => {
                        return (<Event event={e.event} key={e.event.id} openModal={() => openModal(e.event.id)} openModalGroup={() => openModalGroup(e.event.id)} mest={e.ostalosMest} />)
                    }) : <h2>Мероприятий нет</h2>
            }
        </Flex>
        <ModalRecord isOpen={modalRecord} closeModal={closeModal} idEvent={currentEventId} />
        <ModalGroup isOpen={modalGroup} closeModal={closeModalGroup} idEvent={currentEventId} />
    </>;
})

export default Events;