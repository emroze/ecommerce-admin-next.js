import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();
  console.log(_id);
  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //Update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }

    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    console.log(files[0]);
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
        // console.log("inside", file);
      }
      // data.append("file", files[0]);
      // const response = await axios.post("/api/upload", data, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      const response = await fetch('/api/upload',{
        method: "POST",
        body: data,
      })
      console.log(response);
    }
  }
  return (
    <div className="">
      <form onSubmit={createProduct} className="flex flex-col">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Photos</label>
        <div className="mb-2">
          <label className="w-32 h-32 cursor-pointer flex justify-center items-center gap-1 rounded-lg bg-slate-300 hover:bg-slate-400 hover:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
          {!images?.length && <div>No photos available for this product</div>}
        </div>
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
