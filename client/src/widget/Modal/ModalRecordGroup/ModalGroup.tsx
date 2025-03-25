import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Upload from "antd/es/upload";
import message from "antd/es/message";
import { memo, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchRecordGr, RecordGroupError } from '@/features/RecordGroup/model/service/fetchRecord';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { AppDispatch } from '@/app/providers/store/store';

interface ModalGroupProps {
  isOpen: boolean;
  closeModal: () => void;
  idEvent: number | null;
}

const ModalGroup = memo(({ isOpen, closeModal, idEvent }: ModalGroupProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);


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


  const beforeUpload = (file: RcFile) => {
    const allowedExtensions = ['.doc', '.docx'];
    const allowedMimeTypes = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const fileMimeType = file.type;


    if (!allowedExtensions.includes(fileExtension)) {
      message.error('Файл должен быть в формате .doc или .docx');
      setFileList([]); 
      return Upload.LIST_IGNORE; 
    }

  
    if (!allowedMimeTypes.includes(fileMimeType)) {
      message.error('Недопустимый тип файла. Разрешены только документы Word.');
      setFileList([]); 
      return Upload.LIST_IGNORE; 
    }

   
    setFileList([file as UploadFile]);
    return false; 
  };


  const uploadProps: UploadProps = {
    beforeUpload,
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
      const payload = response.payload as RecordGroupError
      if (response.meta.requestStatus === "fulfilled") {
        form.resetFields();
        setFileList([]);
        closeModal();
        setFormData({
          firstNameAttendant: "",
          lastNameAttendant: "",
          surnameAttendant: "",
          school: "",
          tel: "",
          classSchool: "",
          countPeople: null,
        });
        setFileList([]);
        message.success(payload.message);
      } 
      else if (payload.error == "warning") {
        message.warning(payload.message)
      }
      else {
        message.error(payload.message)
      }
    } catch (_) {
      message.error("Не известная ошибк")
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
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ background: "#456B92" }}>
              Записаться группой
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default ModalGroup;