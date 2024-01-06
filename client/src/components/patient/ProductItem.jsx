import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item }) => {
  
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...item, quantity: 1}));
    message.success("Hasta Eklendi.",[0.7]);
  };

  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
    </div>
  );
};

export default ProductItem;
