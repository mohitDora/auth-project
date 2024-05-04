import { getAuth, signOut } from "firebase/auth";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { Card } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tilt } from "react-tilt";
import QRCode from "react-qr-code";

function Profile({ user }) {
  console.log(user);
  const [userData, setUserData] = useState(null);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://auth-project-topaz.vercel.app/api/user/${user?.uid}`
      );
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        setUserData(res_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logout Success");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  return userData === null ? (
    "loading"
  ) : (
    <div className="w-full h-screen flex justify-center align-middle flex-col">
      <div className="w-[350px] m-auto flex flex-col gap-2">
        <Tilt
          className="card"
          options={{
            max: 15,
            perspective: 1400,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            speed: 1200,
            glare: true,
            "max-glare": 0.2,
            scale: 1.01,
          }}
        >
          <Card className="w-[350px] p-4 flex flex-col gap-4">
            <QRCode
              value={
                userData?.profilePicture || "https://github.com/shadcn.png"
              }
              className="m-auto"
            />
            <div className="flex gap-2">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    userData?.profilePicture || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {userData?.name}
                </h3>
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                  {userData?.email}
                </p>
                <div>{userData?.gender}</div>
              </div>
            </div>
          </Card>
        </Tilt>
        <Button onClick={handleLogout}>Sign out</Button>
      </div>
    </div>
  );
}

export default Profile;
