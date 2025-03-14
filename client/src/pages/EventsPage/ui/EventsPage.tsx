import Events from '@/entities/EventsList/ui/Events';
import { Typography, Flex} from "antd";
const EvensPage = () => {

    const { Paragraph } = Typography;
    return (
        <>
        
        <Paragraph>Доступные мероприятия</Paragraph>
        <Flex gap="middle" wrap="wrap" style={{ margin: "10px" }}>
            <Events />
        </Flex>
        
        </>

    );
}

export default EvensPage;