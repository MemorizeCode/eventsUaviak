import Card from "antd/es/card";
import styles from "./Login.module.css"
import AuthForm from "@/features/AuthUser/ui/AuthForm";
const LoginPage = () => {

    return (
        <Card bordered title="Войти в мега секретную админку" className={styles.box}>
            <AuthForm />
        </Card>

    )
}
export default LoginPage;