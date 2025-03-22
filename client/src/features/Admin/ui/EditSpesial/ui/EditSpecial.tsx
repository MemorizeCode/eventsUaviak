import { AppDispatch, RootState } from "@/app/providers/store/store";
import { Button, Card, Input, message, Select, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditSpesialError, fetchEditSpesial } from "../../../models/service/fetchEditSpesial";
import { fetchAllSpecial } from "@/features/Admin/models/service/fetchAllSpecial";

const EditSpecial = () => {
    const { Title } = Typography
    const [title, setTitle] = useState("")
    const [id, setId] = useState(null)
    const [selectSpecial, setSelectedSpecial] = useState(null)
    const allSpecial = useSelector((state: RootState) => state.allSpecial.allSpecial)
    const dispatch = useDispatch<AppDispatch>()

    async function editSpecial() {
        const response = await dispatch(fetchEditSpesial({ id, title }))
        const payload = response.payload as EditSpesialError
        console.log(response)
        if (response.meta.requestStatus === "fulfilled") {
            message.success(payload.message)
            setTitle("")
            setSelectedSpecial(null)
            setId(null)
            dispatch(fetchAllSpecial())
        }
        else if (payload.error === 'warning') {
            message.warning(payload.message)
        }
        else {
            message.error(payload.message)
        }
    }

    return (<>
        <Card style={{ width: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={2}>Редактировать специальность</Title>
                <Select
                    placeholder="Выберите специальность"
                    onChange={(value) => {
                        setId(value); // Устанавливаем id
                        setSelectedSpecial(value); // Устанавливаем значение Select
                    }}
                    value={selectSpecial} // Управляем значением Select
                    style={{ width: "100%" }}
                    allowClear // Добавляем возможность очистки
                >
                    {allSpecial.map((special: any) => (
                        <Select.Option key={special.id} value={special.id}>
                            {special.title}
                        </Select.Option>
                    ))}
                </Select>
                <Input
                    type="text"
                    value={title}
                    placeholder="Новое название специальности"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button style={{ backgroundColor: "green" }} type="primary" onClick={editSpecial}>Редактировать</Button>
            </Space>
        </Card>
    </>);
}

export default EditSpecial;