import { RootState } from "@/app/providers/store/store";
import { fetchGetRecords } from "@/features/Admin";
import { Button, Card, Table, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecordsEvents = () => {
    const { Title } = Typography;
    const dispatch = useDispatch()
    const records = useSelector((state: RootState) => state?.recordsEvents?.records)
    const message = useSelector((state: RootState) => state?.recordsEvents?.message)
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: "ФИО",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Телефон",
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: "Школа",
            dataIndex: 'school',
            key: 'school'
        },
        {
            title: "Кол-во людей",
            dataIndex: 'countPeople',
            key: 'countPeople'
        },
        {
            title: "Мероприятие",
            dataIndex: 'events',
            key: 'events'
        },
        {
            title: "Тип",
            dataIndex: "type",
            key: 'type'
        },
        // {
        //     title: "Действие",
        //     dataIndex: "action",
        //     key: 'action',
        //     render: (text: string, record: unknown) => {
        //         return (
        //             <Button type="primary" style={{ background: "red" }} onClick={() => {}}>Удалить</Button>
        //         )
        //     }
        // }
    ]

    useEffect(() => {
        dispatch(fetchGetRecords())
    }, [])

    return (<>
        <Card>
            <Title level={2}>Записи на мероприятия</Title>
            {message && <h2>{message}</h2>}
            {records && Array.isArray(records) && records.length > 0 &&
                <Table columns={columns} dataSource={records} />
            }
        </Card>
    </>);
}

export default RecordsEvents;