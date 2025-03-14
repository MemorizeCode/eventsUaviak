
import { EventSchema } from "@/entities/EventsList/model/types/EventsListSchema"
import { Card, Button, Typography } from 'antd';
import styles from "./Event.module.css"
interface EventProps {
  event: EventSchema
  openModal: () => void
  openModalGroup: ()=> void
  mest:string
  // closeModal: () =>void
}

const EventOne = ({ event, openModal,openModalGroup, mest }: EventProps) => {
  const { Title, Paragraph } = Typography;
  return (
    <Card style={{ width: 300 }} className={styles.eventCard}>
      <div className={styles.content}>
        <Title level={4} >{event.title}</Title>
        <Paragraph style={{ flexGrow: 1 }}>{event.description}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Дата проведения: {event.date.split('T')[0]}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Время: {event.times}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Длительность: {event.duration} минут</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Кабинет: {event.cabinet}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Преподователь: {event.prepod}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Кол-во учеников: {event.people_count}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Для классов: {event.whoClasses}</Paragraph>
        <Paragraph style={{ marginBottom: 8 }}>Осталось мест: {mest}</Paragraph>
        <small>ID: {event.id}</small>
      </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={openModal} block className="font-lato" style={{background:"#456B92"}} >
          Записаться индивидуально
        </Button>
        <Button type="primary" onClick={openModalGroup} block style={{ marginTop: "15px", background:"#456B92" }}>
          Записаться группой
        </Button>
      </div>
    </Card>
  );
};


export default EventOne;