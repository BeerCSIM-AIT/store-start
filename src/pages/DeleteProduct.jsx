import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductService from "../services/ProductService";
import swal from "sweetalert";

const DeleteProduct = () => {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    confirmDelete();
  }, []);

  const confirmDelete = () => {
    swal(
      {
        icon: "warning",
        dangerMode: true,
        title: "Confirm",
        text: "Are you sure to delete?",
      }).then((isConfirm) => {
        if (isConfirm) {
          ProductService.deleteProduct(id)
            .then((res) => {
              navigate("/product");
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          navigate("/product");
        }
      });
  };

  return <MainLayout></MainLayout>;
};

export default DeleteProduct;
