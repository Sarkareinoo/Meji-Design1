
"use client";

import { Product } from "@/api/products/type";

export const useProductActions = () => {
  const edit = (product: Product) => {
    alert(`Edit product: ${product.productID}`);
  };

  const remove = (product: Product, onSuccess?: () => void) => {
    if (!confirm(`Are you sure you want to delete ${product.productID}?`)) return;

 
    alert(`Deleted product: ${product.productID}`);
    if (onSuccess) onSuccess();
  };

  return { edit, remove };
};
