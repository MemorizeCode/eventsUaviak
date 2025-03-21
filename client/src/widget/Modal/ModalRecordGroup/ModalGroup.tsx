import { Modal, Form, Input, Button, Upload, message } from 'antd'; // Import Ant Design components
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchRecordGr } from '@/features/RecordGroup/model/service/fetchRecord';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

interface ModalGroupProps {
  isOpen: boolean;
  closeModal: () => void;
  idEvent: string;
}

const ModalGroup = ({ isOpen, closeModal, idEvent }: ModalGroupProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    firstNameAttendant: "",
    lastNameAttendant: "",
    surnameAttendant: "",
    school: "",
    tel: "",
    classSchool: "",
    countPeople: null as number | null,
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };


  const uploadProps: UploadProps = {
    beforeUpload: (file: RcFile) => {
      setFileList([file as UploadFile]);
      return false;
    },
    onChange: handleFileChange,
    listType: "picture",
  };

  const onFinish = async () => {
    try {
      const response = await dispatch(
        fetchRecordGr({
          formData,
          fileList,
          idEvent,
        })
      );
  
      if (response.meta.requestStatus === "fulfilled") {
        form.resetFields();
        setFileList([]);
        closeModal();
        message.success("Успешно записались на мероприятие");
      } else if (response.meta.requestStatus === "rejected") {
        message.error(response.payload);
      }
    } catch (e) {
      console.log(e)
      setError("Произошла ошибка при отправке данных.");
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        title="Записаться группой"
        footer={null} // Убираем стандартный футер
        style={{ padding: '5px' }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Имя сопровождающего"
            name="firstNameAttendant"
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input
              name="firstNameAttendant"
              value={formData.firstNameAttendant}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Фамилия сопровождающего"
            name="lastNameAttendant"
            rules={[{ required: true, message: 'Введите фамилию!' }]}
          >
            <Input
              name="lastNameAttendant"
              value={formData.lastNameAttendant}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Отчество сопровождающего"
            name="surnameAttendant"
            rules={[{ required: true, message: 'Введите отчество!' }]}
          >
            <Input
              name="surnameAttendant"
              value={formData.surnameAttendant}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Школа"
            name="school"
            rules={[{ required: true, message: 'Введите школу!' }]}
          >
            <Input
              name="school"
              value={formData.school}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Класс"
            name="classSchool"
            rules={[{ required: true, message: 'Введите класс!' }]}
          >
            <Input
              name="classSchool"
              value={formData.classSchool}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Телефон"
            name="tel"
            rules={[{ required: true, message: 'Введите телефон!' }]}
          >
            <Input
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Количество людей"
            name="countPeople"
            rules={[{ required: true, message: 'Введите кол-во людей!' }]}
          >
            <Input
              type="number"
              name="countPeople"
              value={formData.countPeople || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countPeople: parseInt(e.target.value, 10) || null,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Файл список учеников (.docx):"
            rules={[{ required: true, message: 'Загрузите файл учеников в формате .docx' }]}
            name="fileList"
          >
            <Upload {...uploadProps}>
              <Button>Загрузить</Button>
            </Upload>
          </Form.Item>
          {error && <p className="text-red-600">{error}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ background: "#456B92" }}>
              Записаться группой
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalGroup;