import {  useState } from "react";
import Header from "../components/header/Header";
import Buttons from "../components/patient/Buttons";
import AI from "../components/patient/AI";

const HomePage = () => {
  const [filtered] = useState([]);

  return (
    <>
      {/*Header*/}
      <Header />
       (
        <div class-Name="home flex flex-row px-6 md:flex-col justify-center items-center md:pb-0 pb-24 h-screen">
          {/*Buttons*/}
          <div className="products flex flex-col justify-center overflow-auto items-center">
            <Buttons
            filtered={filtered}
            />
            <AI />
          </div>
        </div>
      )
      (
      )
    </>
  );
};

export default HomePage;
