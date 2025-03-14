
// import styles from "./ModalRecord.module.css"
import { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { fetchRecord } from "@/features/Record/model/service/fetchRecord";


interface ModalRecordProps {
  isOpen: boolean
  closeModal: () => void
  idEvent: number | null
}

function ModalRecord({ isOpen, closeModal, idEvent }: ModalRecordProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [surName, setSurName] = useState("")
  const [school, setSchool] = useState("")
  const [classRoom, setClassRoom] = useState("")
  const [telephone, setTelephone] = useState("")
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  async function record() {

    const response = await dispatch(fetchRecord({ firstName, lastName, surName, school, classRoom, telephone, idEvent }))
    if (response.meta.requestStatus == "fulfilled") {
      form.resetFields()
      setFirstName("")
      setLastName("")
      setSurName("")
      setSchool("")
      setClassRoom("")
      setTelephone("")
      closeModal()
    }
    else if(response.meta.requestStatus == "rejected"){
      message.error(response.payload)
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        title="Записаться индивидуально"
        footer={null} // Убираем стандартный футер
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }} // Увеличиваем ширину label на всю строку
          wrapperCol={{ span: 24 }} // Увеличиваем ширину input на всю строку
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[{ required: true, message: 'Введите фамилию!' }]}
          >
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Отчество"
            name="surName"
            rules={[{ required: true, message: 'Введите отчество!' }]}
          >
            <Input value={surName} onChange={(e) => setSurName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Школа"
            name="school"
            rules={[{ required: true, message: 'Введите школу!' }]}
          >
            <Input value={school} onChange={(e) => setSchool(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Класс"
            name="classRoom"
            rules={[{ required: true, message: 'Введите класс!' }]}
          >
            <Input value={classRoom} onChange={(e) => setClassRoom(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="telephone"
            rules={[{ required: true, message: 'Введите телефон!' }]}
          >
            <Input type="number" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button onClick={record} type="primary" htmlType="submit" style={{ background: "#456B92" }}>
              Записаться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalRecord;