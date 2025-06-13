import { memo, useEffect, useState } from "react";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Space from "antd/es/space";
import Typography from "antd/es/typography";
import message from "antd/es/message";
import $api from "@/app/config/api";
import Table from "antd/es/table";


const ConfirmReviews = memo(() => {
    const { Title } = Typography

    const [confirmReviews, setConfirmReviews] = useState([])


    async function confirmRevies(id: number) {
        try {
            const response = await $api.put(`/reviews/confirmReviews?id=${id}`)
            if(response.status === 200){
                message.success(`Отзыв id: ${id} подтвержден!`)
                setConfirmReviews((prev)=> prev.filter((e:any)=> e.id !== id))
            }
            else{
                message.error(response.data.message)
            }
        }
        catch (e:any) {

        }
    }

    async function deleteReviews(id: number) {
        try {
            const response = await $api.delete(`/reviews/deleteReviews?id=${id}`)
            if(response.status === 200){
                message.success(`Отзыв id: ${id} удален!`)
                setConfirmReviews((prev)=> prev.filter((e:any)=> e.id !== id))
            }
            else{
                message.error(response.data.message)

            }
        }
        catch (e:any) {
            
        }
    }

    async function getConfirmReviews() {
        try {
            const response = await $api.get("/reviews/getReviewsAdmin")
            setConfirmReviews(response?.data?.reviews)
        }
        catch (e) {

        }
    }

    useEffect(() => {
        getConfirmReviews()
    }, [])

    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: "Имя",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Отзыв",
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: "Оценка",
            dataIndex: 'stars',
            key: 'stars',
        },
        {
            title: "Действие",
            dataIndex: 'action',
            key: 'action',
            render: (_: string, action: any) => {
                return (
                    <>
                        <Button onClick={()=>deleteReviews(action.id)} danger>Удалить</Button>
                        <Button onClick={()=>confirmRevies(action.id)} style={{ marginLeft: "3px", background: "green", color: '#fff' }}>Подтвердить</Button>
                    </>
                )
            }
        },
    ]

    return (
        <Card style={{ minWidth: "500px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={2}>Подтвердить отзыв</Title>
                {confirmReviews && Array.isArray(confirmReviews) && confirmReviews.length > 0 ?
                    <Table rowKey={() => Date.now() * Math.random()} columns={columns} dataSource={confirmReviews} />
                    :
                    <p>Записей нет</p>
                }
            </Space>
        </Card>
    );
})

export default ConfirmReviews;