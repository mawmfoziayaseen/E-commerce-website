import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const handlerSubmit = (e)=>{
    e.preventDefault();
    console.log("submit")
  }
  return (
   <div className ="h-screen flex justify-center items-center  ">
     <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>

      <form onSubmit={handlerSubmit }>

      <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="Full Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password"  placeholder="******" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>

        </div>
      </form>
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
   </div>
  )
}
