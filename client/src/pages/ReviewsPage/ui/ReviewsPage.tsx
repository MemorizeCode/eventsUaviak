import { AppDispatch, RootState } from '@/app/providers/store/store';
import { fetchGetReviews, ReviewsSchema } from '@/entities/Reviews/model/service/fetchGetReviews';
import Reviews from '@/entities/Reviews/ui/Reviews';
import { ReviewsForm } from '@/features/Reviews';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";


const ReviewsPage = () => {
    const datas = useSelector((state: RootState) => state?.reviews?.reviewsList)
    const { Title } = Typography;
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        dispatch(fetchGetReviews())
    }, [dispatch])


    return (
        <>
            <div  >
                <Title level={2}>Отзывы</Title>
                <Flex gap="middle" wrap="wrap">
                    {
                        datas?.length ?
                            datas?.map((e: ReviewsSchema) => {
                                return (<Reviews reviews={e} key={e.id} />)
                            })
                            :
                            <Title level={5}>Отзывы отсуствуют</Title>
                    }
                </Flex>
                <Title level={2} style={{ marginTop: "20px" }}>Оставить отзыв</Title>
                <ReviewsForm />
            </div>
        </>
    )
}

export default ReviewsPage;