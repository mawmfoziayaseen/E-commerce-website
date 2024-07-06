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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";
import {
  getSingleProduct,
  updateSingleProduct,
} from "@/store/features/products/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    category: "",
    picture: "",
    description: "",
  });
  const [prevPic, setPrevPic] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const catStatus = useSelector((state) => state.categories.status);
  const catError = useSelector((state) => state.categories.error);
  const products = useSelector((state) => state.products.products);
  const prodStatus = useSelector((state) => state.products.status);
  const prodError = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  // handlechange function
  const handleChange = (e) => {
    const { name, value, type, file } = e.target;
    setInputValues((values) => ({
      ...values,
      [name]: type === "file" ? file[0] : value,
    }));
  };
  const handleCategoryChange = (value) => {
    setInputValues((values) => ({ ...values, category: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
    dispatch(updateSingleProduct({ inputValues, productId }))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          navigate("/admin/products");
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    dispatch(getAllCategories());
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) {
      const { title, price, category, picture, description } = products.product;
      setInputValues({
        title: title,
        price: price,
        category: category._id,
        picture: picture.secure_url,
        description: description,
      });
      setPrevPic(picture.secure_url);
    }
  }, [products]);

  if (catStatus == "loading" || prodStatus == "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  if (catError == "failed" || prodError == "failed") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error....</p>
      </div>
    );
  }

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
          <form encType="multipart/form-data" on onSubmit={handleSubmit}>
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
                  <Select
                    value={inputValues.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.categories &&
                        categories.categories.map((category) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
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
                  <img
                    src={prevPic}
                    height={70}
                    width={70}
                    alt={inputValues.title}
                  />
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
