import axios from "axios";
import AboutPro from "../AboutPro";
import { useNavigate, useParams } from "react-router-dom";
import "./CartItem.css"; // Import the CSS

function CartItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const removeFromCart = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`https://inventory-rnwg.onrender.com/api/cart/${id}`);
            alert(response.data);
            navigate("/buyer");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="cart-item-container">
            <AboutPro />
            <button onClick={removeFromCart} className="remove-button">
                Remove from cart
            </button>
        </div>
    );
}

export default CartItem;
