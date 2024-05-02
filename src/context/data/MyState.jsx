import React, { useEffect } from "react";
import MyContext from "./MyContext";
import { useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp,addDoc,collection,onSnapshot,orderBy,query } from "firebase/firestore";
import { toast } from "react-toastify";

const MyState = (props) =>{
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  

  const [products, setProducts] = useState({
    title: null,
    price: null,
    description: null,
    imageUrl: null,
    category: null,
    time: Timestamp.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ){
      return toast.error("All Fields are Required")
  };
  const productRef = collection(fireDB, "products");
  setLoading(true);
  try {
    
    await addDoc(productRef, products)
    toast.success("Product Added Successfully")
    getProductData();
    closeModal();
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
  setProducts("");
}


  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);

      });

      return ()=>data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
