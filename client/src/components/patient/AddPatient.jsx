import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";

const AddPatient = ({
  isAddModalOpen,
  setIsAddModalOpen,
}) => {

  const [form]=Form.useForm();
  const [img, setImg] = useState("");
  const [/*allImages*/, setAllImages] = useState([]);

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
    return data;
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imagebase64(file);
    setImg(image);
  }

  const fetchimage = async() =>{
    const res = await fetch(process.env.REACT_APP_SERVER_URL+"/")
    const data = await res.json()
    setAllImages(data.data)
  }

 const handleSubmit = async(e) => {
   e.preventDefault()
 if(img){
 const res = await fetch(process.env.REACT_APP_SERVER_URL+ "/api/images/upload",{
     method: "POST",
     body: JSON.stringify({img:img}),
      headers: {"Content-type": "application/json; charset=UTF-8"},
     })
     if(res.status===200){
        message.success("Fotoğraf Yüklendi.");
        fetchimage()
     }
 }
  }
  
  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+ "/api/patient/add-patient",{
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"},
        });
      if (res.status===200) {
        message.success("Hasta Eklendi.");
        form.resetFields();
    } 
   } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Hasta Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} >
        <Form.Item
          name={"patientName"}
          label="Hasta Adı"
          rules={[
            { required: true, message: "Hasta Adı Alanı Boş Bırakılamaz !" },
          ]}
        >
          <Input  placeholder="Hasta Adı giriniz."/>
        </Form.Item>
        <Form.Item
          name={"patientSurname"}
          label="Hasta Soyadı"
          rules={[
            { required: true, message: "Hasta Soyadı Alanı Boş Bırakılamaz !" },
          ]}
        >
          <Input  placeholder="Hasta Soyadını giriniz."/>
        </Form.Item>
        <Form.Item
          name={"patientTc"}
          label="Hasta Tc"
          rules={[
            { required: true, message: "Hasta Tc Alanı Boş Bırakılamaz !" },
          ]}
        >
          <Input type="text" maxLength={11} placeholder="Hasta Tc giriniz."/>
        </Form.Item>
        <Form.Item
          name={"patientTeethtImg"}
          label="Hasta Diş Fotoğrafı"
        >
          <Input placeholder="patientTeethtImg" type="file" accept=".jpg, .jpeg, .png" onChange={handleUploadImage} />
          {img === "" || img == null ? (
          ""
        ) : (
          <img width={100} height={100} alt="" src={img} />
        )}
        </Form.Item>
        <Form.Item name="submitbutton" className="flex justify-end mb-0 ">
          <Button type="primary" htmlType="submit" onClick={handleSubmit} className="mr-5" >
            Fotoğrafı Yükle
          </Button>
          <Button type="primary" htmlType="submit" onClick={onFinish}  >
            Hastayı Yükle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPatient;
