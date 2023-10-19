import "./styles.css";
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

function ProductForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      unitprice: "",
      stock: "",
      quantityPerUnit: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      unitprice: Yup.number()
        .typeError("Unit price must be a number")
        .required("Unit price is required")
        .positive("Unit price must be a positive number"),
      stock: Yup.number()
        .typeError("Stock amount must be a number")
        .required("Stock amount is required")
        .min(0, "Stock amount cannot be less than 0"),
      quantityPerUnit: Yup.string().required("Quantity per unit is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://northwind.vercel.app/api/products",
          values
        );

        if (response.status === 201) {
          formik.resetForm();
          formik.setStatus("Product added successfully");
        } else {
          formik.setStatus("An error occurred while adding the product");
        }
      } catch (error) {
        formik.setStatus("An error occurred while adding the product");
      }
    },
  });

  return (
    <div>
      <h2>Add Product</h2>
      {formik.status && (
        <p style={{ color: formik.status.includes("successfully") ? "green" : "red" }}>
          {formik.status}
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label>Unit Price:</label>
          <input
            type="text"
            name="unitprice"
            value={formik.values.unitprice}
            onChange={formik.handleChange}
          />
          {formik.errors.unitprice && (
            <div style={{ color: "red" }}>{formik.errors.unitprice}</div>
          )}
        </div>
        <div>
          <label>Stock Amount:</label>
          <input
            type="text"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          {formik.errors.stock && (
            <div style={{ color: "red" }}>{formik.errors.stock}</div>
          )}
        </div>
        <div>
          <label>Quantity per Unit:</label>
          <input
            type="text"
            name="quantityPerUnit"
            value={formik.values.quantityPerUnit}
            onChange={formik.handleChange}
          />
          {formik.errors.quantityPerUnit && (
            <div style={{ color: "red" }}>{formik.errors.quantityPerUnit}</div>
          )}
        </div>
        <div>
          <button type="submit" style={{ backgroundColor: 'brown', color: 'white' }}>Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;