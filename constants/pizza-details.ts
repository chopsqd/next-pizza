export const mapPizzaSize: Record<number, string> = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая"
};

export const mapPizzaType: Record<number, string> = {
  1: "традиционное",
  2: "тонкое"
};

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  value: Number(value),
  name,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  value: Number(value),
  name,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;