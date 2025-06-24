const generateWhatsAppMessage = (cartItems, total) => {
  let message = "¡Hola! Me interesa comprar los siguientes perfumes:\n\n";
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ${item.brand}\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio: $${item.price} c/u\n`;
    message += `   Subtotal: $${item.price * item.quantity}\n\n`;
  });
  
  message += `💰 TOTAL: $${total}\n\n`;
  message += "¿Podrían confirmarme la disponibilidad y el proceso de compra?\n\n";
  message += "¡Gracias!";
  
  return encodeURIComponent(message);
};

const sendWhatsAppMessage = (cartItems, total, phoneNumber = "52412649") => {
  const message = generateWhatsAppMessage(cartItems, total);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

export { generateWhatsAppMessage, sendWhatsAppMessage };

