import Typography from "antd/es/typography";
import Events from "@/entities/EventsList/ui/Events";
import { ButtonLoadMore } from "@/shared/Button";

const MainPage = () => {
    const { Title } = Typography;
    return (
        <div style={{ margin: "10px" }}>
            <Title level={2}>Доступные мероприятия</Title>
            <Events />
            <ButtonLoadMore/>
        </div>
    );
}

export default MainPage;