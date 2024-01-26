from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as im
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Tüm kaynaklardan gelen talepleri kabul etmek için

# Eğittiğiniz modelinizi yükleyin
model = load_model('BestModelEpoch40.h5')

Class_Indices = {'caries': 0, 'deep caries': 1, 'null': 2}

@app.route('/', methods=['POST'])
def predict():
    try:
        # Gelen resmi alın
        if 'image' not in request.files:
            return jsonify({'error': 'No image part in the request'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected image file'}), 400

        file = Image.open(file.stream)
        img = file.resize((224, 224))  # 

        # Görüntüyü diziye çevirin
        img_array = im.img_to_array(img)

        # Resmi genişletin (batch boyutu için)
        img_array = np.expand_dims(img_array, axis=0)

        # Görüntüyü modelle tahmin et
        predictions = model.predict(img_array)

        # En yüksek olasılığa sahip sınıfın indeksini bulun
        predicted_class_index = np.argmax(predictions[0])

        # Sınıf indeksini sınıf etiketlerinden çıkarın
        class_labels = Class_Indices
        predicted_class_label = [k for k, v in class_labels.items() if v == predicted_class_index][0]

        # Tahmin edilen sınıfa ait olasılığı bulun
        confidence = predictions[0][predicted_class_index]
                # Sonuçları JSON formatında döndürün
        result = {
            'predicted_class': predicted_class_label,
            'confidence': float(confidence)
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Uygulamayı çalıştırın
    app.run(debug=True)
