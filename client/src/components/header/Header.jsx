import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { message } from "antd";

const Header = ({ setSearch }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış Yapmak istediğinize emin misiniz ?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış Yapıldı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10 ">
        {/*Search*/}
          <img title="Diş" className="absolute ml-10 mt-3 flex items-center justify-center"width={100} height={100} alt="Diş Görseli" src="https://plus.unsplash.com/premium_photo-1674179075492-db864287fa12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> 
        {/*logo*/}
        <div
          className="logo flex-1 flex justify-center">
            <Link to="/">
          <h2
            className="text-2xl font-bold 
                        md:text-4xl"
          >
            Dental Caries
          </h2>
        </Link>
        </div>
        {/*logo END*/}
        {/*Menu*/}
        <div
          className="menu-as flex justify-between items-center gap-7 md:static fixed z-50 bottom-0
                                md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t
                                md:px-0 px-4 py-1"
        >
          {/*Ana Sayfa*/}
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "active"}`}
          >
            <HomeOutlined className="px-3 py-1 md:text-2xl text-xla" />
            <span className="md:text-xs text-[10px] ">Ana Sayfa</span>
          </Link>
          {/*Müşteriler*/}
          <Link
            to={"/products"}
            className={`menu-link ${pathname === "/products" && "active"}`}
          >
            <UserOutlined className="px-3 py-1 md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Hastalarım</span>
          </Link>
          <Link
            to={"/cart"}
            className={`menu-link ${pathname === "/cart" && "active"}`}
          >
          <ProfileOutlined className="px-3 py-1 md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Porfilim</span>
          </Link>
          {/*Çıkış*/}
          <div onClick={logOut}>
            <Link className="menu-a flex flex-col hover:text-[red] transition-all">
              <LogoutOutlined className="py-1 md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
          {/*Menu END*/}
        </div>
      </header>
    </div>
  );
};

export default Header;
