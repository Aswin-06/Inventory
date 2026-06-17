import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Register.css"; 

function Register() {
    const [user, alteruser] = useState({ name: "", email: "", password: "", role: "" });
    const navigate = useNavigate();

    const changeUser = (e) => {
        const { name, value } = e.target;
        alteruser({ ...user, [name]: value });
    };

    const register = async (e) => {
        e.preventDefault();
        if (user.name === "" || user.email === "" || user.password === "" || user.role === "")
            alert("Fill all the details");
        else {
            try {
                const response = await axios.post("https://inventory-rnwg.onrender.com/api/register", user);
                localStorage.setItem("id", response.data.id);
                console.log(response.data);
                if (user.role === "buyer")
                    navigate("/buyer");
                else
                    navigate("/seller");
            } catch (error) {
                alert(error.response.data);
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Register</h2>
                <label>Enter your name</label>
                <input type="text" name="name" onChange={changeUser} />
                
                <label>Enter your email</label>
                <input type="email" name="email" onChange={changeUser} />
                
                <label>Enter your password</label>
                <input type="password" name="password" onChange={changeUser} />
                
                <label>Choose your role</label>
                <div className="radio-group">
                    <label>
                        <input type="radio" name="role" value="buyer" onChange={changeUser} />
                        Buyer
                    </label>
                    <label>
                        <input type="radio" name="role" value="seller" onChange={changeUser} />
                        Seller
                    </label>
                </div>
                
                <button type="submit" onClick={register}>Register</button>
            </form>
        </div>
    );
}

export default Register;
