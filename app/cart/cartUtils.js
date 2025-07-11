export function formatPrice(price) {
  return `₦${price.toLocaleString()}`;
}

export function calculateSubtotal(cartItems) {
  return cartItems.reduce((total, item) => {
    let price;
    if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace('₦', '').replace(',', ''));
    } else {
      price = parseFloat(item.price) || 0;
    }
    return total + (price * item.quantity);
  }, 0);
}

export function calculateTax(cartItems) {
  return calculateSubtotal(cartItems) * 0.075;
}

export function calculateTotal(cartItems) {
  return calculateSubtotal(cartItems) + calculateTax(cartItems);
} 