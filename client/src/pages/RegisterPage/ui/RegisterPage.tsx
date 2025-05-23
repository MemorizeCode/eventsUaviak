
import $api from "@/app/config/api";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "antd/es/input";
import Button from "antd/es/button";
import message from "antd/es/message";
export const RegisterPage: FC = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function register() {
        if(login.length < 6 || password.length < 6){
            message.error("Логин и пароль должны быть больше 6 символов")
            return
        }
        const response = await $api.post("/auth/register", {
            login,password
        })
        if(response.status === 200){
            message.success("Успешная регистрация")
            navigate('/login')
        }
        else{
            message.error(response?.data?.message)
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
