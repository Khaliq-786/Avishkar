import "./SignUp.css"; // Import your CSS file
import { useState, useEffect } from "react";
import qr from "../../assets/ACcount.png";
import bg from "./loginbg1.jpeg";
import axios from "axios";
import signUp from "../../services/authService.js";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom";
import Old from "../Home/assets/old.jpg";
import { toast } from "react-toastify";
import Loader from "../Home/loader.jsx";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [college, setCollege] = useState("");
  const [name, setName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [gender, setGender] = useState("");
  const [isRotated, setIsRotated] = useState(false); // New state for rotation
  const [showQr, setShowQr] = useState(false);
  const [isloading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const response = localStorage.getItem("userData");
    if (response && localStorage.getItem("userToken")) return navigate("/");
    //toast.info("Mnnit Student Should Use G Suite Id for no fee payment")
  }, []);

  const handleCollege = (value) => {
    if (value === "other") {
      setShowOther(true);
      toast.info("Upload Payment ScreenShot To Drive and Submit The Link");
    } else setShowOther(false);
    setCollege(value);
  };

  const handleToggleRotation = () => {
    setIsRotated(!isRotated);
    setShowQr(!showQr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      email: email,
      password: password,
      gender: gender,
      phone: phone,
      college: college,
      paymentLink: transactionId,
    };
    console.log(data);
    try {
      const success = await signUp(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    // await axios.post("http://localhost:5000/api/auth/signup", data);
  };
  return (
    <>
      {isloading && <Loader />}
      <div className="containerAcco absolute w-full h-full overflow-hidden">
        <div className="absolute z-[-1] ">
          <img src={Old} className=" object-cover w-screen h-screen  z-[-1]" />
        </div>
        <Navbar className="" page="SignUp" />
        <div
          className={`flex justify-center flex-wrap items-center h-[100vh] scene ${
            isRotated ? "rotation" : ""
          }`}

          // style={{
          //   backgroundImage: url(${bg}),
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <div className="locard  opacity-80 hover:opacity-100 bg-yellow-200 rounded-2xl flex justify-center flex-col p-5">
            {/* {isRotated && (
          <div> */}
            {/* {showQr === false && (
          <p className="ml-[1em] mt-[0.4em] mb-[0.5em]">Sign Up</p>
        )} */}

            {isRotated === false ? (
              <form
                className="w-full h-full   gap-5 flex flex-col justify-center items-center"
                style={showQr ? {} : { marginTop: "5%" }}
              >
                <div className="gap-5   flex flex-col h-[90%] font-medium overflow-y-scroll w-full pt-5 pb-3 p-2 bg-gray-200 bg-opacity-20 rounded shadow-lg backdrop-filter backdrop-blur-md">
                  <label htmlFor="email" className="font-Robo">
                    Name
                  </label>
                  <input
                    className="input"
                    type="text"
                    id="email"
                    name="name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="font-Robo" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="font-Robo" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="font-Robo" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className="input"
                    id="gender"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div className="bg-#ffffff p-2 rounded-lg max-w-[350px]">
                    <label className="font-Robo" htmlFor="gender">
                      Phone Number{" "}
                    </label>
                    <div className="relative mt-2 max-w-xs text-#ffffff-500">
                      <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                        <option>+91</option>
                      </div>
                      <input
                        htmlFor="phone"
                        type="number"
                        placeholder="8980000000"
                        id="phone"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        className="input w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-#584c4c00 outline-none border focus:border-slate-600 shadow-sm rounded-lg"
                      />
                    </div>
                  </div>
                  <label className="font-Robo" htmlFor="college">
                    College
                  </label>
                  <select
                    id="college"
                    name="college"
                    onChange={(e) => handleCollege(e.target.value)}
                  >
                    <option value="">Select your college</option>
                    <option value="mnnit">MNNIT</option>
                    <option value="other" onClick={() => setShowQr(true)}>
                      Other
                    </option>
                  </select>

                  {showQr && <p className="">Pay here</p>}

                  {showOther && (
                    <div>
                      <label htmlFor="email">College Name:</label>
                      <input
                        className="input"
                        type="text"
                        id="email"
                        name="college"
                        placeholder="Enter your college"
                        onChange={(e) => setCollege(e.target.value)}
                      />
                      <label htmlFor="email">PaymentLink:</label>
                      <input
                        className="input"
                        type="text"
                        id="email"
                        name="transactionId"
                        placeholder="Enter Payment Drive Link"
                        onChange={(e) => setTransactionId(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="h-[10%] flex justify-center items-center  w-full">
                  <button
                    className="containerUser px-4 font-Robo   text-orange-950  font-bold rounded-[2px] h-10 text-[1em] border-opacity-25 hover:bg-orange-800 hover:shadow-9xl"
                    style={{
                      // Add box shadow styles here
                      boxShadow: "0 0 0 1.5px #000000", // Example box shadow
                    }}
                    onClick={(e) => handleSubmit(e)}
                    // style={{ backgroundColor: "rgb(248, 213, 177, 0.84)",border:"1px solid" }}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <div className="text-black  font-Robo text-md font-semibold tracking-tighter">
                    Already have an account ?{" "}
                    <span
                      className=" font-Robo text-sm font-semibold text-orange-800 hover:text-orange-950 tracking-tighter cursor-pointer"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              </form>
            ) : (
              <img src={qr} alt="qr" />
            )}

            {/* </div>
        )} */}
            {showQr === false && showOther && (
              <button
                className="mb-[-3.2em] mt-[3em] text-orange-950 containerUser  hover:bg-opacity-25 border-8  p-2 rounded-xl hover:shadow-xl font-bold"
                onClick={handleToggleRotation}
                style={{
                  border: "1px solid #000",
                }}
              >
                Pay here
              </button>
            )}
            {showQr && (
              <button
                className="mb-[-3.2em] mt-[3em] rotation"
                onClick={handleToggleRotation}
              >
                Done
              </button>
            )}
          </div>

          <svg className="lofilter">
            {showQr === false && (
              <>
                <filter id="wavy2">
                  <feTurbulence
                    x="0"
                    y="0"
                    baseFrequency="0.01"
                    numOctaves="3"
                    seed="1"
                  ></feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    scale="8"
                  ></feDisplacementMap>
                </filter>
              </>
            )}
          </svg>
        </div>
      </div>
    </>
  );
};

export default SignUp;
