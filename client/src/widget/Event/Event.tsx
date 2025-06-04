
import { EventSchema } from "@/entities/EventsList/model/types/EventsListSchema"
import Card from "antd/es/card";
import Button from "antd/es/button";
import Typography from "antd/es/typography";
import styles from "./Event.module.css"
import { memo, useMemo } from 'react';
interface EventProps {
  event: EventSchema
  openModal: () => void
  openModalGroup: () => void
  mest: number
  // closeModal: () =>void
}


const EventOne = memo(({ event, openModal, openModalGroup, mest }: EventProps) => {

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

  const memoizedDescription = useMemo(() => (
    <Paragraph style={paragraphStyle}>{event.description}</Paragraph>
  ), [event.description, paragraphStyle]);

  const memoizedMest = useMemo(() => (
    <Paragraph style={paragraphDetailsStyle}><strong>Свободных мест:</strong> {mest}</Paragraph>
  ), [mest, paragraphDetailsStyle]);

  const isDatePassed = useMemo(() => {
    const splitDate = event.date.split('T')[0]
    const time = event.times
    const eventDate = new Date(`${splitDate}T${time}`)
    const currentDate = new Date()
    return eventDate < currentDate
  }, [event.date]);


  return (
    <Card className={styles.eventCard} style={{
      width: 540,
      position: 'relative', // Для абсолютного позиционирования кнопок
      paddingBottom: 80,   // Отступ снизу, чтобы кнопки не перекрывали контент
    }} >
      <div className={styles.content} style={{ flex: 1, overflow: 'auto' }}>
        <Title level={4} style={titleStyle}>{event.title}</Title>
        {memoizedDescription}

        <div style={contentStyle}>
          <Title level={5} style={detailsTitleStyle}>Детали мероприятия</Title>
          <Paragraph style={paragraphDetailsStyle}><strong>Дата проведения:</strong> {dateEvent}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Время:</strong> {event.times}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Длительность:</strong> {event.duration} минут</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Кабинет:</strong> {event.cabinet}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Преподаватель:</strong> {event.prepod}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Количество мест:</strong> {event.people_count}</Paragraph>
          {memoizedMest}
          <Paragraph style={paragraphDetailsStyle}><strong>Для классов:</strong> {event.whoClasses}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Специальность:</strong> {event.eventSpeciality.title}</Paragraph>
          <Paragraph style={paragraphDetailsStyle}><strong>Доп. информация:</strong> {isDatePassed ? "Мероприятие уже прошло" : "Мероприятие будет"}</Paragraph>
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
          disabled={!mest || isDatePassed}
        >
          Записаться индивидуально
        </Button>
        <Button
          type="primary"
          onClick={openModalGroup}
          block
          style={btn}
          disabled={!mest || isDatePassed}
        >
          Записаться группой
        </Button>
      </div>
    </Card>
  );
})


export default EventOne;