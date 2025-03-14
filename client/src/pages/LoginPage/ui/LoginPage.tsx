
import styles from "./Login.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchAuthUser } from "@/features/AuthUser/models/service/fetchAuthUser";
import { Card, Input, Button, message } from 'antd';
const LoginPage = () => {


    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()

    async function logInF() {
        const response = await dispatch(fetchAuthUser({ login, password }))
        if (response.payload.status == 200) {
            message.success("Успешно вошли")
            navigate("/")
        }
        else {
            message.error("Ошибка. Не верный логин или пароль")
        }
    }

    return (

        <Card bordered title="Войти в мега секретную админку" className={styles.box}>
            <Input
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{ marginBottom: '8px' }}
            />
            <Input.Password
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '8px' }}
            />
            <Button type="primary" onClick={logInF} style={{ width: '100%', background: "#456B92" }}>
                Войти в топ админку
            </Button>
        </Card>

    )
}
export default LoginPage;