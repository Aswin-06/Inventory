import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

function Login() {
    const [user, alteruser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const changeUser = (e) => {
        const { name, value } = e.target;
        alteruser({ ...user, [name]: value });
    };

    const login = async (e) => {
        e.preventDefault();
        if (user.email === "" || user.password === "")
            alert("Fill all the details");
        else {
            try {
                const response = await axios.post("http://localhost:8080/api/login", user);
                localStorage.setItem("id", response.data.id);
                if (response.data.role === "buyer")
                    navigate("/buyer");
                else
                    navigate("/seller");
            } catch (error) {
                alert(error.response.data);
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Please enter your login details</h2>
                
                <label>Email</label>
                <input type="email" name="email" onChange={changeUser} />

                <label>Password</label>
                <input type="password" name="password" onChange={changeUser} />

                <button onClick={login} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
