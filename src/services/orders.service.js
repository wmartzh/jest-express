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
  return products.reduce(
    (prev, current) => prev + current.tax * current.quantity,
    0
  );
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

  return prisma.orders.create({ data: newOrder });
}

async function getAll() {
  const result = await prisma.orders.findMany({
    include: {
      ShippingComments: true,
    },
  });
  if (!result) {
    throw new CustomError({ status: 404, message: "No orders found" });
  }
  return result;
}
async function getById(orderId) {
  const order = await prisma.orders.findFirst({
    where: {
      id: orderId,
    },
    include: {
      ShippingComments: true,
    },
  });
  if (!order) {
    throw new CustomError({ status: 404, message: "Order doesn't exist" });
  }
  return order;
}

async function updateState(orderData) {
  const { orderId, ...rest } = orderData;
  await prisma.orders.update({
    where: {
      id: orderId,
    },
    data: {
      state: rest.orderState,
    },
  });

  await prisma.shippingComments.create({
    data: {
      ordersId: orderId,
      message: rest.comments
        ? rest.comments
        : `State updated to: ${rest.orderState}`,
    },
  });
  return {
    message: "Order was updated successfully",
  };
}

module.exports = { create, getAll, updateState, getById };
