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
    status: "Served",
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

const FoodData = [
  {
    type: "Beef",
    name: "Wagyu Beef Steak",
    image: MiePangsit,
    price: 129900,
  },
  {
    type: "Beef",
    name: "Beef Satay",
    image: MiePangsit,
    price: 89900,
  },
  {
    type: "Beef",
    name: "Beef Fajitas",
    image: MiePangsit,
    price: 109900,
  },
  {
    type: "Beef",
    name: "Beef Rendang",
    image: MiePangsit,
    price: 89900,
  },
  {
    type: "Soups",
    name: "Creamy Mushroom Soup",
    image: MiePangsit,
    price: 69900,
  },
  {
    type: "Soups",
    name: "Tom Yum Soup",
    image: MiePangsit,
    price: 89900,
  },
  {
    type: "Desserts",
    name: "Cheesecake",
    image: MiePangsit,
    price: 69900,
  },
  {
    type: "Desserts",
    name: "Chocolate Lava Cake",
    image: MiePangsit,
    price: 79900,
  },
  {
    type: "Chickens",
    name: "Grilled Chicken",
    image: MiePangsit,
    price: 119900,
  },
  {
    type: "Chickens",
    name: "Crispy Fried Chicken",
    image: MiePangsit,
    price: 99900,
  },
  {
    type: "Chickens",
    name: "Chicken Cordon Bleu",
    image: MiePangsit,
    price: 149900,
  },
  {
    type: "Chickens",
    name: "Chicken Fajitas",
    image: MiePangsit,
    price: 109900,
  },
];

export { BottomNavItems, DataOrder, FoodData };
