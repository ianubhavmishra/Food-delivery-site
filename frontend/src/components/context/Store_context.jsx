import axios from "axios";
import { createContext, useState, useEffect } from "react";
// import { food_list } from "../../assets/assets";

export const Store_context = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({})
    const [token, settoken] = useState("")
    const url = "https://food-delivery-site-23j3.onrender.com";
    const [food_list, setfood_list] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    const totalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFood = async () => {
        const responce = await axios.get(url + "/api/food/list");
        setfood_list(responce.data.data);
    }

    const loadCartData = async(token)=>{
        const responce = await axios.post(url+"/api/cart/fetch",{},{headers:{token}});
        setcartItems(responce.data.data);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFood();
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token")); 
            }
        }
        loadData();
    }, [])


    const context_val = {
        food_list,
        cartItems,
        totalCartAmount,
        setcartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        settoken
    }
    return (
        <Store_context.Provider value={context_val}>
            {props.children}
        </Store_context.Provider>
    )
}

export default StoreContextProvider;
