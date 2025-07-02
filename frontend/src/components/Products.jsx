import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Products.css"; 

function Product() {
    const [items, alteritems] = useState([]);
    const [id] = useState(localStorage.getItem("id") || 0);
    const [role, alterrole] = useState("buyer");

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/item");
                const res = await axios.get(`http://localhost:8080/api/user/${id}`);
                alterrole(res.data.role);
                alteritems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [id]);

    return (
        <div className="product-container">
            <h2>Products Available</h2>
            <div className="product-grid">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to={`/${role}/${item.id}`}
                        className="product-link"
                    >
                        <div className="product-card">
                            <p className="product-name">{item.name}</p>
                            <p className="product-price">₹{item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Product;
