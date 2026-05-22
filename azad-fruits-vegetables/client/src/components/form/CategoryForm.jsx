import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  btnText = "+ Create Category",
  handleDelete,
}) => {

  const theme = {
    primary: "#198754",
    border: "#e5e7eb",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-4 rounded-3 mb-4 shadow-sm"
      style={{
        maxWidth: "420px",
        border: `1px solid ${theme.border}`,
        background: "#fff",
      }}
    >
      <label className="fw-semibold mb-2">
        Category Name
      </label>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Enter category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />

      {/* ✅ Buttons Row */}
      <div className="d-flex gap-2">

        {/* Create / Update Button */}
        <button
          type="submit"
          className="btn text-white fw-semibold flex-fill"
          style={{ background: theme.primary }}
        >
          {btnText}
        </button>

        {/* Delete Button */}
        {handleDelete && (
          <button
            type="button"   // ✅ IMPORTANT FIX
            className="btn btn-danger fw-semibold flex-fill"
            onClick={handleDelete}
          >
            🗑 Delete
          </button>
        )}

      </div>
    </form>
  );
};

export default CategoryForm;