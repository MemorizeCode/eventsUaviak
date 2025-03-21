import Card from "antd/es/card/Card";
import Input from "antd/es/input/Input";
import Button from "antd/es/button/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import  message  from "antd/es/message";
import { fetchAuthUser } from "../models/service/fetchAuthUser";


const AuthForm = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function loginUser() {
        const response = await dispatch(fetchAuthUser({ login, password }))
        console.log(response)
        if (response.payload.status == 200) {
            message.success(response?.payload?.data?.message)
            navigate("/")
        }
        else {
            message.error(response?.payload)
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