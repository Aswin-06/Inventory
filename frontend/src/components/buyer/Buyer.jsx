import { useNavigate } from "react-router-dom";
import Product from "../Products";
import "./Buyer.css"; // Ensure the CSS file is created in the same folder

function Buyer() {
    const navigate = useNavigate();

    return (
        <div className="buyer-container">
            <Product />

            <div className="buyer-buttons">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}>Log Out</button>

                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/cart");
                }}>Cart</button>
            </div>
        </div>
    );
}

export default Buyer;
