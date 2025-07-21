import { BiCart, BiTable, BiDish, BiHome } from "react-icons/bi";
import MiePangsit from "../assets/images/food/filter/soups.jpg";
import MieGoreng from "../assets/images/food/filter/mie goreng.png";

const BottomNavItems = [
  {
    name: "Home",
    link: "/",
    icon: BiHome,
  },
  {
    name: "Orders Line",
    link: "/orders",
    icon: BiCart,
  },
  {
    name: "Manage Tables",
    link: "/tables",
    icon: BiTable,
  },
  {
    name: "Manage Dishes",
    link: "/dishes",
    icon: BiDish,
  },
];

const DataOrder = [
  {
    id: "#ODR001",
    table: "01",
    itemCount: 2,
    status: "All",
    time: "2 Mins ago",
  },
  {
    id: "#ODR002",
    table: "02",
    itemCount: 3,
    status: "Take Away",
    time: "5 Mins ago",
  },
  {
    id: "#ODR003",
    table: "03",
    itemCount: 1,
    status: "Dine In",
    time: "10 Mins ago",
  },
  {
    id: "#ODR004",
    table: "04",
    itemCount: 4,
    status: "Wait List",
    time: "15 Mins ago",
  },
  {
    id: "#ODR005",
    table: "05",
    itemCount: 2,
    status: "Served",
    time: "20 Mins ago",
  },
  {
    id: "#ODR006",
    table: "06",
    itemCount: 3,
    status: "Take Away",
    time: "25 Mins ago",
  },
  {
    id: "#ODR007",
    table: "07",
    itemCount: 1,
    status: "Dine In",
    time: "30 Mins ago",
  },
  {
    id: "#ODR008",
    table: "08",
    itemCount: 4,
    status: "Wait List",
    time: "35 Mins ago",
  },
  {
    id: "#ODR009",
    table: "09",
    itemCount: 2,
    status: "Served",
    time: "40 Mins ago",
  },
  {
    id: "#ODR010",
    table: "10",
    itemCount: 3,
    status: "Take Away",
    time: "45 Mins ago",
  },
];

const FilterFood = [
  {
    type: "All",
    image: MiePangsit,
    items: 4,
  },
  {
    type: "Special",
    image: MiePangsit,
    items: 3,
  },
  {
    type: "Soups",
    image: MiePangsit,
    items: 2,
  },
  {
    type: "Desserts",
    image: MiePangsit,
    items: 2,
  },
  {
    type: "Chickens",
    image: MiePangsit,
    items: 3,
  },
  {
    type: "Desserts",
    image: MiePangsit,
    items: 2,
  },
  {
    type: "Chickens",
    image: MiePangsit,
    items: 3,
  },
  {
    type: "Desserts",
    image: MiePangsit,
    items: 2,
  },
  {
    type: "Chickens",
    image: MieGoreng,
    items: 3,
  },
];

const FoodData = [
  {
    type: "Appetizer",
    name: "Bruschetta",
    image: MieGoreng,
    price: 89900,
  },
  {
    type: "Main Course",
    name: "Grilled Salmon",
    image: MieGoreng,
    price: 159900,
  },
  {
    type: "Main Course",
    name: "Ribeye Steak",
    image: MieGoreng,
    price: 229900,
  },
  {
    type: "Dessert",
    name: "Cheesecake",
    image: MieGoreng,
    price: 69900,
  },
  {
    type: "Beverage",
    name: "Lemonade",
    image: MiePangsit,
    price: 39900,
  },
];

export { BottomNavItems, DataOrder, FilterFood, FoodData };
