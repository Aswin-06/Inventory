import { useNavigate } from "react-router-dom";
import Product from "../Products";
import "./Seller.css";

function Seller() {
    const navigate = useNavigate();
    return (
        <div className="seller-container">
            <Product />
            <div className="seller-buttons">
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/addproduct");
                }}>Add product</button>

                <button onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}>Log Out</button>
            </div>
        </div>
    );
}

export default Seller;
