const orders = [
  {
    id: 'order1',
    userId: 'user2',
    items: [
      { perfumeId: 1, name: 'Elegance Noir', quantity: 1, price: 1299 },
      { perfumeId: 5, name: 'Citrus Burst', quantity: 2, price: 699 },
    ],
    total: 2697,
    status: 'Pendiente',
    date: '2023-10-26T10:00:00Z',
  },
  {
    id: 'order2',
    userId: 'user2',
    items: [
      { perfumeId: 2, name: 'Ocean Breeze', quantity: 1, price: 899 },
    ],
    total: 899,
    status: 'Enviado',
    date: '2023-10-25T14:30:00Z',
  },
  {
    id: 'order3',
    userId: 'user1', // Ejemplo de orden de admin, aunque admin no compra
    items: [
      { perfumeId: 3, name: 'Rose Garden', quantity: 1, price: 1599 },
    ],
    total: 1599,
    status: 'Entregado',
    date: '2023-10-24T11:00:00Z',
  },
];

export { orders };