import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export function LoginPage() {
    const [inputValues, setInputValues] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValues(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues);
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, inputValues, {
            withCredentials:true ,   //axios send automatically cookies when we apply this property
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                console.log(response.data);
                toast.success(response?.data?.message, { autoClose: 2000 });

                setInputValues({});
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response?.data?.message, { autoClose: 2000 });
                setInputValues({});
            });
    };
    return (
        <div className="h-screen flex justify-center items-center">
          
                <Card className="w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email"
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
                                type="password"
                                placeholder="******"
                                required
                                name="password"
                                value={inputValues.password || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Sign in</Button>

                    </CardFooter>
            </form>
            <div className="mb-4 text-sm text-center">
                Already have an account?{" "}
                <Link to="/register" className="underline">
                    Sign Up
                </Link>
            </div>
        </Card>
          
        </div >
    )
}
