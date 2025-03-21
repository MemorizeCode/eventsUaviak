
import $api from "@/app/config/api";
import { Button, Input, message } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage: FC = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function register() {
        const response = await $api.post("/auth/register", {
            login,password
        })
        if(response.status === 200){
            message.success("Успешная регистрация")
            navigate('/login')
        }
        else{
            message.success("Ошибка: ", response.data)
        }
    }

    return (
        <div>
            <Input onChange={e=>setLogin(e.target.value)} placeholder="Login"/>
            <Input onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
            <Button onClick={register}>Register</Button>
        </div>
    );
}
