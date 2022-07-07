const prisma = require("../prisma/client");
const { CustomError } = require("../helpers/response.helper");
const { orders } = require("../prisma/client");

function subtotal(products) {
  return products.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0
  );
}
function getTaxes(products) {
  return products.reduce((prev, current) => prev + current.tax, 0);
}

function generateOrderNumber(q) {
  let value = "";
  for (let i = 0; i < q; ++i) {
    value = `${value}${Math.floor(Math.random() * 10)}`;
  }
  return value;
}

async function create(newOrder) {
  const { products } = newOrder;
  newOrder["number"] = generateOrderNumber(10);
  newOrder["subtotal"] = subtotal(products);
  newOrder["taxes"] = getTaxes(products);
  newOrder["total"] =
    newOrder.subtotal + newOrder.taxes + newOrder.shipping_fee;

  const order = await prisma.orders.create({ data: newOrder });
  return order;
}

module.exports = { create };
