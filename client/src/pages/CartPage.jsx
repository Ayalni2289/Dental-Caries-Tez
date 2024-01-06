import { Table, Card, Button } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";


const CartPage = () => {
  

  const [data, setUserData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/users/getAllUser", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setUserData(data.data);
    })
  },[]);

  const columns = [
    //Doktor Adı
    {
      title: "Doktor Adı",
      dataIndex: "doctorName",
      key: "name",
      width: "225px",
    },
    //Doktor Soyadı
    {
      title: "Doktor Soyadı",
      dataIndex: "doctorSurname",
      key: "surname",
      width: "225px",
    },
    //Doktor Tc
    {
      title: "Doktor Tc",
      dataIndex: "doctorTc",
      key: "tc",
      width: "225px",
    },
  ];

  return (
    <>
      <Header />
      <div>
        <Table
          dataSource={data.map((item) => ({
            key: item._id,
            doctorName: item.name,
            doctorSurname: item.surname,
            doctorTc: item.tcNo,
          }))
          }
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1200, y: 300 }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <Button
              className="w-full mt-3"
              size="large"
              type="primary"
            >
              Güncelle
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartPage;
