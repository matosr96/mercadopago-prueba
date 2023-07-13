import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token:
      "TEST-3079556652064646-071218-7b7009a858698ba3e7c5927c35f19303-1422495880",
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "Laptop",
        unit_price: 50000,
        currency_id: "COP",
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
    notification_url: "https://4398-181-78-4-10.ngrok.io/webhook",
  });

  console.log(result);

  res.send(result.body);
};

export const receiveWebhook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
