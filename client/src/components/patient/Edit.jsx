import { Form, Table, Input, Button, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setPatientData] = useState([]);

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_SERVER_URL + "/api/patient/get-patient", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "patientData");
  //       setPatientData(data.data);
  //     });
  // }, []);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/patient/get-patient"
        );
        const data = await res.json();
        setPatientData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPatient();
  }, []);

  const deletePatient = async (id)  => {
    if(window.confirm("Emin Misiniz ?")){
        try {
            await fetch(process.env.REACT_APP_SERVER_URL + "/api/patient/delete-patient", {
              method: "DELETE",
              body: JSON.stringify({ patientId: id }),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Hasta Başarıyla Silindi");
            //setPatientData(data.filter((item) => item._id !== id));
          } catch (error) {
            message.error("Bir şeyler ters gitti");
            console.log(error);
          }
    }
  };

  const columns = [
    {
      title: "Hasta Adı",
      dataIndex: "patientName",
      key: "name",
      width: "8%",
    },
    {
      title: "Hasta Soyadı",
      dataIndex: "patientSurname",
      width: "8%",
      key: "surname",
    },
    {
      title: "Hasta Tc",
      dataIndex: "patientTc",
      width: "8%",
      key: "tc",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div className="">
            <Button
              type="text"
              danger
              onClick={() => deletePatient(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        // dataSource={data.map((item) => ({
        //   key: item._id,
        //   patientName: item.patientName,
        //   patientSurname: item.patientSurname,
        //   patientTc: item.patientTc,
        // }))}
        dataSource={data}
        bordered
        rowKey={"_id"}
        columns={columns}
        pagination={false}
        scroll={{ x: 1000, y: 500 }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Bırakılamaz !" },
            ]}
          >
            <Input placeholder="Ürün adı giriniz." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Resmi"
            rules={[
              { required: true, message: "Ürün Resmi Alanı Boş Bırakılamaz !" },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              {
                required: true,
                message: "Ürün Fiyatı Alanı Boş Bırakılamaz !",
              },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Kategori Alanı Boş Bırakılamaz !" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
