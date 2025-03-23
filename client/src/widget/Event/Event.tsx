
import { EventSchema } from "@/entities/EventsList/model/types/EventsListSchema"
import Card from "antd/es/card";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import styles from "./Event.module.css"
import { useMemo } from 'react';
interface EventProps {
  event: EventSchema
  openModal: () => void
  openModalGroup: () => void
  mest: string
  // closeModal: () =>void
}


const EventOne = ({ event, openModal, openModalGroup, mest }: EventProps) => {
  const { Title, Paragraph } = Typography;

  const dateEvent = useMemo(() => {
    const splitData = event?.date?.split('T')[0].split('-');
    return `${splitData[2]}.${splitData[1]}.${splitData[0]}`;
  }, [event.date]);

  const titleStyle = useMemo(() => ({
    // Define your title styles here
    marginBottom: '16px',
  }), []);

  const paragraphStyle = useMemo(() => ({
    // Define your paragraph styles here
    marginBottom: '24px',
  }), []);

  const contentStyle = useMemo(() => ({
    // Define your content styles here
    marginBottom: '16px',
  }), []);

  const detailsTitleStyle = useMemo(() => ({
    // Define your details title styles here
    marginBottom: '8px',
  }), []);

  const paragraphDetailsStyle = useMemo(() => ({
    // Define your paragraph details styles here
    marginBottom: '4px',
  }), []);

  const smallStyle = useMemo(() => ({
    // Define your small text styles here
    color: '#888',
  }), []);

  const btn = useMemo(() => ({
    marginBottom: 8,
    backgroundColor: '#456b92',
  }), []);



  return (
    <Card className={styles.eventCard}>
      <div className={styles.content}>
        <Title level={4} style={titleStyle}>{event.title}</Title>
        <Paragraph style={paragraphStyle}>{event.description}</Paragraph>

        <div style={contentStyle}>
          <Title level={5} style={detailsTitleStyle}>Детали мероприятия</Title>
          <Paragraph style={paragraphDetailsStyle}><strong>Дата проведения:</strong> {dateEvent}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Время:</strong> {event.times}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Длительность:</strong> {event.duration} минут</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Кабинет:</strong> {event.cabinet}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Преподаватель:</strong> {event.prepod}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Количество мест:</strong> {event.people_count}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Осталось мест:</strong> {mest}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Для классов:</strong> {event.whoClasses}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Специальность:</strong> {event.eventSpeciality.title}</Paragraph>
          <small style={smallStyle}><strong>ID:</strong> {event.id}</small>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={openModal}
          block
          className="font-lato"
          style={btn}
        >
          Записаться индивидуально
        </Button>
        <Button
          type="primary"
          onClick={openModalGroup}
          block
          style={btn}
        >
          Записаться группой
        </Button>
      </div>
    </Card>
  );
};


export default EventOne;