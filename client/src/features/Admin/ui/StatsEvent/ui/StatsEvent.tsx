import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchGetStatsEventPopularSpecial } from "@/features/Admin/models/service/fetchGetStatsEventPopularSpecial";
import { fetchGetStatsEventMount } from "@/features/Admin/models/service/fetchGetStatsEventsMount";
import { fetchGetStatsEventsYear } from "@/features/Admin/models/service/fetchGetStatsEventsYear";
import { fetchGetStatsSchool, School } from "@/features/Admin/models/service/fetchGetStatsSchool";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Tag from "antd/es/tag";
import Typography from "antd/es/typography";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StatsEvent = memo(() => {
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
    }, [dispatch, yearStats])


    useEffect(() => {
        dispatch(fetchGetStatsEventMount({ year: Number(yearStats), month: Number(monthStats) }))
    }, [monthStats, yearStats, dispatch])


    useEffect(() => {
        dispatch(fetchGetStatsSchool())
        dispatch(fetchGetStatsEventPopularSpecial())
    }, [dispatch])



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


    const mountsMemo = useMemo(() =>
        months.map((m) => (
            <Select.Option key={m.id} value={m.id}>{m.month}</Select.Option>
        ))
        , [months])


    return (<>
        <Card>
            <Title level={2}>Статистика мероприятий</Title>
            <div style={{ marginTop: "20px" }}>
                <Title level={3}>
                    За {yearStats} год: {peopleStatsYear} посетителей
                </Title>
                <Input
                    value={yearStats}
                    type="text"
                    placeholder="Введите год"
                    onChange={(e) => setYearStats(e.target.value)}
                />
            </div>
            <div style={{ marginTop: "20px" }}>
                <Title level={3}>
                    За {months[Number(monthStats) - 1].month} {yearStats} года: {peopleStatsMonth} посетителей
                </Title>
                <Select
                    style={{ width: "100%" }}
                    value={monthStats}
                    placeholder="Выберите месяц"
                    onChange={(e) => setMonthStats(e)}
                >
                    {mountsMemo}
                </Select>
            </div>
            <div style={{ marginTop: "20px" }}>
                <Title level={3}>Школы, посетившие мероприятия:</Title>
                {listSchool.length > 0 ? (
                    listSchool.map((school: School) => (
                        <Tag key={school.id}>{school.school}</Tag>
                    ))
                ) : (
                    <p>Нет данных</p>
                )}
            </div>
            <div style={{ marginTop: "20px" }}>
                <Title level={3}>Самая востребованная специальность:</Title>
                {mostPopularSpecialty ? (
                    <>
                        <p><strong>Название:</strong> {mostPopularSpecialty.title}</p>
                        <p><strong>Участников:</strong> {mostPopularSpecialty.totalRegistrations}</p>
                        <p><strong>Мероприятий:</strong> {mostPopularSpecialty.eventsCount}</p>
                    </>
                ) : (
                    <p>Данные отсутствуют</p>
                )}
            </div>
        </Card>
    </>);
})

export default StatsEvent;