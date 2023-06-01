import { useState } from "react";
import AddProductForm from "./AddProductForm";

const AddProductWrapper = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleFormClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsVisible((previous) => !previous);
  };

  return (
    <div className="add-form">
      {isVisible ? (
        <AddProductForm onCancel={handleFormClick} onSubmit={onSubmit} />
      ) : (
        <p>
          <button className="add-product-button" onClick={handleFormClick}>
            Add A Product
          </button>
        </p>
      )}
    </div>
  );
};

export default AddProductWrapper;
