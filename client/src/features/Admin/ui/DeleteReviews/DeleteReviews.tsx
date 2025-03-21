import { Button, message, Typography } from "antd";

import { Input, Space } from "antd";

import { Card } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteReviewsError, fetchDeleteReviews } from "../../models/service/fetchDeleteReviews";
import { AppDispatch } from "@/app/providers/store/store";

const DeleteReviews = () => {
    const { Title } = Typography

    const dispatch = useDispatch<AppDispatch>()
    const [idReview, setIdReview] = useState('')

    async function deleteReviews() {
        const response = await dispatch(fetchDeleteReviews({ idReview }))
        setIdReview('')
        const payload = response.payload as DeleteReviewsError
        if(response.meta.requestStatus === "fulfilled"){
            message.success(response?.payload?.message)
        }
        else if(payload?.status === "warning"){
            message.warning(payload.message)
        }
        else{
            message.error(response?.payload?.message)
        }
    }

    return (<>
        <Card style={{minWidth:"361px"}}>
            <Space direction="vertical">
                <Title level={2}>Удалить отзыв</Title>
                <Input placeholder="ID отзыва" onChange={e => setIdReview(e.target.value)} value={idReview}  style={{ minWidth: "311px" }}/>
                <Button type="primary" style={{ background: "red" }} onClick={deleteReviews}>Удалить отзыв</Button>
            </Space>
        </Card>

    </>);
}
 
export default DeleteReviews;