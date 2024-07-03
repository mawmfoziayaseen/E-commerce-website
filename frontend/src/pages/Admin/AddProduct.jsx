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
import { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/features/auth/authSlice";

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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange}
                />
              </div>
            
              <Button
                type="submit"
                className="w-full"
                disabled={status == "loading" ? true : false}
              >
                {status == "loading"
                  ? "Creating Account ....."
                  : "Create Account"}
              </Button>
            </div>
          </form>
         
        </CardContent>
      </Card>
    </>
  );
}

export default AddProduct;
