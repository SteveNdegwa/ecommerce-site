////// not an actual database

let products = [
  {
    id: 1,
    title: "book",
    description: "green",
    available: true,
  },
  {
    id: 2,
    title: "pen",
    description: "red",
    available: true,
  },
];

class Database {
  static actions() {
    return {
      get: () => {
        return {
          all: () => {
            return products;
          },
          specific: (id) => {
            const product = products.find((product) => product.id == id);
            return product;
          },
        };
      },

      add: () => {
        products.push({
          id: 4,
          title: "shirt",
          description: "blue",
          available: true,
        });
        return products;
      },

      update: (id) => {
        const newproducts = products.map((product) => {
          if (product.id == id) {
            return { ...product, available: false };
          } else {
            return product;
          }
        });
        products = newproducts;
        return products;
      },

      delete: (id) => {
        const newproducts = products.filter(
          (product) => product.id != id
        );
        products = newproducts;
        return products;
      },
    };
  }
}

module.exports = Database;
