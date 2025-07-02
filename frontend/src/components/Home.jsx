import { useNavigate } from "react-router-dom";
import "./css/Home.css"; 

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-card">
                <h2>Welcome to the Inventory App</h2>
                <h4>Please login or register to buy items</h4>

                <div className="button-group">
                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}>Login</button>

                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate("/register");
                    }}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
