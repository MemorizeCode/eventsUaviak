import { AppDispatch } from "@/app/providers/store/store";
import { DeleteEventError, fetchDeleteEvent } from "@/features/Admin/models/service/fetchDeleteEvent";

import { memo, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";

const { Title } = Typography;

const DeleteEvents = memo(() => {
    const MemoizedTitle = useMemo(() => <Title level={2}>Удалить мероприятие</Title>, []);

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
        <Card style={{ minWidth: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {MemoizedTitle}
                <Input placeholder="ID мероприятия" onChange={e => setIdEvent(e.target.value)} value={idEvent} required />
                <Button type="primary" style={{ background: "red" }} onClick={deleteEvents}>Удалить</Button>
            </Space>
        </Card>
    </>);
})

export default DeleteEvents;