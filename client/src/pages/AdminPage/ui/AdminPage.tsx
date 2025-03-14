import { $api } from '@/app/config/api';
import { fetchAdminDelEvents, fetchAdminDelReviews, fetchAdminDelSpec, fetchCreateEvents } from '@/features/Admin/models/service/fetchAdmin';
import { Card, Button, Typography, Input, message, Space, Tag, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';
import Column from 'antd/es/table/Column';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const AdminPage = () => {
    const { Title } = Typography;
    const [idReviews, setIdReviews] = useState('')
    const [idEvents, setIdEvents] = useState('')
    const [statSchoolState, setSchoolState] = useState([])
    const [titleSpec, setTitleSpec] = useState('')
    const [idSpec, setIdSpec] = useState('')
    const [vostrSpecData, setvostrSpecData] = useState('')

    const [titleEvents, setTitleEvents] = useState('')
    const [descriptionEvents, setDescriptionEvents] = useState('')
    const [dataEvents, setDataEvents] = useState('')
    const [timesEvents, setTimesEvents] = useState('')
    const [durationEvents, setDurationEvents] = useState('')
    const [cabinetEvents, setCabinetEvents] = useState('')
    const [peopleCountEvents, setCountPeopleEvents] = useState('')
    const [whoClassEvents, setWhoClassEvents] = useState('')
    const [prepodEvents, setPrepodEvents] = useState('')
    const [idSpecEvent, setIdSpecEventState] = useState('')

    function setIdSpecEvent(event: any) {
        setIdSpecEventState(event)
    }

    const [peopleGod, setPeopleGod] = useState('')
    const [peopleMonthGod, setPeopleMonthGod] = useState('')

    const [currentYear, setCurrentYear] = useState(2025)
    const [currentMonth, setCurrentMonth] = useState(1)

    const dispatch = useDispatch()

    async function deleteReviews() {
        dispatch(fetchAdminDelReviews(idReviews))
        setIdReviews("")
    }

    async function deleteEvents() {
        const response = await dispatch(fetchAdminDelEvents(idEvents))

        setIdEvents("")
    }

    async function statSchool() {
        const response = await $api.get('/otchet/school')


        setSchoolState(response.data.data)
    }

    async function createSpec() {
        if (!titleSpec.length) {
            message.warning("Назвние не может быть пустым")
        }
        else {
            const response = await $api.post('/spesial/createSpesial', {
                title: titleSpec
            })

            if (response.data?.status == 403) {
                message.error("Ошибка создания")
            }
            else {
                message.success("Успешно создано")
                setTitleSpec("")
            }
        }
        getSpec()
    }

    async function delSpec() {
        const response = await dispatch(fetchAdminDelSpec(idSpec))
        setIdSpec("")
        getSpec()
    }

    async function createEvents() {
        const response = await dispatch(fetchCreateEvents({ titleEvents, descriptionEvents, dataEvents, timesEvents, durationEvents, cabinetEvents, peopleCountEvents, whoClassEvents, idSpecEvent, prepodEvents }))
    }

    async function vostrSpec() {
        const response = await $api.get("/otchet/spesialVostrebovanie")
        setvostrSpecData(response.data.data?.title)
    }

    async function peopleYear(e: any) {
        setCurrentYear(e)
        const response = await $api.get(`/otchet/getPeopleYear?year=${e}`)
        if (response.data) {
            setPeopleGod(response.data.data)
        }
    }

    async function peopleMonth(e: any, y: any) {
        setCurrentMonth(e)
        const response = await $api.get(`/otchet/getPeopleMouth?mouth=${e}&year=${y}`)
        if (response.data) {
            setPeopleMonthGod(response.data.message)
        }
    }

    const [allSpec, setAllSpec] = useState([])
    async function getSpec() {
        const response = await $api.get("/spesial/getSpesial")
        setAllSpec(response.data)
        // getSpec()
    }

    const [allRecords, setAllRecords] = useState()

    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id'
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
        }
    ]


    async function getRecords() {
        const response = await $api.get("/record/getRecords")
        console.log(response.data)
        if (response.data) {
            setAllRecords(response?.data)
        }
    }


    const columnsSort = [
        {
            title: "Школа",
            dataIndex: 'school',
            key: 'school'
        },
        {
            title: "Кол-во",
            dataIndex: 'count',
            key: 'count'
        },
        {
            title: "Специальность",
            dataIndex: 'spec',
            key: 'spec'
        },
    ]
    const [fdakg, sethhdgjfk] = useState()
    async function getPeopleCountSpec() {
        const response = await $api.get("/otchet/getPeopleCountSpec")
        if (response.data) {
            sethhdgjfk(response.data)
        }
    }


    useEffect(() => {
        statSchool()
        vostrSpec()
        peopleYear(currentYear)
        peopleMonth(currentMonth, currentYear)
        getSpec()
        getRecords()
        getPeopleCountSpec()
    }, [])


    const months = [
        { id: 1, month: "Январь" },
        { id: 2, month: "Февраль" },
        { id: 3, month: "Март" },
        { id: 4, month: "Апрель" },
        { id: 5, month: "Май" },
        { id: 6, month: "Июнь" },
        { id: 7, month: "Июль" },
        { id: 8, month: "Август" },
        { id: 9, month: "Сентябрь" },
        { id: 10, month: "Октябрь" },
        { id: 11, month: "Ноябрь" },
        { id: 12, month: "Декабрь" },
    ];
    let allRecordsProps = {}
    if (allRecords) {
        // @ts-ignore
        allRecordsProps.dataSource = allRecords
    }
    let recordFdak = {}

    if (fdakg) {
        // @ts-ignore
        recordFdak.dataSource = fdakg
    }

    return (
        <>
            <Space direction="vertical">
                <Card>
                    <Title level={2}>Создать мероприятие</Title>
                    <Space direction="vertical" size="small">
                        <Input
                            placeholder='Название мероприятия'
                            onChange={e => setTitleEvents(e.target.value)}
                            value={titleEvents}
                            required
                        />

                        <Input.TextArea
                            placeholder='Описание мероприятия'
                            onChange={e => setDescriptionEvents(e.target.value)}
                            value={descriptionEvents}
                            required

                        />

                        <Input
                            type="date"
                            placeholder='Дата мероприятия'
                            onChange={e => setDataEvents(e.target.value)}
                            value={dataEvents}
                            required

                        />

                        <Input
                            type="time"
                            placeholder='Время мероприятия'
                            onChange={e => setTimesEvents(e.target.value)}
                            value={timesEvents}
                            required

                        />

                        <Input
                            type="number"
                            placeholder='Длительность мероприятия (в минутах)'
                            onChange={e => setDurationEvents(e.target.value)}
                            value={durationEvents}
                            required

                        />

                        <Input
                            placeholder='Кабинет'
                            onChange={e => setCabinetEvents(e.target.value)}
                            value={cabinetEvents}
                            required

                        />

                        <Input
                            type="number"
                            placeholder='Количество участников'
                            onChange={e => setCountPeopleEvents(e.target.value)}
                            value={peopleCountEvents}
                            required

                        />

                        <Input
                            placeholder='Для какого класса?'
                            onChange={e => setWhoClassEvents(e.target.value)}
                            value={whoClassEvents}
                            required

                        />

                        <Input
                            placeholder='Преподаватели'
                            onChange={e => setPrepodEvents(e.target.value)}
                            value={prepodEvents}
                            required

                        />

                        <Select placeholder="Специальность" onChange={setIdSpecEvent} defaultValue={"Выбрать специальность"}>
                            {
                                allSpec?.map((e: any) => {
                                    return (<Option key={e.id} value={e.id}>{e.title}</Option>)
                                })
                            }
                        </Select>
                        <Button type='primary' style={{ marginTop: "10px", background: "green" }} onClick={createEvents}>Создать мероприятие</Button>
                    </Space>
                </Card>
                <Card>
                    <Title level={2}>Удалить мероприятие</Title>
                    <Input placeholder='Id мероприятия' onChange={e => setIdEvents(e.target.value)} value={idEvents} />
                    <Button danger type='primary' style={{ marginTop: "10px" }} onClick={deleteEvents}>Удалить мероприятие {idEvents}</Button>
                </Card>
                <Card>
                    <Title level={2}>Удалить отзыв</Title>
                    <Input placeholder='Id отзыва' onChange={e => setIdReviews(e.target.value)} value={idReviews} />
                    <Button danger type='primary' style={{ marginTop: "10px" }} onClick={deleteReviews}>Удалить отзыв {idReviews}</Button>
                </Card>
                <Card>
                    <Title level={2}>Создать специальность</Title>
                    <Input placeholder='Название специальности' onChange={e => setTitleSpec(e.target.value)} value={titleSpec} />
                    <Button type='primary' style={{ marginTop: "10px", background: "green" }} onClick={createSpec}>Создать специальность</Button>
                </Card>
                <Card>
                    <Title level={2}>Удалить специальность</Title>
                    <Input placeholder='Id специальности' onChange={e => setIdSpec(e.target.value)} value={idSpec} />
                    <Button danger type='primary' style={{ marginTop: "10px" }} onClick={delSpec}>Удалить специальность {idSpec}</Button>
                </Card>
                <Title level={2}>Статистика</Title>
                <Title level={5}>Все специаальности: </Title>
                <Space direction='horizontal'>
                    {
                        allSpec.length ? allSpec.map((e: any) => {
                            return (<Tag key={e.id}>{e.title} | id:{e.id}</Tag>)
                        }) : <Typography>Специальности пустые</Typography>
                    }
                </Space>
                <Title level={5}>Более востребованная специальность (больше кол-во записей (вроде)):</Title>
                <Typography>{vostrSpecData ? vostrSpecData : "Нет информации"}</Typography>
                <Title level={5}>Какие школы поситили мероприятия: </Title>
                <Space direction="horizontal">
                    {
                        statSchoolState.length ? statSchoolState.map((e: any) => {
                            console.log(e)
                            return (
                                <Tag key={e.id}>{e.school}</Tag>
                            )
                        })
                            :
                            <Typography>Список пуст</Typography>
                    }
                </Space>
                <Title level={5} style={{ marginTop: "35px" }}>Кол-во участников за год: </Title>
                <Input placeholder='Год' onChange={e => peopleYear(e.target.value)} value={currentYear} />
                <Typography style={{ marginTop: "5px" }}>Кол-во участников за {currentYear} год: {peopleGod}</Typography>
                <Title level={5}>Кол-во участников за месяц: </Title>
                <Select defaultValue={months[0].id} onChange={e => peopleMonth(e, currentYear)}>
                    {
                        months.map((e: any) => (
                            <Option key={e.id} value={e.id}>{e.month}</Option>
                        ))
                    }
                </Select>
                <Typography style={{ marginTop: "5px" }}>Кол-во участников за {months[currentMonth - 1].month} месяц и {currentYear} год: {peopleMonthGod} </Typography>
                <Title level={2}>Статистика</Title>
                {
                    fdakg && Array.isArray(fdakg) ? (
                        <Table columns={columnsSort} dataSource={fdakg} />
                    ) : (
                        "Нету записей"
                    )
                }
                <Title level={2}>Записи на мероприятие</Title>
                {
                    allRecords && Array.isArray(allRecords) ? (
                        <Table columns={columns} dataSource={allRecords} />
                    ) : (
                        "Нету записей"
                    )
                }

            </Space>
        </>
    );
}

export default AdminPage;