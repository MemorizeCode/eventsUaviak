
import { EventSchema } from "@/entities/EventsList/model/types/EventsListSchema"
import { Card, Button, Typography } from 'antd';
import styles from "./Event.module.css"
interface EventProps {
  event: EventSchema
  openModal: () => void
  openModalGroup: () => void
  mest: string
  // closeModal: () =>void
}

const EventOne = ({ event, openModal, openModalGroup, mest }: EventProps) => {
  const { Title, Paragraph } = Typography;

  const splitData = event.date.split('T')[0].split('-')
  const dateEvent = `${splitData[2]}.${splitData[1]}.${splitData[0]}`


  return (
    <Card style={{ width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className={styles.eventCard}>
      <div className={styles.content}>
        <Title level={4} style={{ marginBottom: 16 }}>{event.title}</Title>
        <Paragraph style={{ flexGrow: 1, marginBottom: 16 }}>{event.description}</Paragraph>

        <div style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginBottom: 8 }}>Детали мероприятия</Title>
          <Paragraph style={{ marginBottom: 8 }}><strong>Дата проведения:</strong> {dateEvent}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Время:</strong> {event.times}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Длительность:</strong> {event.duration} минут</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Кабинет:</strong> {event.cabinet}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Преподаватель:</strong> {event.prepod}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Количество учеников:</strong> {event.people_count}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Для классов:</strong> {event.whoClasses}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Специальность:</strong> {event.eventSpeciality.title}</Paragraph>
          <Paragraph style={{ marginBottom: 8 }}><strong>Осталось мест:</strong> {mest}</Paragraph>
          <small><strong>ID:</strong> {event.id}</small>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={openModal}
          block
          className="font-lato"
          style={{ background: "#456B92", marginBottom: 8 }}
        >
          Записаться индивидуально
        </Button>
        <Button
          type="primary"
          onClick={openModalGroup}
          block
          style={{ background: "#456B92" }}
        >
          Записаться группой
        </Button>
      </div>
    </Card>
  );
};


export default EventOne;