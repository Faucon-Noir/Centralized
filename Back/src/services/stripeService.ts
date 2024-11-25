import Stripe from 'stripe';
import * as dotenv from "dotenv";
import { User } from "../entity/User";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-10-28.acacia', });


interface UserStripe { 
    id: string; 
    mail: string; 
    lastname: string; 
    firstname: string; 

} 

const createStripeCustomer = async (user: UserStripe) => { 
    try { 
        const customer = await stripe.customers.create({ 
            email: user.mail, 
            name: user.lastname + ' ' + user.firstname, 
            metadata: { userId: user.id, }, 
        }); 
        console.log('Customer created: ', customer); 
        return customer; 
    } catch (error) { 
        console.error('Error creating customer: ', error); 
        throw error; 
    } 
};

const paymentStripe = async (price: string, customer_id: string, data: User) => {
    try {
        const session = stripe.checkout.sessions.create({ 
            payment_method_types: ['card'], 
            line_items: [ 
                { 
                    price: price, 
                    quantity: 1, 
                }, 
            ], 
            mode: 'subscription', 
            success_url: 'http://localhost:3000/success', 
            cancel_url: 'http://localhost:3000/login', 
            customer: customer_id, 
        })
        return session;
    } catch (error) {
        console.error('Error creating customer: ', error); 
        throw error; 
    }
}

const getProductStripe = async (productId: string) => {
    try {
        const prices =stripe.prices.list({ 
            product: productId, 
            limit: 1, // Ajuste cette valeur selon tes besoins 
        });
        return prices;
    } catch (error) {
        console.error('Error creating customer: ', error); 
        throw error; 
    }
}

const finishPaymentStripe = async (data: any, sig: string) => {
    let event; 
    try { 
        event = stripe.webhooks.constructEvent(data.body, sig, process.env.STRIPE_SECRET_WEBHOOK_KEY); 
    } catch (err) { 
        return {error: `Webhook Error: ${err.message}`}; 
    } // Gérer l'événement 
    if (event.type === 'checkout.session.completed') { 
        const session = event.data.object as Stripe.Checkout.Session; 
        session.customer_details.email;
    }

}

export { createStripeCustomer, UserStripe, paymentStripe, getProductStripe, finishPaymentStripe };