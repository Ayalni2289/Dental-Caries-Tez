import { Button, Form, Input, message} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      //Kayıt İşlemi
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        //Kayıt Tamamlandı
        message.success("Kayıt Başarılı, Giriş Yapabilirsiniz.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      //Kayıt Başarısız
      message.error("Kayıt Başarısız");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Dental Caries</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Tc Kimlik No"
              type="number"
              name={"tcNo"}
              rules={[
                {
                  required: true,
                  message: "Lütfen Tc Kimlik No giriniz!",
                },
              ]}
            >
              <Input type="text" maxLength={11}/>
            </Form.Item>
            <Form.Item
              label="İsim"
              name={"name"}
              rules={[
                {
                  required: false,
                  message: "Lütfen Adınızı Giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Soyisim"
              name={"surname"}
              rules={[
                {
                  required: true,
                  message: "Lütfen Soyadınızı giriniz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Lütfen Şifrenizi giriniz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Lütfen Şifreyi tekrar giriniz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Şifreler birbiriyle uyuşmuyor!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız mı var ?&nbsp;{" "}
            <Link className="text-blue-600" to="/login">
              Şimdi giriş yapın.
            </Link>
          </div>
        </div>
        <div className="xl:w-5/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#ffffff] h-full">
          <img src="/images/Dental.jpg" alt="Tooth" className="w-full h-full" />
          <div className="w-full h-full flex items-center">
            <div className="w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
