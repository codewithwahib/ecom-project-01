import Stripe from 'stripe';

// Log the environment variable for debugging
console.log("Stripe Secret Key:", process.env.NEXT_SECRET_STRIPE_KEY);

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Log the incoming data for debugging purposes
      console.log(req.body);

      // Validate the request body to ensure it has the necessary data
      if (!req.body || req.body.length === 0) {
        return res.status(400).json({ error: 'No items provided in the request body' });
      }

      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1MJIEoHbmXqvpyhdyi5WNQHl' },
            { shipping_rate: 'shr_1MJIGgHbmXqvpyhdQCdPgK8F' }
        ],
        line_items: req.body.map((item) => {
          if (!item.name || !item.price || !item.image || !item.quantity) {
            throw new Error('Missing required fields in item');
          }

          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/dow10h3v/production/').replace('-png', '.png');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100, // Stripe requires amounts in cents
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity
          };
        }),
        success_url: `${req.headers.origin}/successPay`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      // Create the session
      const session = await stripe.checkout.sessions.create(params);
      
      // Return session data to the client
      res.status(200).json(session);
    } catch (err) {
      console.error(err);  // Log error for debugging
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
