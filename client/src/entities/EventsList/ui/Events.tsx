import Event from "@/widget/Event/Event";
import ModalRecord from "@/widget/Modal/ModalRecord/ModaRecord";
import { memo, useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetEvents, FetchGetEventsData } from "../model/service/fetchEventList";
import ModalGroup from "@/widget/Modal/ModalRecordGroup/ModalGroup";
import Flex from "antd/es/flex";
import { AppDispatch, RootState } from "@/app/providers/store/store";


const Events = memo(() => {
    const dispatch = useDispatch<AppDispatch>();

    const { eventList, isLoading, page, limit } = useSelector((state: RootState) => ({
        eventList: state.events.eventList,
        isLoading: state.events.isLoading,
        page: state.events.page,
        limit: state.events.limit
    }));

    useEffect(() => {
        dispatch(fetchGetEvents({ limit, page }));
    }, [dispatch, page, limit]);

    const [currentEventId, setCurrentEventId] = useState<number | null>(null);
    const [modalRecord, setModalRecord] = useState(false);
    const [modalGroup, setModalGroup] = useState(false);

    const openModal = useCallback((id: number) => {
        setCurrentEventId(id);
        setModalRecord(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalRecord(false);
    }, []);

    const openModalGroup = useCallback((id: number) => {
        setCurrentEventId(id);
        setModalGroup(true);
    }, []);

    const closeModalGroup = useCallback(() => {
        setModalGroup(false);
    }, []);

    const eventsContent = useMemo(() => {
        if (!Array.isArray(eventList) || !eventList.length) {
            return isLoading ? <h2>Загрузка...</h2> : <h2>Мероприятий нет</h2>;
        }

        return eventList.map((e: FetchGetEventsData) => (
            <Event
                event={e.event}
                key={e.event.id}
                openModal={() => openModal(e.event.id)}
                openModalGroup={() => openModalGroup(e.event.id)}
                mest={e.ostalosMest}
            />
        ));
    }, [eventList]);

    return (
        <>
            <Flex gap="middle" wrap="wrap" flex="1">
                {eventsContent}
            </Flex>
            <ModalRecord isOpen={modalRecord} closeModal={closeModal} idEvent={currentEventId} />
            <ModalGroup isOpen={modalGroup} closeModal={closeModalGroup} idEvent={currentEventId} />
        </>
    );
});

export default Events;