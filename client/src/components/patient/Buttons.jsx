import { useState } from "react";
import Add from "./AddPatient";
import { Button, Table, Upload, message, Tag, Typography  } from "antd";
import { UploadOutlined } from "@ant-design/icons";


const Buttons = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const api_url = "https://464a-188-132-140-102.ngrok-free.app"; //Your API URL here

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(api_url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData);

        message.success(`Dosya başarıyla yüklendi`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        message.error(`${file.name} dosyası yükleme hatası.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      //authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        handleFileUpload(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} dosya yükleme hatası.`);
      }
    },
  };

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => {
        if (record.field === 'Predicted Class') {
          return <Tag color="green">{text}</Tag>;
        }
        return text;
      },
    },
  ];

  const data = result
  ? [
      { key: '1', field: 'Predicted Class', value: result.predicted_class },
      { key: '2', field: 'Confidence', value: result.confidence },
    ]
  : [];
  
  return (
    <div className="products-wrapper flex flex-row gap-10 w-full items-center justify-center">
      <div
        className="product-item border hover:shadow-lg rounded-md
       cursor-pointer transition-all select-none
       bg-fuchsia-700 flex justify-center items-center hover:opacity-80 min-h-[180px] min-w-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <p className="text-white font-mono text-sm md:text-xl">Hasta Ekle</p>
      </div>
      <Upload {...props} accept=".png, .jpg, .jpeg" type="file" listType="picture" >
        <div>
          <Button 
            icon={<UploadOutlined />}
            className="text-white font-mono text-sm bg-fuchsia-700 rounded-2xl font-semibold"
          >
                        Teşhis İçin Fotoğraf Yükleyiniz

          </Button>
        </div>
      </Upload>
      <Table
      dataSource={data}
      columns={columns}
      bordered
      pagination={false}
    />
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  );
};

export default Buttons;
