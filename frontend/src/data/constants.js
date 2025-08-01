import { BiCart, BiTable, BiDish, BiHome } from "react-icons/bi";
import MiePangsit from "../assets/images/food/filter/soups.jpg";
import MieGoreng from "../assets/images/food/filter/mie goreng.png";

export const BottomNavItems = [
  {
    name: "Home",
    link: "/home",
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

export const DataOrder = [
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

export const FoodData = [
  {
    id: 1,
    type: "Beef",
    name: "Wagyu Beef Steak",
    image: MiePangsit,
    price: 129900,
  },
  {
    id: 2,
    type: "Beef",
    name: "Beef Satay",
    image: MiePangsit,
    price: 89900,
  },
  {
    id: 3,
    type: "Beef",
    name: "Beef Fajitas",
    image: MiePangsit,
    price: 109900,
  },
  {
    id: 4,
    type: "Beef",
    name: "Beef Rendang",
    image: MiePangsit,
    price: 89900,
  },
  {
    id: 5,
    type: "Soups",
    name: "Creamy Mushroom Soup",
    image: MiePangsit,
    price: 69900,
  },
  {
    id: 6,
    type: "Soups",
    name: "Tom Yum Soup",
    image: MiePangsit,
    price: 89900,
  },
  {
    id: 7,
    type: "Desserts",
    name: "Cheesecake",
    image: MiePangsit,
    price: 69900,
  },
  {
    id: 8,
    type: "Desserts",
    name: "Chocolate Lava Cake",
    image: MiePangsit,
    price: 79900,
  },
  {
    id: 9,
    type: "Chickens",
    name: "Grilled Chicken",
    image: MiePangsit,
    price: 119900,
  },
  {
    id: 10,
    type: "Chickens",
    name: "Crispy Fried Chicken",
    image: MiePangsit,
    price: 99900,
  },
  {
    id: 11,
    type: "Chickens",
    name: "Chicken Cordon Bleu",
    image: MiePangsit,
    price: 149900,
  },
  {
    id: 12,
    type: "Chickens",
    name: "Chicken Fajitas",
    image: MiePangsit,
    price: 109900,
  },
];

export const DataTables = [
  {
    id: "TBL001",
    name: "Table 01",
    occupied: 2,
    maxCapacity: 4,
    status: "Dine In",
    reserved: false,
    free: true,
  },
  {
    id: "TBL002",
    name: "Table 02",
    occupied: 3,
    maxCapacity: 4,
    status: "Reserved",
    reserved: true,
    free: false,
  },
  {
    id: "TBL003",
    name: "Table 03",
    occupied: 1,
    maxCapacity: 2,
    status: "Free",
    reserved: false,
    free: true,
  },
  {
    id: "TBL004",
    name: "Table 04",
    occupied: 0,
    maxCapacity: 6,
    status: "Reserved",
    reserved: true,
    free: false,
  },
  {
    id: "TBL005",
    name: "Table 05",
    occupied: 4,
    maxCapacity: 8,
    status: "Dine In",
    reserved: false,
    free: true,
  },
];

export const CustomerData = [
  {
    name: "John Doe",
    reservationTime: null,
    phoneNumber: "123-456-7890",
    table: "TBL001",
  },
  {
    name: "Jane Smith",
    reservationTime: "6:00 PM",
    phoneNumber: "987-654-3210",
    table: "TBL003",
  },
  {
    name: "Alice Johnson",
    reservationTime: null,
    phoneNumber: "555-555-5555",
    table: "TBL002",
  },
  {
    name: "John Doe",
    reservationTime: null,
    phoneNumber: "123-456-7890",
    table: "TBL001",
  },
  {
    name: "Jane Smith",
    reservationTime: "6:00 PM",
    phoneNumber: "987-654-3210",
    table: "TBL003",
  },
  {
    name: "Alice Johnson",
    reservationTime: null,
    phoneNumber: "555-555-5555",
    table: "TBL002",
  },
  {
    name: "John Doe",
    reservationTime: null,
    phoneNumber: "123-456-7890",
    table: "TBL001",
  },
  {
    name: "Jane Smith",
    reservationTime: "6:00 PM",
    phoneNumber: "987-654-3210",
    table: "TBL003",
  },
  {
    name: "Alice Johnson",
    reservationTime: null,
    phoneNumber: "555-555-5555",
    table: "TBL002",
  },
  {
    name: "John Doe",
    reservationTime: null,
    phoneNumber: "123-456-7890",
    table: "TBL001",
  },
  {
    name: "Jane Smith",
    reservationTime: "6:00 PM",
    phoneNumber: "987-654-3210",
    table: "TBL003",
  },
  {
    name: "Alice Johnson",
    reservationTime: null,
    phoneNumber: "555-555-5555",
    table: "TBL002",
  },
  {
    name: "John Doe",
    reservationTime: null,
    phoneNumber: "123-456-7890",
    table: "TBL001",
  },
  {
    name: "Jane Smith",
    reservationTime: "6:00 PM",
    phoneNumber: "987-654-3210",
    table: "TBL003",
  },
  {
    name: "Alice Johnson",
    reservationTime: null,
    phoneNumber: "555-555-5555",
    table: "TBL002",
  },
];

export const PaymentMethods = ["Cash", "Debit"];
export const OrderTypes = ["Dine In", "Take Away"];
