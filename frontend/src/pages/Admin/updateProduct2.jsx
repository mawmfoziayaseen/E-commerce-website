import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import { getSingleProduct } from "@/store/features/products/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";


function UpdateProduct() {
    const dispatch = useDispatch();
    const {productId} = useParams();
    useEffect(()=>{
        dispatch(getSingleProduct(productId));
        
        dispatch(getAllCategories());
        },[productId,dispatch]);

  return (
    <div>UpdateProduct</div>
  )
}

export default UpdateProduct;