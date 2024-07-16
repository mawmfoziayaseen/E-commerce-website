
import { getSingleProduct } from "@/store/features/products/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import formatNumber from 'format-number';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  // product detail useState making
  const [productDetails,  setProductDetails] = useState({
    title: "",
    category: "",
    picture: "",
    description: "",
    price: "",
  });
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handlerDecement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handlerIncrement = () => {
    setQuantity(quantity + 1);
  };
  // use effect
  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId, dispatch]);

  // making 2nd useEffet
  useEffect(() => {
    if (products && products.product) {
      setProductDetails(products.product);
    }
  }, [products]);

  // for waiting we use status and error
  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading Products....</p>
      </div>
    );
  }

  if (error == "error") {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error while fetching Products....</p>
      </div>
    );
  }
  return (
    <div className="container py-5">
      <h1 className="text-center text-5xl py-7 font-semibold">
        Product Details
      </h1>
      <div className="flex py-5">
        <div className="w-1/2">
          <img
            src={productDetails.picture.secure_url}
            alt={productDetails.title}
            className="mx-auto"
            height={300}
            width={300}
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl mb-3 font-semibold">
            {productDetails.title}
          </h2>
          <p className="capitalize mb-3">
            Price:
            <span className="font-semibold">{formatNumber()(productDetails.price) }</span>
            {""}
            <span className="text-gray-400" style={{ fontSize: "14px" }}>
              PKR/Item
            </span>
          </p>
          <p className="capitalize mb-3">
            Category
            <span className="font-semibold">
              {productDetails.category.name}
            </span>
          </p>
          <p className="capitalize mb-3">{productDetails.description}</p>
          <div>
            <button
              className="px-2 py-1 bg-gray-300 rounded"
              onClick={handlerDecement}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 border p-1"
              readOnly
              value={quantity}
              min={1}
            />
            <button
              className="px-2 py-1 bg-gray-300 rounded"
              onClick={handlerIncrement}
            >
              +
            </button>
          </div>
          <div>
            <button className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
