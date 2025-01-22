import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Linkto from "../components/Linkto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [pswd, setPswd] = useState("");
  const navigate = useNavigate();
  const handleSign = async (e) => {
    const response = await axios.post(
      "https://oursplit.onrender.com/api/v1/user/signin",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success === "Success") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <div className="h-3/5 w-96 bg-white rounded-3xl flex flex-col items-center ">
        <Heading
          className={"text-5xl font-bold mt-10"}
          text={"SignIn"}
        ></Heading>
        <Subheading
          text={
            <>
              Enter your credentials to access your <br />
              account
            </>
          }
        ></Subheading>
        <Inputbox
          onChange={(e) => setUsername(e.target.value)}
          label={"Email"}
          placeholder={"Johndoe@gmail.com"}
        />
        <Inputbox
          onChange={(e) => setPswd(e.target.value)}
          label={"Password"}
          placeholder={""}
        />
        <Button
          onClick={handleSign}
          className={"w-80 h-10 mt-5 text-white bg-black rounded-lg"}
          text={"SignIn"}
        ></Button>
        <div className="flex mt-7">
          <p className=" font-sans font-normal">Don't have an account?</p>
          <Linkto
            to={"/dashboard"}
            text={"Signin"}
            className="pointer underline pl-1 cursor-pointer"
          ></Linkto>
        </div>
      </div>
    </div>
  );
}
