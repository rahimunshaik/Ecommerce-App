// Constants
export const Add_products = "Add_products";
export const Add_cart = "Add_cart";
export const Product_view = "product_view";
export const Cart_items = "Cart_items";
export const update_cart = "update_cart";
export const delete_cart = "delete_cart";

// Function to add products
export function addproducts(products) {
  return {
    type: Add_products,
    products, // The products to be added
  };
}

// Function to add items to the cart
export function addCart(cart) {
  return {
    type: Add_cart,
    cart, // The item to be added to the cart
  };
}

// Function to view a specific product
export function ProductToview(item) {
  return {
    type: Product_view,
    view: item, // The item to be viewed
  };
}

// Function to fetch the items in the cart
export function CartItems() {
  return {
    type: Cart_items,
  };
}

// Function to update an item in the cart
export function updateCart(item) {
  return {
    type: update_cart,
    updatedItem: item, // The updated item to replace the existing item in the cart
  };
}

// Function to delete an item from the cart
export function DeleteCart(item) {
  return {
    type: delete_cart,
    item, // The item to be deleted from the cart
  };
}
