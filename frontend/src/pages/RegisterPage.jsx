import { Link, useNavigate } from 'react-router-dom';
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
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { register } from '@/store/features/auth/authSlice';

export default function RegisterPage() {

  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {

          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });

        }

      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      })
  };

  return (
    <div className="h-screen flex justify-center items-center">
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
                <Input id="full-name"
                  placeholder="Full Name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={inputValues.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password"
                  placeholder="******"
                  type="password"
                  name="password"
                  value={inputValues.password || ""}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline"> {/* Corrected Link usage */}
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
