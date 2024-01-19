import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tcNum, setTcNum]=useState('');

  const handleTcChange = (e) =>{
    const value  = e.target.value;

    // Sadece Sayıları Kabul Et
    const acceptNum = value.replace(/[^0-9]/g, '');

    //11 Hane Kontrolü
    if(acceptNum.length <= 11){
      setTcNum(acceptNum);
    }
  };
  const isButtonDisabled = () => {
    // 11 hane kontrolü
    return tcNum.length !== 11;
    
  };
  const onFinish= async (values) => {
    console.log(values);
    setLoading(true);
    try {
      //Giriş İşlemi
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login",{
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });

      const user = await res.json();

      if(res.status===200){
        //Kullanıcı Bilgileri LocalStorage'a Kaydedildi
        localStorage.setItem("posUser", JSON.stringify({
          tcNo: user.tcNo,
          name: user.name,
          surname: user.surname,
        }));
        //Giriş Tamamlandı
        message.success("Giriş Başarılı");
        navigate("/");
      }
      else if(res.status===404)
      {
        message.error("Kullanıcı Bulunamadı");
      }
      else if(res.status===403)
      {
        message.error("Şifre Hatalı !");
      }
      setLoading(false);
    } catch (error) {
      //Giriş Başarısız
      message.error("Giriş Başarısız");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">Dental Caries</h1>
          <Form layout="vertical" onFinish={onFinish} initialValues={{
            remember: true,
          }}>
            <Form.Item
              label="Tc Kimlik No"
              name={"tcNo"}
              rules={[
                {
                  required: true,
                  message: "Lütfen Tc Kimlik No giriniz!",
                },
              ]}
            >
              <Input value={tcNum} onChange={handleTcChange} type="text" maxLength={11} />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Lütfen Şifre giriniz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <FormItem>
                <div className="flex justify-between items-center">
                    <Checkbox>Beni Hatırla </Checkbox>
                    <Link>Şifremi Unuttum</Link>
                </div>
            </FormItem>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
                disabled={isButtonDisabled()}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız yok mu ?&nbsp;{" "}
            <Link className="text-blue-600" to="/register">
              Şimdi Kaydolun.
            </Link>
          </div>
          
        </div>
        <div className="xl:w-5/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#ffffff] h-full">
          <img src="/images/Dental.jpg" alt="Tooth" className="w-full h-full" />
          <div className="w-full h-full flex items-center">
            <div className="w-full h-full">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
