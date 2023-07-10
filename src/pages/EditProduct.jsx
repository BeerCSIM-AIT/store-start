import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductService from "../services/ProductService";
import swal from "sweetalert";

const EditProduct = () => {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;
  let [product, setProduct] = useState({});

  // let inputName = useRef();
  // let inputPrice = useRef();
  // let inputStock = useRef();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    ProductService.get(params.id)
      .then((res) => {
        setProduct(res.data.data);
        // inputName.current.value = product.name;
        // inputPrice.current.value = product.price;
        // inputStock.current.value = product.unit_in_stock;
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    ProductService.update(id, product)
      .then((res) => {
        swal({
          icon: "success",
          text: "Update complete",
          title: "Result",
        });
        navigate("/product");
      })
      .catch((e) => {
        swal({
          icon: "error",
          text: "Update failed",
          title: "Result",
        });
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  return (
    <MainLayout>
      <h1 className="mt-3">Edit Product</h1>
      <hr />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={saveProduct}>
            <div className="mb-3 row">
              <label htmlFor="inputName" className="col-4 col-form-label">
                Name
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={product.name}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputName" className="col-4 col-form-label">
                Price
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={handleInputChange}
                  value={product.price}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="inputName" className="col-4 col-form-label">
                Stock
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  name="unit_in_stock"
                  id="unit_in_stock"
                  placeholder="Stock"
                  onChange={handleInputChange}
                  value={product.unit_in_stock}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="offset-sm-4 col-sm-8">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProduct;
