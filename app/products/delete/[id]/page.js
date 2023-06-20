"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage({ params }) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const id = params.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, []);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct(){
    await axios.delete("/api/products?id="+id)
    goBack();
  }
  console.log(productInfo);
  return (
    <div>
      <h1 className="text-center">
        Do you really want to delete product &nbsp;"{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button className="btn-default" onClick={goBack}>
            No
        </button>
      </div>
    </div>
  );
}
