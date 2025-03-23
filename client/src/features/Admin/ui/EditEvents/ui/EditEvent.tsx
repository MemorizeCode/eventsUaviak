import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchEditEvent } from "@/features/Admin";
import { Spesial } from "@/features/Admin/models/service/fetchAllSpecial";
import { EditEventError } from "@/features/Admin/models/service/fetchEditEvent";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { createSelector } from "reselect";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";
import Select from "antd/es/select";

const { Title } = Typography;

interface EventFormState {
    idEvent: string;
    titleEvents: string;
    descriptionEvents: string;
    dataEvents: string;
    timesEvents: string;
    durationEvents: string;
    cabinetEvents: string;
    peopleCountEvents: string;
    whoClassEvents: string;
    prepodEvents: string;
    idSpecEvent: string;
}

const selectMemoizedAllSpecial = createSelector(
    (state: RootState) => state.allSpecial.allSpecial,
    (special) => special
);

const EditEvent = memo(() => {
    const [formState, setFormState] = useState<EventFormState>({
        idEvent: '',
        titleEvents: '',
        descriptionEvents: '',
        dataEvents: '',
        timesEvents: '',
        durationEvents: '',
        cabinetEvents: '',
        peopleCountEvents: '',
        whoClassEvents: '',
        prepodEvents: '',
        idSpecEvent: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const allSpecial = useSelector(selectMemoizedAllSpecial);
    const [selectSpecial, setSelectedSpecial] = useState<string | null>(null)

    const handleInputChange = useCallback((field: keyof EventFormState, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSelectChange = useCallback((value: string | undefined) => {
        handleInputChange('idSpecEvent', value || '');
        setSelectedSpecial(value || null);
    }, [handleInputChange]);

    const editEvents = useCallback(async () => {
        const response = await dispatch(fetchEditEvent(formState));
        const payload = response.payload as EditEventError;
        if (response.meta.requestStatus === "fulfilled") {
            message.success(response?.payload?.message);
        } 
        else if(payload.status === "warning"){
            message.warning(payload.message)
        }
        else{
            message.error(payload.message)
        }
    }, [dispatch, formState]);

    const clearFields = useCallback(() => {
        setFormState({
            idEvent: '',
            titleEvents: '',
            descriptionEvents: '',
            dataEvents: '',
            timesEvents: '',
            durationEvents: '',
            cabinetEvents: '',
            peopleCountEvents: '',
            whoClassEvents: '',
            prepodEvents: '',
            idSpecEvent: '',
        });
        setSelectedSpecial(null)
    }, []);

    const cardStyle = useMemo(() => ({ width: "500px" }), []);
    const spaceStyle = useMemo(() => ({ width: "100%" }), []);
    const editButtonStyle = useMemo(() => ({ marginTop: "10px", background: "green" }), []);
    const clearButtonStyle = useMemo(() => ({ marginTop: "10px", background: "orange" }), []);

    const specialOptions = useMemo(() => 
        allSpecial.map((special: Spesial | unknown) => (
            <Select.Option key={(special as Spesial).id} value={(special as Spesial).id}>
                {(special as Spesial).title}
            </Select.Option>
        )),
    [allSpecial]);

    return (
        <Card style={cardStyle}>
            <Space direction="vertical" style={spaceStyle} >
                <Title level={2}>Редактировать мероприятие</Title>
                <Input
                    placeholder='ID мероприятия'
                    onChange={e => handleInputChange('idEvent', e.target.value)}
                    value={formState.idEvent}
                    required
                />
                <Input
                    placeholder='Название мероприятия'
                    onChange={e => handleInputChange('titleEvents', e.target.value)}
                    value={formState.titleEvents}
                    required
                />
                <Input.TextArea
                    placeholder='Описание мероприятия'
                    onChange={e => handleInputChange('descriptionEvents', e.target.value)}
                    value={formState.descriptionEvents}
                    required
                />
                <Input
                    type="date"
                    placeholder='Дата мероприятия'
                    onChange={e => handleInputChange('dataEvents', e.target.value)}
                    value={formState.dataEvents}
                    required
                />
                <Input
                    type="time"
                    placeholder='Время мероприятия'
                    onChange={e => handleInputChange('timesEvents', e.target.value)}
                    value={formState.timesEvents}
                    required
                />
                <Input
                    type="number"
                    placeholder='Длительность мероприятия (в минутах)'
                    onChange={e => handleInputChange('durationEvents', e.target.value)}
                    value={formState.durationEvents}
                    required
                />
                <Input
                    placeholder='Кабинет'
                    onChange={e => handleInputChange('cabinetEvents', e.target.value)}
                    value={formState.cabinetEvents}
                    required
                />
                <Input
                    type="number"
                    placeholder='Количество участников'
                    onChange={e => handleInputChange('peopleCountEvents', e.target.value)}
                    value={formState.peopleCountEvents}
                    required
                />
                <Input
                    placeholder='Для какого класса?'
                    onChange={e => handleInputChange('whoClassEvents', e.target.value)}
                    value={formState.whoClassEvents}
                    required
                />
                <Input
                    placeholder='Преподаватели'
                    onChange={e => handleInputChange('prepodEvents', e.target.value)}
                    value={formState.prepodEvents}
                    required
                />
                <Select
                    placeholder="Выберите специальность"
                    onChange={handleSelectChange}
                    value={selectSpecial || undefined}
                    style={{ width: "100%" }}
                    allowClear
                >
                    {specialOptions}
                </Select>
                <Button type='primary' style={editButtonStyle} onClick={editEvents}>
                    Редактировать мероприятие
                </Button>
                <Button type='primary' style={clearButtonStyle} onClick={clearFields}>
                    Очистить поля
                </Button>
            </Space>
        </Card>
    );
})

export default EditEvent;