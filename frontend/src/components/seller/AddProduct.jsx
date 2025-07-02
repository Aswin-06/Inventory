import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
    const [item, alteritem] = useState({ name: "", descrip: "", category: "", quantity: 0, price: 0 });
    const [trans, altertrans] = useState({ itemid: 0, type: "in", quantity: 0, userid: 0 });
    const [id, alterid] = useState(localStorage.getItem("id") || 0);
    const navigate = useNavigate();

    const changeitem = (e) => {
        const { name, value } = e.target;
        alteritem({ ...item, [name]: value });
    };

    const additem = async (e) => {
        e.preventDefault();
        if (item.name === "" || item.descrip === "" || item.category === "" || item.quantity === 0 || item.price === 0 || item.quantity < 0 || item.price < 0)
            alert("Enter all the details");
        else {
            try {
                const response = await axios.post("http://localhost:8080/api/item", item);
                const trans1 = { ...trans, itemid: response.data.id };
                const trans2 = { ...trans1, quantity: item.quantity };
                const trans3 = { ...trans2, userid: id };
                await axios.post("http://localhost:8080/api/trans", trans3);
                navigate("/seller");
            } catch (error) {
                alert(error.response.data);
                console.log(error);
            }
        }
    };

    return (
        <form className="addproduct-form">
            <h2>Enter the details of the product</h2>

            <label>Enter the name of the product</label>
            <input type="text" name="name" onChange={changeitem} />

            <label>Enter the description</label>
            <input type="text" name="descrip" onChange={changeitem} />

            <label>Select the category of the product</label>
            <select name="category" onChange={changeitem}>
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="stationary">Stationary</option>
            </select>

            <label>Enter the quantity</label>
            <input type="number" name="quantity" onChange={changeitem} />

            <label>Enter the price</label>
            <input type="number" name="price" onChange={changeitem} />

            <button onClick={additem} type="submit">Add Item</button>
        </form>
    );
}

export default AddProduct;
