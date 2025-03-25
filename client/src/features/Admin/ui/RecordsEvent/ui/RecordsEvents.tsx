import { RootState } from "@/app/providers/store/store";
import { fetchGetRecords } from "@/features/Admin";
import Card from "antd/es/card";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "antd";

const { Title } = Typography;

const RecordsEvents = memo(() => {
    const dispatch = useDispatch()
    const records = useSelector((state: RootState) => state?.recordsEvents?.records)
    // const message = useSelector((state: RootState) => state?.recordsEvents?.message)
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
            key: 'phone',
            render: (text: string) => {
                const templatePhone = `${text.slice(0, 1)}-${text.slice(1, 4)}-${text.slice(4, 7)}-${text.slice(7, 9)}-${text.slice(9, 11)}`
                return <p>{templatePhone}</p>
            }
        },
        {
            title: "Дата записи",
            dataIndex: 'recordDate',
            key: 'recordDate',
            render: (_: string, action: any) => {
                const splitData = action.recordDate?.split('T')[0].split('-');
                return `${splitData[2]}.${splitData[1]}.${splitData[0]}`
            }
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
            key: 'events',
            render: (_: string, action: any) => {
                return action.eventsTitle
            }
        },
        {
            title: "Дата мероприятия",
            dataIndex: 'date',
            key: 'date',
            render: (_: string, action: any) => {
                const splitData = action.eventsDate?.split('T')[0].split('-');
                return `${splitData[2]}.${splitData[1]}.${splitData[0]}`
            }
        },
        {
            title: "Тип",
            dataIndex: "type",
            key: 'type'
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: 'status',
            render: (_: string, action: any) => {
                const recordDate = new Date(action.recordDate)
                const eventDate = new Date(action.eventsDate)
                if (recordDate > eventDate) {
                    return <p style={{ color: "red" }}>Мероприятие прошло</p>
                }
                return <p style={{ color: "green" }}>Мероприятие будет</p>
            }
        }
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
    }, [dispatch])

    return (<>
        <Card style={{ minWidth: "500px" }}>
            <Title level={2}>Записи на мероприятия</Title>
            {records && Array.isArray(records) && records.length > 0 ?
                <Table rowKey="id" columns={columns} dataSource={records} />
                :
                <p>Записей нет</p>
            }
        </Card>
    </>);
})

export default RecordsEvents;