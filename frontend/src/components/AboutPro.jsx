import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/AboutPro.css"; 

function AboutPro() {
    const { id } = useParams();
    const [item, alteritem] = useState({});

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

    return (
        <div className="aboutpro-container">
            <h3 className="product-title">Product Name: {item.name}</h3>
            <p className="product-description">Description: {item.descrip}</p>
            <p className="product-category">Category: {item.category}</p>
            <p className="product-quantity">Quantity: {item.quantity}</p>
            <p className="product-price">Price: ₹{item.price}</p>
        </div>
    );
}

export default AboutPro;
