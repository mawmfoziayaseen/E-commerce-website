import { Link, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
// import { register } from "@/store/features/auth/authSlice";
import { getAllCategories } from "@/store/features/Categories/CategoriesSlice";

function AddProduct() {
  const [inputValues, setInputValues] = useState({});
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Product Details</CardTitle>
          <CardDescription>
            Enter your information to add a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Full Name</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter Product Title"
                  required
                  name="title"
                  value={inputValues.title || ""}
                  onChange={handleChange}
                />
              </div>
            
              <Button
                type="submit"
                className="w-full"
                disabled={status == "loading" ? true : false}
              >
                {status == "loading" ? "Adding Product ....." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProduct;
