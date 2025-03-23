
// import styles from "./ModalRecord.module.css"
import { memo, useMemo } from "react";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import { useDispatch } from "react-redux";
import { fetchRecord, RecordError } from "@/features/Record/model/service/fetchRecord";
import { AppDispatch } from "@/app/providers/store/store";
import { useCallback } from "react";
import { message } from "antd";


interface ModalRecordProps {
  isOpen: boolean
  closeModal: () => void
  idEvent: number | null
}

const buttonStyle = { background: "#456B92" };

export const ModalRecord = memo(({ isOpen, closeModal, idEvent }: ModalRecordProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const record = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const response = await dispatch(fetchRecord({ ...values, idEvent }));
      const payload = response.payload as RecordError;
      
      if (response.meta.requestStatus === "fulfilled") {
        message.success(payload.message);
        form.resetFields();
        closeModal();
      } else if (payload.error === "warning") {
        message.warning(payload.message);
      } else {
        message.error(payload.message);
      }
    } catch (error) {
      message.error("Ошибка при заполнении формы.");
    }
  }, [dispatch, form, idEvent, closeModal]);

  const memoizedModal = useMemo(() => (
    <Modal
      open={isOpen}
      onCancel={handleCloseModal}
      title="Записаться индивидуально"
      footer={null} // Убираем стандартный футер
    >
      <Form
        form={form}
        name="recordForm"
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Введите фамилию!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Отчество"
          name="surName"
          rules={[{ required: true, message: 'Введите отчество!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Школа"
          name="school"
          rules={[{ required: true, message: 'Введите школу!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Класс"
          name="classRoom"
          rules={[{ required: true, message: 'Введите класс!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="telephone"
          rules={[{ required: true, message: 'Введите телефон!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button onClick={record} type="primary" htmlType="submit" style={buttonStyle}>
            Записаться
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  ), [isOpen, handleCloseModal, form, record]);

  return memoizedModal;
});

export default ModalRecord;