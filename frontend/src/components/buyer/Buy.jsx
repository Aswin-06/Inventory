import { useNavigate, useParams } from "react-router-dom";
import AboutPro from "../AboutPro";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Buy.css"; // Import the CSS file

function Buy() {
    const { id } = useParams();
    const [userid] = useState(localStorage.getItem("id") || 0);
    const [item, alteritem] = useState({});
    const navigate = useNavigate();
    const [quantity, alterquantity] = useState(0);
    const [trans] = useState({ itemid: 0, type: "out", quantity: 0, userid: 0 });
    const [cart] = useState({ userid: 0, itemid: 0, quantity: 0 });

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://inventory-rnwg.onrender.com/api/item/${id}`);
                alteritem(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [id]);

    const order = async (e) => {
        e.preventDefault();
        if (quantity > item.quantity) {
            alert("Less Stocks");
        } else if (quantity === 0) {
            alert("Enter the quantity");
        } else {
            try {
                const buyitem = { ...item, quantity: item.quantity - quantity };
                await alteritem(buyitem);
                const trans3 = { ...trans, itemid: id, quantity, userid };
                await axios.put("https://inventory-rnwg.onrender.com/api/item", buyitem);
                await axios.post("https://inventory-rnwg.onrender.com/api/trans", trans3);
                alert("Order placed Successfully");
                navigate("/buyer");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const addToCart = async (e) => {
        e.preventDefault();
        if (quantity > item.quantity) {
            alert("Less Stocks");
        } else if (quantity === 0) {
            alert("Enter the quantity");
        } else {
            try {
                const cart3 = { ...cart, itemid: id, userid, quantity };
                await axios.post("https://inventory-rnwg.onrender.com/api/cart", cart3);
                navigate("/buyer");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="buy-container">
            <AboutPro />
            <div className="buy-form">
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    min="0"
                    onChange={(e) => alterquantity(Number(e.target.value))}
                />
                <p className="price">Total Price: ₹{item.price * quantity}</p>
                <div className="buy-buttons">
                    <button onClick={order}>Place Order</button>
                    <button onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Buy;
