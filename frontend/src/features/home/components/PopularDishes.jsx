import MiePangsit from "../../../assets/images/food/filter/mie goreng.png";
const PopularDishes = () => {
  const PopularDishData = [
    {
      id: 1,
      name: "Mie Pangsit",
      image: MiePangsit,
      ordered: 100,
    },
    {
      id: 2,
      name: "Nasi Goreng",
      image: MiePangsit,
      ordered: 80,
    },
    {
      id: 3,
      name: "Soto",
      image: MiePangsit,
      ordered: 70,
    },
    {
      id: 4,
      name: "Gado Gado",
      image: MiePangsit,
      ordered: 60,
    },
    {
      id: 5,
      name: "Martabak",
      image: MiePangsit,
      ordered: 50,
    },
    {
      id: 6,
      name: "Bakpia",
      image: MiePangsit,
      ordered: 40,
    },
    {
      id: 7,
      name: "Es Teler",
      image: MiePangsit,
      ordered: 30,
    },
    {
      id: 8,
      name: "Kopi",
      image: MiePangsit,
      ordered: 20,
    },
    {
      id: 9,
      name: "Teh",
      image: MiePangsit,
      ordered: 10,
    },
    {
      id: 10,
      name: "Jeruk",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 11,
      name: "Mangga",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 12,
      name: "Durian",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 13,
      name: "Rambutan",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 14,
      name: "Manggis",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 15,
      name: "Leci",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 16,
      name: "Duku",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 17,
      name: "Langsat",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 18,
      name: "Sawo",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 19,
      name: "Gondokusuman",
      image: MiePangsit,
      ordered: 0,
    },
    {
      id: 20,
      name: "Jambu Bol",
      image: MiePangsit,
      ordered: 0,
    },
  ];
  return (
    <div className="text-text bg-surface rounded-xl p-4 h-full">
      <h1 className="text-lg font-semibold mb-2">Popular Dishes</h1>
      <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-2 scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-primary scrollbar-track-background-background">
        {PopularDishData.map((item) => (
          <div
            key={item.id}
            className="flex h-full items-center gap-4 bg-primary/20 rounded-lg py-2 px-4"
          >
            <h1 className="text-text font-bold text-xl mr-2">
              {item.id < 10 ? `0${item.id}` : item.id}
            </h1>
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-text font-semibold tracking-wide">
                {item.name}
              </h1>
              <p className="text-text text-sm font-semibold mt-1">
                <span className="text-text-muted">Ordered: </span>
                {item.ordered}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;
