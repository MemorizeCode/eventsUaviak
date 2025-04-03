import { AppDispatch, RootState } from "@/app/providers/store/store";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditSpesialError, fetchEditSpesial } from "../../../models/service/fetchEditSpesial";
import { fetchAllSpecial, Spesial } from "@/features/Admin/models/service/fetchAllSpecial";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";
import Select from "antd/es/select";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";

const { Title } = Typography;

const EditSpecial = memo(() => {
    const [title, setTitle] = useState("")
    const [id, setId] = useState(null)
    const [selectSpecial, setSelectedSpecial] = useState(null)
    

    const selectMemoizedAllSpecial = createSelector(
        (state: RootState) => state.allSpecial.allSpecial,
        (special) => special
    );
    const allSpecial = useSelector(selectMemoizedAllSpecial);

    const specialOptions = useMemo(() => 
        allSpecial.map((special: Spesial | unknown) => (
            <Select.Option key={(special as Spesial).id} value={(special as Spesial).id}>
                {(special as Spesial).title}
            </Select.Option>
        )),
    [allSpecial]);


    const dispatch = useDispatch<AppDispatch>()

    async function editSpecial() {
        const response = await dispatch(fetchEditSpesial({ id, title }))
        const payload = response.payload as EditSpesialError
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
                    {specialOptions}
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
})

export default EditSpecial;