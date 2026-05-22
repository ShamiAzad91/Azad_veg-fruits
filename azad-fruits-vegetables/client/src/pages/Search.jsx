import React from "react";
import { useSearch } from "../context/Search";
import ProductCard from "../components/card/ProductCard";

const Search = () => {
  const [values] = useSearch();

  return (
    <div className="container mt-4">

      {/* 🔍 Heading */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">🔍 Search Results</h2>

        {values?.keyword && (
          <p className="text-muted">
            {values?.results?.length > 0
              ? `Found ${values.results.length} result(s) for "${values.keyword}"`
              : `No results found for "${values.keyword}"`}
          </p>
        )}
      </div>

      {/* 🛍️ Centered Product Grid */}
      <div className="row justify-content-center">
        {values?.results?.length > 0 ? (
          values.results.map((p) => (
            <div
              className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
              key={p._id}
            >
              <div className="w-100" style={{ maxWidth: "250px" }}>
                <ProductCard product={p} />
              </div>
            </div>
          ))
        ) : (
          values?.keyword && (
            <div className="text-center mt-5">
              <h5 className="text-danger">😕 No Products Found</h5>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;  