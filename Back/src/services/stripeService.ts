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
            success_url: 'http://localhost:3000/login?status_stripe=success', 
            cancel_url: 'http://localhost:3000/login?status_stripe=error', 
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

async function findCustomerByEmail(email: string) { 
    try { 
        const customers = await stripe.customers.search({ 
            query : 'email:"'+email+'"',
            limit: 1
        }); 
        return customers.data; 
    } catch (err) { 
        console.error(`Error searching for customer: ${err.message}`); 
        return null; 
    } 
}

export { createStripeCustomer, UserStripe, paymentStripe, getProductStripe, findCustomerByEmail };