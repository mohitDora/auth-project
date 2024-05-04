import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import app from "./firebase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Signup({ user }) {
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: null,
    profilePicture: "https://github.com/shadcn.png", 
  });

  const handleChange = (e) => {
    if (
      e.target.name === "profilePicture" ||
      e.target.name === "coverPicture"
    ) {
      // Handle file inputs
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, [e.target.name]: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Handle other inputs
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  console.log(formData);
  const storeToDatabse = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          uid: id?.uid,
        }),
      });
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          gender: "",
          profilePicture: null,
          coverPicture: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = response.user;
      console.log(user);
      const res = await storeToDatabse(user);
      console.log(res);
      window.location.href = "/";
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="firstName"
                  placeholder="Max"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="lastName"
                  placeholder="Robinson"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Select
              value={formData.gender}
              onChange={handleChange}
              name="gender"
            >
              <SelectTrigger>
                <SelectValue>{formData.gender || "Gender"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={handleChange}
                required
              />
            </div>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            )}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
