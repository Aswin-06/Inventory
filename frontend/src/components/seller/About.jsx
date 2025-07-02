import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AboutPro from "../AboutPro";
import "./About.css";

function About() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orders, alterorders] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/item/trans/${id}`);
                alterorders(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [id]);

    const tags = orders.map((order) => (
        <div className="order-card" key={order.id}>
            <h3>Name : {order.name}</h3>
            <p>Email : {order.email}</p>
            <p>Quantity : {order.quantity}</p>
            <button
                className="btn-delivered"
                onClick={async (e) => {
                    e.preventDefault();
                    try {
                        await axios.delete(`http://localhost:8080/api/trans/${order.id}`);
                        navigate(0); // refresh page
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                Delivered
            </button>
        </div>
    ));

    return (
        <>
            <AboutPro />
            <div className="action-buttons">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/alter/${id}`);
                    }}
                    className="btn-action"
                >
                    Alter Details
                </button>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            await axios.delete(`http://localhost:8080/api/item/${id}`);
                            alert("Product Deleted successfully");
                            navigate("/seller");
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    className="btn-action btn-danger"
                >
                    Delete Product
                </button>
            </div>
            <div className="orders-container">{tags}</div>
        </>
    );
}

export default About;
