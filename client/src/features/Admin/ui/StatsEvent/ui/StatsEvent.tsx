import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchGetStatsEventPopularSpecial } from "@/features/Admin/models/service/fetchGetStatsEventPopularSpecial";
import { fetchGetStatsEventMount } from "@/features/Admin/models/service/fetchGetStatsEventsMount";
import { fetchGetStatsEventsYear } from "@/features/Admin/models/service/fetchGetStatsEventsYear";
import { fetchGetStatsSchool, School } from "@/features/Admin/models/service/fetchGetStatsSchool";
import { Card, Input, Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StatsEvent = () => {
    const { Title } = Typography;

    const [yearStats, setYearStats] = useState<number | string>(2025)
    const [monthStats, setMonthStats] = useState<number | string>(1)
    const peopleStatsYear = useSelector((state: RootState) => state.statsEvent.peopleStatsYear)
    const peopleStatsMonth = useSelector((state: RootState) => state.statsEvent.peopleStatsMonth)
    const listSchool = useSelector((state: RootState) => state.statsEvent.listSchool)
    const mostPopularSpecialty = useSelector((state: RootState) => state.statsEvent.mostPopularSpecialty)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGetStatsEventsYear({ yearStats }))
    }, [yearStats])


    useEffect(() => {
        dispatch(fetchGetStatsEventMount({ year: Number(yearStats), month: Number(monthStats) }))
    }, [monthStats, yearStats])


    useEffect(() => {
        dispatch(fetchGetStatsSchool())
        dispatch(fetchGetStatsEventPopularSpecial())
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


    return (<>
        <Card>
            <Title level={2}>Статистика мероприятий</Title>
            <Title level={3}>Статистика по году: {yearStats} | Людей посетило: {peopleStatsYear}</Title>
            <Input
                value={yearStats}
                type="text"
                onChange={e => setYearStats(e.target.value)}
            />
            <Title level={3}>Статистика по месяцу: {months[Number(monthStats) - 1].month} и году: {yearStats} | Людей посетило: {peopleStatsMonth}</Title>
            <Select
                value={monthStats}
                onChange={e => setMonthStats(e)}
            >
                {months.map(month => <Select.Option key={month.id} value={month.id}>{month.month}</Select.Option>)}
            </Select>
            <Title level={3}>Список школ посетивших мероприятие:</Title>
            {
                listSchool.length > 0 && 
                listSchool.map((school: School) => <Tag key={school.id}>{school.school}</Tag>)
            }
            <Title level={3}>Наиболее востребованная специальность:</Title>
            <p>Название: {mostPopularSpecialty.title}</p>
            <p>Количество зарегистрировавшихся: {mostPopularSpecialty.totalRegistrations}</p>
            <p>Количество мероприятий: {mostPopularSpecialty.eventsCount}</p>
        </Card>
    </>);
}

export default StatsEvent;