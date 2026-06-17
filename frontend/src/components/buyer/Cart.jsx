import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css"; // Import the CSS

function Cart() {
    const [items, alteritems] = useState([]);
    const [id] = useState(localStorage.getItem("id") || 0);
    const [price, alterprice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://inventory-rnwg.onrender.com/api/cart/${id}`);
                alteritems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        alterprice(total);
    }, [items]);

    const buyItems = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`https://inventory-rnwg.onrender.com/api/cart/buy/${id}`);
            alert(response.data);
            navigate("/buyer");
        } catch (error) {
            console.log(error);
        }
    };

    const tags = items.map((item) => (
        <Link key={item.id} to={`${item.id}`} className="cart-item-link">
            <div className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
            </div>
        </Link>
    ));

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">{tags}</div>
            <div className="cart-summary">
                <p className="total-price">Total: ₹{price}</p>
                <button onClick={buyItems} className="buy-button">Buy</button>
            </div>
        </div>
    );
}

export default Cart;
