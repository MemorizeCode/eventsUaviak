import { $api } from '@/app/config/api';
import { fetchGetReviews } from '@/entities/Reviews/model/service/fetchGetReviews';
import Reviews from '@/entities/Reviews/ui/Reviews';
import {Flex, Button, Typography, Form, Input, Rate,message  } from "antd";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ReviewsPage = () => {
    const datas: any = useSelector((state:any) => state?.reviews?.reviewsList)
    const { Title, Paragraph } = Typography;
    const [rating, setRaiting] = useState<any | number>(0)
    const dispatch = useDispatch()

    async function getReviews() {
        await dispatch(fetchGetReviews())
    }

    useEffect(() => {
        getReviews()
    }, [])

    async function onFinish(e:any) {
        const response = await $api.post('/reviews/createReviews', {
            name: e.name,
            reviews: e.text,
            stars: e.stars
        })
        if(response?.status == 200){
            message.success("Отзыв создан!")
            await getReviews()
        }
        else{
            message.error("Ошибка создание отзывы. Попрубуйте позже")
        }
    }
    return (
        <>
            <div  >
                <Title level={2}>Отзывы</Title>
                <Flex gap="middle" wrap="wrap">
                    {
                        datas.length ?
                        datas?.map((e:any) => {
                            return (<Reviews reviews={e} key={e.id}  />)
                        })
                        :
                        <Title level={5}>Отзывы отсуствуют</Title>
                    }
                </Flex>
                <Title level={2} style={{marginTop:"20px"}}>Оставить отзыв</Title>
                <Form
                    onFinish={onFinish}
                    style={{ maxWidth: '400px' }}
                >
                    <Form.Item
                        name="name"
                        label="Ваше имя"
                        rules={[{ required: true, message: 'Пожалуйста, укажите ваше имя!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="text"
                        label="Ваш отзыв"
                        rules={[{ required: true, message: 'Пожалуйста, оставьте ваш отзыв!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="stars" label="Оценка" rules={[{required:true, message: "Пожалуйста, поставьте оценку!"}]}>
                        <Rate
                            
                            defaultValue={rating}
                            onChange={setRaiting}
                            allowClear={false} // Запрет на очистку рейтинга
                            
                        />
                        {rating[0] !== rating[1] && (
                            <Paragraph type="secondary" style={{ marginTop: 4 }}>{rating[0]} - {rating[1]} из 5</Paragraph>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{background:"#456B92"}}>
                            Отправить отзыв
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default ReviewsPage;