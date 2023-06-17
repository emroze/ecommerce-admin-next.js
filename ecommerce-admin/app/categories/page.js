"use client"
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import { useEffect, useState } from "react";

function Categories({swal}){
    const [editedCategory, setEditedCategory] = useState(null);
    const [name,setName] = useState('');
    const [parentCategory,setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);


    useEffect(() => {
        fetchCategories();
    },[])

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }

    async function saveCategory(ev){
        ev.preventDefault();
        const data = {
            name, 
            parentCategory, 
            properties:properties.map(p=>({
                name:p.name,
                values:p.values.split(','),
            }))
        }
        if(editedCategory){
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName("");
        setParentCategory('');
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(category.properties.map(({name,values}) => ({
            name,
            values:values.join(','),
        })));
    }

    function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed){
                const _id = category._id;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        })
    }

    function addProperty(){
        setProperties(prev => {
            return [...prev,{name:'', values:''}]
        })
    }

    function handlePropertyNameChange(index,property,newName){
        setProperties(prev => {
            const properties = [...prev]
            properties[index].name = newName;
            return properties;
        })
    }
    function handlePropertyValuesChange(index,property,newValues){
        setProperties(prev => {
            const properties = [...prev]
            properties[index].values = newValues;
            return properties;
        })
    } 
    
    function removeProperty(indexToRemove){
        setProperties(prev => {
            const newProperties = [...prev].filter((p,pIndex) => {
                return pIndex !== indexToRemove;
            })
            return newProperties
        })
    }
    

    
    return(
        <div>
            <h1>Categories</h1>
            <label>{editedCategory
                ? `Edit Category ${editedCategory.name}` 
                : "New Category name"}
            </label>
            <form onSubmit={saveCategory} className="">
                <div className='flex gap-1'>
                    <input
                        required="required" 
                        
                        type="text" 
                        placeholder={"Category name"}
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        ></input>
                    <select 
                        onChange={ev => setParentCategory(ev.target.value)}
                        value = {parentCategory}>
                            <option value=''>No parent category</option>
                            {categories.length > 0 && categories.map(category => (
                                    <option key={uuidv4()} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                    </select>
                </div>
                <div>
                    <label className='block'>Properties</label>
                    <button 
                        onClick={addProperty}
                        type='button' 
                        className='btn-default text-sm mb-2'
                        >Add New Property
                    </button>
                    {properties.length > 0 && properties.map((property,index) => (
                        <div key={index} className='flex gap-1 mb-2'>
                            <input 
                                type='text' 
                                className='mb-0'
                                value={property.name} 
                                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                                placeholder='Property Name(Example: color)'></input>
                            <input 
                                type='text' 
                                className='mb-0'
                                value={property.values} 
                                onChange={ev => handlePropertyValuesChange(index,property, ev.target.value)}
                                placeholder='values, comma separated'></input>
                            
                            <button 
                                className='btn-default'
                                onClick={() => removeProperty(index)}
                                type='button'
                                >Remove</button>
                        </div>
                    ))}
                </div>
                <div className='flex gap-1'>
                    {editedCategory && (
                        <button 
                        type='button'
                        onClick={() => {
                            setEditedCategory(null);
                            setName('');
                            setParentCategory('');
                            setProperties([]);
                        }}
                        className='btn-default'
                        >Cancel</button>
                    )}
                    <button type='submit' className="btn-primary">Save</button>
                </div>
                
            </form> 
            {!editedCategory && (
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Catagory</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                            <tr key={uuidv4()}>
                                <td>{category.name}</td>
                                <td>{category.parent?.name}</td>
                                <td>
                                    <button onClick={() => editCategory(category)} className='btn-primary mr-1'>Edit</button>
                                    <button 
                                        onClick={() => deleteCategory(category)}
                                        className='btn-primary'>
                                            Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table> 
            )}
                      
        </div>
    );
}

export default withSwal(({swal},ref) => (
    <Categories swal={swal}/>
))