import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteReviewsError, fetchDeleteReviews } from "../../models/service/fetchDeleteReviews";
import { AppDispatch } from "@/app/providers/store/store";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Input from "antd/es/input";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";

const DeleteReviews = memo(() => {
    const { Title } = Typography

    const dispatch = useDispatch<AppDispatch>()
    const [idReview, setIdReview] = useState('')

    async function deleteReviews() {
        const response = await dispatch(fetchDeleteReviews({ idReview }))
        setIdReview('')
        const payload = response.payload as DeleteReviewsError
        if (response.meta.requestStatus === "fulfilled") {
            message.success(response?.payload?.message)
        }
        else if (payload?.status === "warning") {
            message.warning(payload.message)
        }
        else {
            message.error(response?.payload?.message)
        }
    }

    return (<>
        <Card style={{ minWidth: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={2}>Удалить отзыв</Title>
                <Input placeholder="ID отзыва" onChange={e => setIdReview(e.target.value)} value={idReview} style={{ minWidth: "311px" }} />
                <Button type="primary" style={{ background: "red" }} onClick={deleteReviews}>Удалить отзыв</Button>
            </Space>
        </Card>

    </>);
})

export default DeleteReviews;