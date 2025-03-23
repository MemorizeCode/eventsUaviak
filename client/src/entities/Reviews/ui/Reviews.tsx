import Card from 'antd/es/card';
import Rate from 'antd/es/rate';
import Typography from 'antd/es/typography';
import { ReviewsSchema } from '../model/service/fetchGetReviews';

const Reviews = (props:{reviews:ReviewsSchema}) => {
    const {id , name, title, stars} = props.reviews
    const { Title, Paragraph } = Typography;

    return (
    <Card style={{ width: 300, marginBottom: 16, zIndex: 10 }}>
        <Title level={4} style={{ marginBottom: 8 }}>{name}</Title>
        <Rate defaultValue={stars} disabled />
        <Paragraph style={{ marginBottom: 8 }}>{title}</Paragraph>
        <small>id: {id} </small> 
    </Card>);
}

export default Reviews;