import { AppDispatch, RootState } from "@/app/providers/store/store";
import { fetchAllSpecial, Spesial } from "@/features/Admin/models/service/fetchAllSpecial";
import { DeleteSpesialError, fetchDeleteSpesial } from "@/features/Admin/models/service/fetchDeleteSpesial";
import { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";
import Select from "antd/es/select";
import { createSelector } from "@reduxjs/toolkit";

const { Title } = Typography;

const DeleteSpesial = memo(() => {
    const [id, setId] = useState<string | number | null>("")
    
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
    const [selectSpecial, setSelectedSpecial] = useState(null)

    async function deleteSpesial() {
        try{
            const response = await dispatch(fetchDeleteSpesial(id))
            const payload = response.payload as DeleteSpesialError
            if(response.meta.requestStatus === "fulfilled"){
                message.success(payload.message)
                dispatch(fetchAllSpecial())
            }
            else if(payload.error === "warning"){
                message.warning(payload.message)
            }
            else{
                message.error(payload.message)
            }
            setId(null)
            setSelectedSpecial(null)
        }
        catch(error){
            //ошибка удаления специальности
        }
    }

    return (
        <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={2}>Удалить специальность</Title>
                <Select
                    placeholder="Выберите специальность"
                    onChange={(value) => {
                        setId(value)
                        setSelectedSpecial(value); 
                    }}
                    value={selectSpecial} 
                    style={{ width: "100%" }}
                    allowClear 
                >
                    {specialOptions}
                </Select>
                <Button type="primary" style={{ background: "red" }} onClick={deleteSpesial}>Удалить</Button>
            </Space>
        </Card>
    );
})

export default DeleteSpesial;