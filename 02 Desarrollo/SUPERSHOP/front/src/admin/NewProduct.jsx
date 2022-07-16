import React, { useCallback, useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Dropzone } from "./Dropzone/Dropzone";
import Layout from "../core/Layout";
import { MaskedInput } from "grommet";
import {
  createProduct,
  getCategories,
  uploadfile,
  addproduct,
} from "./apiAdmin";
import { useForm } from "react-hook-form";
import { Button, notification, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
const NewProduct = () => {
  const [files, setFiles] = useState([]);
  const { user, token } = isAuthenticated();
  const { handleSubmit, register, errors } = useForm();
  const [categories, setcategories] = useState([]);
  const addFiles = (newFiles) => {
    setFiles(...files, newFiles);
  };

  const deleteFiles = (remainingFiles) => {
    setFiles(remainingFiles);
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let res = await getCategories();
    setcategories(res);
  };

  async function addItem(values) {
    console.log(values, files);
    if (files.length > 0) {
      let obj = values;
      let pictures = await uploadPhotos();

      obj.pictures = pictures;

      let res = await addproduct(obj, token);
           console.log(res,obj);
    } else {
      notification["error"]({
        message: "Error al crear producto",
        description: "No hay fotos del producto",
      });
    }
  }

  async function uploadPhotos() {
    let pictures = [];

    console.log(files.length);

    await Promise.all(
      files.map(async (e) => {
        let name = uuidv4();
        let res = await uploadfile(name, e);

        pictures.push(
          `https://ecommercefiles.s3.us-east-2.amazonaws.com/products/${name}`
        );
      })
    );

    console.log("termine", files.length);

    return pictures;
  }
  return (
    <Layout
      title="Add a new product"
      description={`Buen dia  ${user.name}, ready to add a new product?`}
    >
      <form autoComplete="off" onSubmit={handleSubmit(addItem)}>
        <div className="p-5">
          <div className="form-group">
            <label className="text-muted">Nombre del Producto</label>
            <input
              type="text"
              className="form-control"
              name="name"
              ref={register({
                required: "Campo Obligatorio",
              })}
            />{" "}
            <p className="text-danger">{errors.name && errors.name.message}</p>
          </div>
          <Dropzone
            multiple
            showPreview
            showFileSize
            onAddFiles={addFiles}
            onDeleteFiles={deleteFiles}
          />

          <div className="form-group">
            <label className="text-muted">Descripción</label>
            <textarea
              className="form-control"
              name="description"
              ref={register({
                required: "Campo Obligatorio",
              })}
            />
          </div>
          <p className="text-danger">
            {errors.description && errors.description.message}
          </p>
          <div className="form-group">
            <label className="text-muted">Precio</label>
            <input
              type="number"
              name="price"
              ref={register({
                required: "Campo Obligatorio",
              })}
              className="form-control"
            />
          </div>
          <p className="text-danger">{errors.price && errors.price.message}</p>
          <div className="form-group">
            <label className="text-muted">Categoria</label>
            <select
              name="category"
              ref={register({
                required: "Campo Obligatorio",
              })}
              className="form-control"
            >
              <option>Please select</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <p className="text-danger">
            {errors.category && errors.category.message}
          </p>
          <div className="form-group">
            <label className="text-muted">Envio</label>
            <select
              name="shipping"
              ref={register({
                required: "Campo Obligatorio",
              })}
              className="form-control"
            >
              <option value="0">No</option>
              <option value="1">Si</option>
            </select>
          </div>
          <p className="text-danger">
            {errors.shipping && errors.shipping.message}
          </p>
          <div className="form-group">
            <label className="text-muted">Cantidad</label>
            <input
              name="quantity"
              ref={register({
                required: "Campo Obligatorio",
              })}
              type="number"
              className="form-control"
            />
          </div>
          <p className="text-danger">
            {errors.quantity && errors.quantity.message}
          </p>
          <button type="submit" className="btn btn-outline-primary">
            Crear Producto
          </button>
        </div>{" "}
      </form>{" "}
    </Layout>
  );
};

export default NewProduct;
