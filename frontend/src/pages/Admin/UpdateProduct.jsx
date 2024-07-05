import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import { getSingleProduct } from "@/store/features/products/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, useParams } from "react-router-dom";

function UpdateProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  return (
    <>
     <div>
        <Card>
          <CardHeader>
            <CardTitle>Product Details </CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  className="me-2"
                  type="text"
                  required
                  name="name"
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                  }}
                />
                <Button>Update Category</Button>
              </div>
            </Form> */}
          </CardContent>
        </Card>
      </div>
    </>
  )
  
}

export default UpdateProduct;
