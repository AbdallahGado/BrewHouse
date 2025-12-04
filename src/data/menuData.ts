// Menu data structure
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  rating: number;
  time: string;
  popular: boolean;
  category: string;
}

export const menuCategories = [
  {
    id: "specialty",
    title: "Specialty Coffee",
    items: [
      {
        name: "Kenya AA Single Origin",
        description:
          "Bright and complex with notes of blackcurrant, citrus, and a wine-like finish. Grown at high altitude in Nyeri region.",
        price: "$6.50",
        rating: 5.0,
        time: "4 min",
        popular: true,
        category: "specialty",
      },
      {
        name: "Geisha Guatemala",
        description:
          "Rare and exquisite with floral jasmine notes, tropical fruit flavors, and an incredibly smooth finish.",
        price: "$8.00",
        rating: 4.9,
        time: "5 min",
        popular: true,
        category: "specialty",
      },
      {
        name: "Jamaica Blue Mountain",
        description:
          "Mild and exceptionally smooth with no bitterness. Subtle hints of chocolate and nuts with a clean taste.",
        price: "$9.00",
        rating: 5.0,
        time: "4 min",
        popular: false,
        category: "specialty",
      },
      {
        name: "Brazilian Santos",
        description:
          "Rich and nutty with low acidity, featuring chocolate and caramel notes. Perfect for a smooth, comforting brew.",
        price: "$5.75",
        rating: 4.8,
        time: "4 min",
        popular: false,
        category: "specialty",
      },
      {
        name: "Costa Rican Tarrazu",
        description:
          "Bright and clean with citrus and floral notes, balanced acidity, and a sweet, lingering finish.",
        price: "$7.25",
        rating: 4.9,
        time: "4 min",
        popular: true,
        category: "specialty",
      },
      {
        name: "Panama Hacienda La Esmeralda",
        description:
          "Exceptional Geisha variety with intense floral aromas, tropical fruit flavors, and a silky smooth texture.",
        price: "$12.00",
        rating: 5.0,
        time: "6 min",
        popular: false,
        category: "specialty",
      },
    ],
  },
  {
    id: "hot",
    title: "Signature Coffees",
    items: [
      {
        name: "House Blend",
        description:
          "Our signature blend of premium Arabica beans, perfectly balanced with notes of chocolate and caramel",
        price: "$4.50",
        rating: 4.9,
        time: "3 min",
        popular: true,
        category: "hot",
      },
      {
        name: "Dark Roast Colombian",
        description:
          "Bold and intense Colombian beans with smoky undertones and a rich, full-bodied finish",
        price: "$5.00",
        rating: 4.8,
        time: "3 min",
        popular: false,
        category: "hot",
      },
      {
        name: "Ethiopian Single Origin",
        description:
          "Bright and fruity Ethiopian beans with floral notes and a clean, wine-like acidity",
        price: "$5.50",
        rating: 4.9,
        time: "4 min",
        popular: true,
        category: "hot",
      },
      {
        name: "Cappuccino",
        description:
          "Classic Italian espresso with steamed milk and a thick layer of foam, dusted with cocoa",
        price: "$4.75",
        rating: 4.9,
        time: "2 min",
        popular: true,
        category: "hot",
      },
      {
        name: "Caramel Macchiato",
        description:
          "Espresso with vanilla-flavored syrup, steamed milk, foam, and caramel drizzle",
        price: "$5.25",
        rating: 4.8,
        time: "3 min",
        popular: true,
        category: "hot",
      },
      {
        name: "Hazelnut Latte",
        description:
          "Smooth espresso combined with steamed milk and rich hazelnut syrup",
        price: "$5.00",
        rating: 4.7,
        time: "3 min",
        popular: false,
        category: "hot",
      },
    ],
  },
  {
    id: "cold",
    title: "Iced & Cold Brew",
    items: [
      {
        name: "Cold Brew",
        description:
          "Smooth and naturally sweet, steeped for 18 hours for maximum flavor and low acidity",
        price: "$4.75",
        rating: 4.9,
        time: "1 min",
        popular: true,
        category: "cold",
      },
      {
        name: "Iced Latte",
        description:
          "Creamy espresso over ice with cold milk, perfectly refreshing",
        price: "$4.50",
        rating: 4.8,
        time: "2 min",
        popular: true,
        category: "cold",
      },
      {
        name: "Iced Mocha",
        description:
          "Rich chocolate and espresso over ice with cold milk and whipped cream",
        price: "$5.25",
        rating: 4.8,
        time: "3 min",
        popular: false,
        category: "cold",
      },
      {
        name: "Vanilla Sweet Cream Cold Brew",
        description:
          "Our signature cold brew topped with house-made vanilla sweet cream",
        price: "$5.50",
        rating: 4.9,
        time: "2 min",
        popular: true,
        category: "cold",
      },
      {
        name: "Nitro Cold Brew",
        description:
          "Cold brew infused with nitrogen for a smooth, creamy texture and cascading effect",
        price: "$5.75",
        rating: 5.0,
        time: "1 min",
        popular: true,
        category: "cold",
      },
    ],
  },
  {
    id: "pastry",
    title: "Pastries & Treats",
    items: [
      {
        name: "Croissant",
        description:
          "Buttery, flaky French pastry with golden layers, baked fresh daily",
        price: "$3.50",
        rating: 4.9,
        time: "5 min",
        popular: true,
        category: "pastry",
      },
      {
        name: "Chocolate Chip Cookie",
        description:
          "Classic cookie with premium chocolate chips, crispy edges and soft center",
        price: "$2.50",
        rating: 4.8,
        time: "2 min",
        popular: true,
        category: "pastry",
      },
      {
        name: "Blueberry Muffin",
        description:
          "Moist muffin bursting with fresh blueberries and a hint of lemon",
        price: "$3.75",
        rating: 4.7,
        time: "5 min",
        popular: false,
        category: "pastry",
      },
      {
        name: "Almond Biscotti",
        description:
          "Twice-baked Italian cookie with crunchy almonds, perfect for dipping",
        price: "$2.75",
        rating: 4.6,
        time: "2 min",
        popular: false,
        category: "pastry",
      },
      {
        name: "Cinnamon Roll",
        description:
          "Soft, gooey cinnamon roll with cream cheese frosting, made from scratch",
        price: "$4.25",
        rating: 5.0,
        time: "10 min",
        popular: true,
        category: "pastry",
      },
    ],
  },
];

// Create a flat map of all menu items by ID for quick lookup
export const menuItemsById: Record<string, MenuItem> = {};

menuCategories.forEach((category) => {
  category.items.forEach((item) => {
    const id = `${category.title}-${item.name}`;
    menuItemsById[id] = { ...item, category: category.title } as MenuItem;
  });
});
