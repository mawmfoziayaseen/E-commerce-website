import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/store/features/products/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

function Shop() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // this is use Effect
  useEffect(() => {
    dispatch(getAllProducts()); // get all product function
  }, [dispatch]);

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
      <h1 className="text-3xl font-semibold text-center py-4">
        {" "}
        Latest
        <span className="text-orange-400">Houses</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products &&
          products.products &&
          products.products.map((product) => {
            return (
              <div key={product._id}>
                <ProductCard product={product} />
                
              </div>
            );
          })} 
      </div>
    </div>
  );
}

export default Shop;
