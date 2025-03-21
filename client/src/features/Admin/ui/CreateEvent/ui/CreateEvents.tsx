import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchAllSpecial, fetchCreateEvents } from "@/features/Admin";
import { CreateEventError, ValidationError } from "@/features/Admin/models/service/fetchCreateEvent";
import { Card, Input, Button, Space, Typography, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

interface EventFormState {
    titleEvents: string;
    descriptionEvents: string;
    dataEvents: string;
    timesEvents: string;
    durationEvents: number | string;
    cabinetEvents: string;
    peopleCountEvents: number | string;
    whoClassEvents: string;
    prepodEvents: string;
    idSpecEvent: number | null;
}

const CreateEvent = () => {
    const [formState, setFormState] = useState<EventFormState>({
        titleEvents: "",
        descriptionEvents: "",
        dataEvents: "",
        timesEvents: "",
        durationEvents: '',
        cabinetEvents: "",
        peopleCountEvents: '',
        whoClassEvents: "",
        prepodEvents: "",
        idSpecEvent: null,
    });

    const allSpecial = useSelector((state: RootState) => state?.allSpecial?.allSpecial);
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (field: keyof EventFormState, value: string | number | null) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const createEvents = async () => {
        try {
            const response = await dispatch(fetchCreateEvents({
                ...formState,
                durationEvents: Number(formState.durationEvents),
                peopleCountEvents: Number(formState.peopleCountEvents),
                idSpecEvent: formState.idSpecEvent || 0,
            }));
            const payload = response.payload as CreateEventError;
            if (response.meta.requestStatus === "fulfilled") {
                clearFields();
                message.success(payload?.message);
            } else if (payload?.status === "warning") {
                payload?.errors?.forEach((err: ValidationError) => {
                    message.warning(err.message);
                });
            } else {
                message.error(payload?.message);
            }
        } catch (error: unknown) {
            const errorPayload = error as CreateEventError;
            message.error(errorPayload.message);
        }
    };

    const clearFields = () => {
        setFormState({
            titleEvents: "",
            descriptionEvents: "",
            dataEvents: "",
            timesEvents: "",
            durationEvents: '',
            cabinetEvents: "",
            peopleCountEvents: '',
            whoClassEvents: "",
            prepodEvents: "",
            idSpecEvent: null,
        });
    };

    return (
        <Card style={{ width: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }} >
                <Title level={2}>Создать мероприятие</Title>
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
                    type="text"
                    placeholder='Длительность мероприятия (в минутах)'
                    onChange={e => handleInputChange('durationEvents', e.target.value)}
                    value={formState.durationEvents}
                    required
                />
                <Input
                    type="text"
                    placeholder='Кабинет'
                    onChange={e => handleInputChange('cabinetEvents', e.target.value)}
                    value={formState.cabinetEvents}
                    required
                />
                <Input
                    type="text"
                    placeholder='Количество участников'
                    onChange={e => handleInputChange('peopleCountEvents', e.target.value)}
                    value={formState.peopleCountEvents}
                    required
                />
                <Input
                    placeholder='Для какого класса?'
                    type="text"
                    onChange={e => handleInputChange('whoClassEvents', e.target.value)}
                    value={formState.whoClassEvents}
                    required
                />
                <Input
                    placeholder='Преподаватели'
                    type="text"
                    onChange={e => handleInputChange('prepodEvents', e.target.value)}
                    value={formState.prepodEvents}
                    required
                />
                <Select
                    placeholder="Специальность"
                    onChange={value => handleInputChange('idSpecEvent', value)}
                    value={formState.idSpecEvent}
                    style={{ width: "100%" }}
                >
                    {allSpecial?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.title}
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    type='primary'
                    style={{ marginTop: "10px", background: "green" }}
                    onClick={createEvents}
                >
                    Создать мероприятие
                </Button>
                <Button
                    type='primary'
                    style={{ marginTop: "10px", background: "orange" }}
                    onClick={clearFields}
                >
                    Очистить поля
                </Button>
            </Space>
        </Card>
    );
};

export default CreateEvent;