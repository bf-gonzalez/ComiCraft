import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe("sk_test_51PiMFr2K8akoQqIvjArZrVIvHRopS1FPhmswV0QQsiRtBWr8IBH94SQ4KeoIggm5UJm8fzCKNuN57sHsxLlVTEHQ00Was5x0Vv");

export async function POST(request: Request){


    const body = await request.json();
    console.log(body);
    
    const session = await stripe.checkout.sessions.create({
        success_url:"http://localhost:3000/home",
        line_items:[
            {
                price_data:{
                    currency: "usd",
                    product_data:{
                        name: body.name,
                    },
                    unit_amount: body.price,
                },
                quantity: 1
            }
        ],
        mode: "payment",
    });

    console.log(session);
    return NextResponse.json(session);
};