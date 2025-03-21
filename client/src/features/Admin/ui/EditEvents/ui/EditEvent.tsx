import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchEditEvent } from "@/features/Admin";
import { EditEventError } from "@/features/Admin/models/service/fetchEditEvent";
import { Button, Card, Input, message, Select, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const EditEvent = () => {
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
    const allSpecial = useSelector((state: RootState) => state.allSpecial.allSpecial);

    const handleInputChange = (field: keyof EventFormState, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const editEvents = async () => {
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
    };

    const clearFields = () => {
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
    };

    return (
        <Card style={{ width: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }} >
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
                <Button type='primary' style={{ marginTop: "10px", background: "green" }} onClick={editEvents}>
                    Редактировать мероприятие
                </Button>
                <Button type='primary' style={{ marginTop: "10px", background: "orange" }} onClick={clearFields}>
                    Очистить поля
                </Button>
            </Space>
        </Card>
    );
};

export default EditEvent;