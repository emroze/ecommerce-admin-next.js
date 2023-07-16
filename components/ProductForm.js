import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";
import {v4 as uuidv4} from 'uuid';

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties:assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images,setImages] = useState(existingImages || []);
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category,setCategory] = useState(assignedCategory);
  const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    setCategoriesLoading(true);
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
      setCategoriesLoading(false);
    })
  },[])

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category, properties:productProperties};
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
    // console.log(files[0]);
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const response = await axios.post("/api/upload", data);
      console.log(response.data);
      setImages(oldImages => {
        return [...oldImages, ...response.data.links]
      })
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images){
    setImages(images)
  }

  function setProductProp(propName,value){
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
      
    })
    console.log(propertiesToFIll)
  }

  const propertiesToFIll = [];
  if(categories.length > 0 && category){
    let catInfo = categories.find(({_id}) => _id===category);
    console.log(catInfo);
    (catInfo && propertiesToFIll.push(...catInfo?.properties));
    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id}) => _id===catInfo?.parent?._id);
      (parentCat && propertiesToFIll.push(...parentCat.properties));
      catInfo = parentCat;
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
          required
          onChange={(ev) => setTitle(ev.target.value)}
        />
        
          <label>Category</label>
          <select 
          className="transition ease-in-out delay-150"
          value={category}
          required
          onChange={ev => setCategory(ev.target.value)}
          >
            <option value="">Uncategorized</option>
            {categories.length >0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        {categoriesLoading && (
          <Spinner/>
        )}
        {propertiesToFIll.length > 0  && propertiesToFIll.map(p => (
          <div key={uuidv4()} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
            <select 
              value={productProperties[p.name]}
              onChange={ev => setProductProp(p.name,ev.target.value)}>
                {p.values.map(v => (
                  <option key={uuidv4()} value={v}>{v}</option>
                ))}
            </select>
            </div>
          </div>
        )
        )
        
        }
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1 items-center">
          <ReactSortable 
            list={images} 
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}>
            {!!images?.length > 0 && images.map(link => (
              <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-md border border-gray-200">
                <img src={link} className="rounded-lg" alt='picture of the products'/>
              </div>
            ))}
          </ReactSortable>

          {isUploading && (
            <div className="h-24 w-14 p-1 bg-slate-300 flex justify-center items-center">
              <Spinner/>
            </div>
          )}

          <label className="w-24 h-24 cursor-pointer text-primary flex flex-col justify-center items-center gap-1 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-gray-50 hover:shadow-lg">
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
            <div>Add Image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
          {!images?.length && <div>No photos available for this product</div>}
        </div>
        <label>Description</label>
        <textarea
          type="text"
          placeholder="description"
          value={description}
          required
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          required
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
