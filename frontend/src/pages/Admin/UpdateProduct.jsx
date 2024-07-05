import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import { getSingleProduct } from "@/store/features/products/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { productId } = useParams();

  // handlechange function
  const handleChange = () => {};

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Details </CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form encType="multipart/form-data">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter Product Title"
                  required
                  name="title"
                  value={inputValues.title}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="text"
                    id="price"
                    placeholder="Enter Product Price"
                    required
                    name="price"
                    value={inputValues.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    type="text"
                    required
                    name="category"
                    value={inputValues.category}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    type="file"
                    id="picture"
                    placeholder="Enter Product picture"
                    required
                    value={inputValues.picture}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "picture",
                          value: e.target.files[0],
                        },
                      });
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Previous Picture</Label>
                  <Input type="text" required placeholder="Previous Picture" />
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                 placeholder="Enter Product description"
                 className="min-h-32"
                  required
                  name="description"
                  value={inputValues.description}
                  onChange={handleChange}
                />
              </div>
              <div className="">
               <Button type="submit">Update Product</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default UpdateProduct;
