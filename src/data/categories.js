export const categories = [
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'Laptops para gaming, trabajo y estudio',
    subcategories: null,
  },
  {
    id: 'peripherals',
    name: 'Periféricos',
    description: 'Accesorios para tu setup',
    subcategories: [
      { id: 'mice', name: 'Mouses'},
      { id: 'keyboards', name: 'Teclados'},
      { id: 'headsets', name: 'Auriculares'},
    ],
  },
  {
    id: 'components',
    name: 'Componentes',
    description: 'Componentes para armar tu PC',
    subcategories: [
      { id: 'ram', name: 'Memorias RAM' },
      { id: 'cpu', name: 'Procesadores' },
      { id: 'gpu', name: 'Tarjetas Gráficas' },
      { id: 'storage', name: 'Almacenamiento' },
    ],
  },
  {
    id: 'monitors',
    name: 'Monitores',
    description: 'Pantallas para gaming y productividad',
    subcategories: null,
  },
];