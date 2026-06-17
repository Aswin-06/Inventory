import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Alter.css"

function AlterProduct()
{
    const {id}=useParams();
    const [item,alteritem]=useState({});
    const navigate=useNavigate();

    useEffect(()=>
    {
        const fetch=async () => {
            try {
                const response= await axios.get(`https://inventory-rnwg.onrender.com/api/item/${id}`);
                alteritem(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    },[])

    const changeitem=(e)=>
    {
        const {name,value}=e.target;
        alteritem({...item,[name]:value})
    }

    const additem=async (e) => {
        e.preventDefault();
        if(item.name==="" || item.descrip==="" || item.category==="" || item.quantity===0 || item.price===0 || item.quantity<0 || item.price<0)
            alert("Enter all the details");
        else
        {
            try {
                const response=await axios.put("https://inventory-rnwg.onrender.com/api/item",item);
                navigate(`/seller`);
            } catch (error) {
                alert(error.response.data);
                console.log(error);
            }
        }
    }

    return(
        <>
            <h2>Enter the details of the product</h2>
            <p>Enter the name of the product</p>
            <input type="text" name="name" value={item.name || ""} onChange={changeitem}/>
            <p>Enter the description</p>
            <input type="text" name="descrip" value={item.descrip || ""} onChange={changeitem} />
            <p>Select the category of the product</p>
            <select name="category" value={item.category || ""} onChange={changeitem}>
                <option value="">Select</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="stationary">Stationary</option>
            </select>
            <p>Enter the quantity</p>
            <input type="number" value={item.quantity || ""} name="quantity" onChange={changeitem} />
            <p>Enter the price</p>
            <input type="number" name="price" value={item.price || ""} onChange={changeitem}/>
            <button onClick={additem}>Update Item</button>
        </>
    )
}

export default AlterProduct;