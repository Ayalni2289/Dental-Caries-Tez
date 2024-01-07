import { useState } from "react";
import Add from "./AddPatient";


const Buttons = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // FormData kullanarak dosyayı oluşturun
      const formData = new FormData();
      formData.append('image', file);

      // API endpoint'i (Flask API'nin çalıştığı cihazın adresi)
      const apiUrl = 'http://127.0.0.1:5000';  // Flask API'nin çalıştığı cihazın adresi

      // Yükleme başladığında kullanıcıya bilgi ver
      console.log('Uploading...');

      // Fetch isteği yapın
      fetch(apiUrl, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // API'den gelen tahmin sonuçlarını setPrediction ile state'e kaydedin
        setPrediction(data.predictions);
        // Kullanıcıya yüklemenin tamamlandığını bildir
        console.log('Upload completed.');
      })
      .catch(error => {
        console.error('Error:', error);
        // Kullanıcıya bir hata oluştuğunu bildir
        console.error('Upload failed.');
      });
    }
  };

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
        onClick={handleUpload} onChange={handleFileChange}
       // YAPAY ZEKA ENTEGRASYONU !
      >
        {prediction && (
        <div>
          <h2>Prediction Results:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
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
