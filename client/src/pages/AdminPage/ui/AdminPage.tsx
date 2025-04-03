import $api from "@/app/config/api";
import { AppDispatch } from "@/app/providers/store/store";
import {
    CreateEventAsync,
    DeleteEventsAsync,
    DeleteReviewsAsync,
    DeleteSpesialAsync,
    EditEventAsync,
    EditSpesialAsync,
    fetchAllSpecial,
    NewSpesialAsync,
    RecordsEventsAsync,
    StatsEventAsync
} from "@/features/Admin";

import Button from "antd/es/button";
import Card from "antd/es/card/Card";
import Flex from "antd/es/flex";    
import Title from "antd/es/typography/Title";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";


const AdminPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchAllSpecial())
    }, [dispatch])

    async function loadSpecial() {
        await $api.post('/loadSpecial')
        dispatch(fetchAllSpecial())
    }

    return (
        <>
            <Flex wrap="wrap" gap="middle" flex={1}>
                <Suspense fallback={<div>Loading create events...</div>}>
                    <CreateEventAsync />
                </Suspense>

                <Suspense fallback={<div>Loading edit events...</div>}>
                    <EditEventAsync />
                </Suspense>

                <Suspense fallback={<div>Loading delete events...</div>}>
                    <DeleteEventsAsync />
                </Suspense>
            </Flex>
            <Flex wrap="wrap" gap="middle" flex={1} style={{ marginTop: "50px" }}>
                <Suspense fallback={<div>Loading delete reviews...</div>}>
                    <DeleteReviewsAsync />
                </Suspense>
            </Flex>
            <Flex wrap="wrap" gap="middle" flex={1} style={{ marginTop: "50px" }}>
                <Suspense fallback={<div>Loading edit special...</div>}>
                    <EditSpesialAsync />
                </Suspense>

                <Suspense fallback={<div>Loading new special...</div>}>
                    <NewSpesialAsync />
                </Suspense>

                <Suspense fallback={<div>Loading delete special...</div>}>
                    <DeleteSpesialAsync />
                </Suspense>

                <Suspense fallback={<div>Loading load special...</div>}>
                    <Card>
                        <Title level={5}>Загрузить специальности по умолчанию</Title>
                        <Button onClick={loadSpecial} type="primary">Загрузить</Button>
                    </Card>
                </Suspense>
            </Flex>
            <Flex wrap="wrap" gap="middle" flex={1} style={{ marginTop: "50px" }}>
                <Suspense fallback={<div>Loading records...</div>}>
                    <RecordsEventsAsync />
                </Suspense>
            </Flex>
            <Flex wrap="wrap" gap="middle" flex={1} style={{ marginTop: "50px" }}>
                <Suspense fallback={<div>Loading stats...</div>}>
                    <StatsEventAsync />
                </Suspense>

            </Flex>
        </>
    );

}

export default AdminPage;