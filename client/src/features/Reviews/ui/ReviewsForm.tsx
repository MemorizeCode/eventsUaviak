import { Form, Input, Rate, Button, Typography, message } from "antd";
import { useState, useMemo, memo } from "react";
import { useDispatch } from "react-redux";
import { fetchNewReviews, IReviewResponse } from "../model/services/fetchNewReviews";
import { AppDispatch } from "@/app/providers/store/store";

const Reviews = memo(() => {
    const { Paragraph } = Typography

    const [rating, setRaiting] = useState<number>(0)
    const dispatch = useDispatch<AppDispatch>()
    const [form] = Form.useForm();

    const memoizedInput = useMemo(() => <Input />, []);

    async function onFinish(e: { name: string, text: string, stars: number }) {
        const response = await dispatch(fetchNewReviews({name: e.name, reviews: e.text, stars: e.stars}))
        const payload = response.payload as IReviewResponse
        if(response?.meta?.requestStatus === "fulfilled"){
            message.success(payload?.message)
            form?.resetFields()
            setRaiting(0)
            // dispatch(fetchGetReviews())
        }
        else{
            message.error(payload?.message)
        }
    }

    return (<>
        <Form
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: '400px' }}
        >
            <Form.Item
                name="name"
                label="Ваше имя"
                rules={[{ required: true, message: 'Пожалуйста, укажите ваше имя!' }]}
            >
                {memoizedInput}
            </Form.Item>
            <Form.Item
                name="text"
                label="Ваш отзыв"
                rules={[{ required: true, message: 'Пожалуйста, оставьте ваш отзыв!' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="stars" label="Оценка" rules={[{ required: true, message: "Пожалуйста, поставьте оценку!" }]}>
                <Rate
                    defaultValue={rating}
                    onChange={setRaiting}
                    allowClear={false}
                />
                {Number(rating) !== 0 && (
                    <Paragraph type="secondary" style={{ marginTop: 4 }}>{rating} из 5</Paragraph>
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ background: "#456B92" }}>
                    Отправить отзыв
                </Button>
            </Form.Item>
        </Form>
    </>);
})

export default Reviews;