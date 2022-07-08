import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  console.log(product);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-2">
          <ul>
            {product.pictures != null &&
              product.pictures.map((e) => {
                return (
                  <li>
                    <img src={e} class="img-fluid" />
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="col-6">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>{product.name}</h4>
          <h5>S/ {product.price}</h5>
          <div className="row">
            <div className="col-lg-4">
              {" "}
              <h5>Tallas:</h5>
            </div>
            <div className="col-lg-8">
              <div class="form-group">
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              {" "}
              <h5>Cantidad:</h5>
            </div>
            <div className="col-lg-8">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">
                  +
                </button>
                <input style={{ textAlign: "center"}} value="0" type="text"/>
                <button type="button" class="btn btn-secondary">
                  -
                </button>
              </div>
            </div>
          </div>
          <br />
          <button className="btn btn-primary">COMPRAR AHORA</button>
          <br />
          <a href="">Compartir</a>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
