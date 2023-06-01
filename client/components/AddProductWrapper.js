import { useState } from "react";
import AddProductForm from "./AddProductForm"

const AddProductWrapper = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClick = (e) => {
    e.preventDefault;
    setIsVisible((previous) => !previous);
  };

  return (
    <div class="add-form">
      {isVisible ?
        <AddProductForm onCancel={onClick} onSubmit={onSubmit} /> :
        <p><button class="add-product-button" onClick={onClick}>Add A Product</button></p>
      }
    </div>
  );
};

export default AddProductWrapper;
