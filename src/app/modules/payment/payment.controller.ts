/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import catchAsync from "../../utils/catchAsync";
const stripe = require("stripe")(
  "sk_test_51P7dlcB60XUsFAl1MT08t9QOGVFqdQvBNBzJUGWcG6L74e0eQxFWwNhPvNRQy7znNm1a1txc3dB6WwXhGAAZgg9G00EKDY2KHk"
);

const makepaymentController = catchAsync(async (req, res, next) => {
  const { products } = req.body;

  const lineItems = products?.map(
    (product: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: product?.name,
        },
        unit_amount: product?.price * 100,
      },
      quantity: product?.quantity,
    })
  );

  const session = await stripe?.checkout?.sessions?.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://mechanical-keyboard-frontend.vercel.app/success",
    cancel_url: "https://mechanical-keyboard-frontend.vercel.app/cancel",
  });

  res.json({ id: session?.id });
});

export default makepaymentController;
