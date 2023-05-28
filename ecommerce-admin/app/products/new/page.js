"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProduct,setGoToProduct] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {title, description, price};
    await axios.post('/api/products', data);
    setGoToProduct(true);
  }
  if(goToProduct) {
    router.push('/products');
  }
  return (
    <div className="">
      <form onSubmit={createProduct} className="flex flex-col">
        <h1>New Products</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          type="text"
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
