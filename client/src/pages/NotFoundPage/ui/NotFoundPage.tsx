import Button from "antd/es/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (<>
        <h2>Страница не найдена</h2>
        <Button>
            <Link to="/">Вернуться на главную</Link>
        </Button>
    </>);
}
 
export default NotFoundPage;