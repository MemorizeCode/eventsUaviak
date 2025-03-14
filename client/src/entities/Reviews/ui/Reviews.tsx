import { Card, Rate, Typography } from 'antd';
const Reviews = ({reviews}:any) => {
    const { Title, Paragraph } = Typography;

    return (
    <Card style={{ width: 300, marginBottom: 16, zIndex: 10 }}>
        <Title level={4} style={{ marginBottom: 8 }}>{reviews.name}</Title>
        <Rate defaultValue={reviews.stars} disabled />
        <Paragraph style={{ marginBottom: 8 }}>{reviews.title}</Paragraph>
        <small>id: {reviews.id} </small> 
    </Card>);
}

export default Reviews;