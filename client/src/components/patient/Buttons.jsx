import { useState } from "react";
import Add from "./AddPatient";


const Buttons = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      <div
        className="product-item border hover:shadow-lg rounded-md
       cursor-pointer transition-all select-none
       bg-green-700 flex justify-center items-center hover:opacity-80 min-h-[180px] min-w-[180px]"
       // YAPAY ZEKA ENTEGRASYONU !
      >
        <p className="text-white font-mono text-sm md:text-xl">
          Teşhis Oluştur
        </p>
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <div className="image">

      </div>
    </div>
  );
};

export default Buttons;
