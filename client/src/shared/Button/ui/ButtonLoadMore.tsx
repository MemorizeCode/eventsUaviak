import { AppDispatch } from "@/app/providers/store/store";
import { eventsSliceActions } from "@/entities/EventsList";
import Button from "antd/es/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/providers/store/store";

const ButtonLoadMore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, total, eventList } = useSelector((state: RootState) => state.events);

    async function loadMore() {
        await dispatch(eventsSliceActions.loadMoreEvents());
        dispatch(eventsSliceActions.setIsLoading(false));
    }

    return (
        <>
        {
            eventList.length > 0 && (
            eventList.length < total ? (
                <Button
                    type="primary"
                style={{
                    backgroundColor: "#456b92",
                    color: "white",
                    position: 'relative',
                    left: '50%',
                    transform: 'translate(-50%)',
                    marginTop: '10px'
                }}
                onClick={loadMore}
                loading={isLoading}
            >
                    Загрузить еще
                </Button>
            ) : (
                <h2 style={{textAlign: 'center', marginTop: '15px', fontSize: '20px', fontWeight: 'bold'}}>Мероприятий больше нет</h2>
            ))
        }
        </>
    );
}

export default ButtonLoadMore;