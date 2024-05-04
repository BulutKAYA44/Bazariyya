import React from "react";
import { useHistory } from "react-router-dom";

function Categories({ categories }) {
  const { push } = useHistory();

  return (
    <div
      className=" mt-5 mb-5 p-4"
      style={{ border: "1px solid black", borderRadius: "10px" }}
    >
      <div className="row">
        {categories?.sub?.length > 0 &&
          categories?.sub.map((category) => (
            <div
              className="col-xl-2 col-lg-2 col-sm-6 col-xs-12 p-3"
              key={category.id}
            >
              <button
                className="text-center d-flex flex-column justify-content-center align-items-center "
                style={{
                  background: "transparent",
                  border: "none",
                  width: "100%",
                }}
                onClick={() => push("/product-list?catId=" + category.id)}
              >
                <img
                  width={156}
                  height={87}
                  alt="cat"
                  src={category.categoryImageUrl}
                />
                {category.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Categories;
