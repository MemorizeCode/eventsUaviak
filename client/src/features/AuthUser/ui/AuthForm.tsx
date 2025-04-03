import Card from "antd/es/card";
import Input from "antd/es/input";
import Button from "antd/es/button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import message from "antd/es/message";
import { AuthUserError, fetchAuthUser } from "../models/service/fetchAuthUser";
import { AppDispatch } from "@/app/providers/store/store";


const AuthForm = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    async function loginUser() {
        const response = await dispatch(fetchAuthUser({ login, password }))
        const payload = response.payload as AuthUserError
        if(response.meta.requestStatus == "fulfilled"){
            message.success(payload.message)
            navigate("/")
        }
        else{
            message.error(payload.message)
        }
    }

    return (
        <Card>
            <Input
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{ marginBottom: '8px' }}
            />
            <Input
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '8px' }}
            />
            <Button type="primary" onClick={loginUser} style={{ width: '100%', background: "#456B92" }}>
                Войти в топ админку
            </Button>
        </Card>
    );
}

export default AuthForm;