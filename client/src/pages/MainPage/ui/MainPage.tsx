import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Events from "@/entities/EventsList/ui/Events";

const MainPage = () => {
    const { Title } = Typography;
    return (
        <div style={{ margin: "10px" }}>
            <Title level={2}>Доступные мероприятия</Title>
            <Flex gap="middle" wrap="wrap">
                <Events />
            </Flex>
        </div>
    );
}
 
export default MainPage;