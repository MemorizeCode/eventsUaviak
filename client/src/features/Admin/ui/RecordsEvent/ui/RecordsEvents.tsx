import $api from "@/app/config/api";
import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchGetRecords } from "@/features/Admin";
import { FetchGetRecordsData } from "@/features/Admin/models/service/fetchGetRecords";
import message from "antd/es/message"
import Button from "antd/es/button";
import Card from "antd/es/card";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "antd";

const { Title } = Typography;

const RecordsEvents = memo(() => {
    const dispatch = useDispatch<AppDispatch>()
    const records = useSelector((state: RootState) => state?.recordsEvents?.records)


    async function downoloadFile(file: string) {
        try {
            const response = await $api.get(`/record/downloadList/${file}`, {
                responseType: "blob"
            })
            if (response?.status === 200) {
                const data = response.data
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
                link.remove()
                message.success("Файл скачан")
            }
            else if(response?.status === 404){
                message.error("Файл не найден")
            }
        }
        catch (error) {
            message.error("Ошибка при скачивании файла")
        }
    }

    // const message = useSelector((state: RootState) => state?.recordsEvents?.message)
    const columns = [
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
            render: (_: string, action: FetchGetRecordsData) => {
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
            render: (_: string, action: FetchGetRecordsData) => {
                return action.eventsTitle
            }
        },
        {
            title: "Дата мероприятия",
            dataIndex: 'date',
            key: 'date',
            render: (_: string, action: FetchGetRecordsData) => {
                const splitData = action.eventsDate?.split('T')[0].split('-');
                return `${splitData[2]}.${splitData[1]}.${splitData[0]}`
            }
        },
        {
            title: "Время мероприятия",
            dataIndex: 'time',
            key: 'time',
            render: (_: string, action: FetchGetRecordsData) => {
                return action.time
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
            render: (_: string, action: FetchGetRecordsData) => {
                const now = new Date() //(Самара, GMT+4)
                const eventDateStr = action.eventsDate.replace("Z", "")
                const eventDate = new Date(eventDateStr)

                if (now > eventDate) {
                  return <p style={{ color: "red" }}>Мероприятие прошло</p>;
                } else {
                  return <p style={{ color: "green" }}>Мероприятие будет</p>;
                }
            }
        },
        {
            title: "Скачать",
            dataIndex: "url",
            key: 'url',
            render: (_: string, action: FetchGetRecordsData) => {
                const file = action.listPeople
                if (file) {
                    return <Button type="primary" onClick={() => downoloadFile(file)}>Скачать файл</Button>
                }
                return <p>Файл отсуствует</p>
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
                <Table rowKey={() => Date.now() * Math.random()} columns={columns} dataSource={records} />
                :
                <p>Записей нет</p>
            }
        </Card>
    </>);
})

export default RecordsEvents;