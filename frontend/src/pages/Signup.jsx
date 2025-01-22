import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Linkto from "../components/Linkto";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [pswd, setPswd] = useState("");
  const navigate = useNavigate();
  const addUser = async () => {
    const response = await axios.post(
      "https://oursplit.onrender.com/api/user/signup",
      {
        username: username,
        fname: firstName,
        lname: lastName,
        pswd: pswd,
      }
    );
    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <div className="h-4/5 w-96 bg-white rounded-3xl flex flex-col items-center ">
        <Heading
          className={"text-5xl font-bold mt-10"}
          text={"SignUp"}
        ></Heading>
        <Subheading
          text={
            <>
              Enter your information to create <br /> an account
            </>
          }
        ></Subheading>
        <Inputbox
          onChange={(e) => setFirstname(e.target.value)}
          label={"First Name"}
          placeholder={"John"}
        />
        <Inputbox
          onChange={(e) => setLastname(e.target.value)}
          label={"Last Name"}
          placeholder={"Doe"}
        />
        <Inputbox
          onChange={(e) => setUsername(e.target.value)}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <Inputbox
          onChange={(e) => setPswd(e.target.value)}
          label={"Password"}
          placeholder={""}
        />
        <Button
          onClick={addUser}
          className={"w-80 h-10 mt-5 text-white bg-black rounded-lg"}
          text={"SignUp"}
        ></Button>
        <div className="flex mt-7">
          <p className=" font-sans font-normal">Already have an account?</p>
          <Linkto
            to={"/signin"}
            text={"Signin"}
            className="pointer underline pl-1 cursor-pointer"
          ></Linkto>
        </div>
      </div>
    </div>
  );
}
