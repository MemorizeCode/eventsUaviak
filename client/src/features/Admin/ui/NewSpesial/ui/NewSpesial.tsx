import { AppDispatch } from "@/app/providers/store/store";
import { fetchAllSpecial } from "@/features/Admin/models/service/fetchAllSpecial";
import { fetchNewSpesial, NewSpesialError } from "@/features/Admin/models/service/fetchNewSpesial";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";

const NewSpesial = memo(() => {
    const { Title } = Typography;

    const [title, setTitle] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()

    async function addSpecial() {
        try{
            const response = await dispatch(fetchNewSpesial(title))
            const payload = response.payload as NewSpesialError
            if(response.meta.requestStatus === "fulfilled"){
                message.success(payload.message)
                setTitle("")
                dispatch(fetchAllSpecial())
            }
            else if(payload.error === "warning"){
                message.warning(payload.message)
            }
            else{
                message.error(payload.message)
            }
        }
        catch(error){
            //ошибка добавления специальности
        }
    }

    return (<>
        <Card style={{minWidth:"500px"}}>
            <Space direction="vertical" style={{width:"100%"}}>
                <Title level={2}>Добавить специальность</Title>
                <Input placeholder="Название специальности" onChange={(e) => setTitle(e.target.value)} value={title} />
                <Button type="primary" style={{background:"green"}} onClick={addSpecial}>Добавить</Button>
            </Space>
        </Card>
    </>);
})
 
export default NewSpesial;