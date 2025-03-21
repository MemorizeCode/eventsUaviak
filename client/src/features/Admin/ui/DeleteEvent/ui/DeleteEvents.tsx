
import { AppDispatch, RootState } from "@/app/providers/store/store";
import { DeleteEventError, fetchDeleteEvent } from "@/features/Admin/models/service/fetchDeleteEvent";
import { Button, Card, Input, message, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteEvents = () => {
    const { Title } = Typography;

    const dispatch = useDispatch<AppDispatch>()
    const [idEvent, setIdEvent] = useState<number | string>('')


    async function deleteEvents() {
        const response = await dispatch(fetchDeleteEvent({ idEvent }))
        setIdEvent('')
        const payload = response.payload as DeleteEventError
        if (response.meta.requestStatus === "fulfilled") {
            message.success(response?.payload?.message)
        }
        else if (payload?.status === "warning") {
            message.warning(response?.payload?.message)
        }
        else {
            message.error(response.payload?.message)
        }
    }
    return (<>
        <Card>
            <Space direction="vertical">
                <Title level={2}>Удалить мероприятие</Title>
                <Input placeholder="ID мероприятия" onChange={e => setIdEvent(e.target.value)} value={idEvent} required />
                <Button type="primary" style={{ background: "red" }} onClick={deleteEvents}>Удалить</Button>
            </Space>
        </Card>
    </>);
}

export default DeleteEvents;