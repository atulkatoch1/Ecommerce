import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { saveProduct, updateProduct } from '../feature/productSaveSlice';
import { listProducts } from '../feature/productSlice';
import { deleteProdcut } from '../feature/deleteProductSlice';

const ProductsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const productSave = useSelector(state=>state.productSave);
    const {loadingSave, successSave, errorSave} = productSave;
    const deleteProduct = useSelector(state=>state.deleteProduct);
    const {loadingDelete, successDelete, errorDelete} = deleteProduct;
    const productList = useSelector((state) => state.productList);
    const {products,loading,error} = productList;
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    if (successSave) {
        setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    }
  }, [successSave, successDelete])

  const openModal = (product) => {
    setModalVisible(true);
        setId(product._id ? product._id : '');
        setName(product.name ? product.name : '');
        setPrice(product.price ? product.price : '');
        setDescription(product.description ? product.description : '');
        setImage(product.image ? product.image : '');
        setBrand(product.brand ? product.brand : '');
        setCategory(product.category ? product.category : '');
        setCountInStock(product.countInStock ? product.countInStock : '');
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let product = { _id: id, name, price, image, 
      brand, category, countInStock, 
      description };
      if (id) {
        dispatch(updateProduct(product))        
      }
      else {
        dispatch(saveProduct(product))
      }
  }

  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

  return <div className='content content-margined'>
    <div className='product-header'>
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
                Create Product
            </button>
    </div>
    {modalVisible && 
        <div className='form'>
            <form onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id='name' onChange={(e) => setName(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" value={price} id='price' onChange={(e) => setPrice(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" value={image} id='image' onChange={(e) => setImage(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" value={brand} id='brand' onChange={(e) => setBrand(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            CountInStock
                        </label>
                        <input type="text" name="countInStock" value={countInStock} id='countInStock' onChange={(e) => setCountInStock(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" value={category} id='category' onChange={(e) => setCategory(e.target.value)}>
                            </input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea type="text" name="description" value={description} id='description' onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                    </li>
                    <li>
                        <button type="submit" className='button primary'>
                            {id ? 'Update' : 'Create'}
                            </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => setModalVisible(false)} className='button secondary'>
                            Back
                            </button>
                    </li>
                </ul>
            </form>
        </div>
    }
    <div className='product-list'>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <button className='button' onClick={()=>openModal(product)}>Edit</button>
                        <button className='button' onClick={() => deleteHandler(product)}>Delete</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
  </div> 
}

export default ProductsScreen