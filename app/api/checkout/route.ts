// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe"

// export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
//     typescript: true
// })

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function POST(req: NextRequest) {
//     try {
//         const { cartItems, customer } = await req.json();

//         if (!cartItems || !customer) {
//             return new NextResponse("Not enough data to checkout", { status: 400 });
//         }


//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             shipping_address_collection: { allowed_countries: ["BR"] },
//             shipping_options: [
//                 { shipping_rate: process.env.STRIPE_SHIPPING_RATE_STANDARD! },
//                 { shipping_rate: process.env.STRIPE_SHIPPING_RATE_EXPRESS! }
//             ],
//             line_items: cartItems.map((cartItem: any) => ({
//                 price_data: {
//                     currency: "brl",
//                     product_data: {
//                         name: cartItem.item.title,
//                         metadata: {
//                             productId: cartItem.item._id,
//                             ...(cartItem.size && { size: cartItem.size }),
//                             ...(cartItem.color && { color: cartItem.color })
//                         }
//                     },
//                     unit_amount: cartItem.item.price * 100,
//                 },
//                 quantity: cartItem.quantity
//             })),
//             client_reference_id: customer.clerkId,
//             success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
//             cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`
//         });
//         return NextResponse.json(session, { headers: corsHeaders });



//     } catch (err) {
//         console.log("[checkout_POST]", err);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    typescript: true
})

// const allowedOrigin = process.env.ECOMMERCE_STORE_URL || "http://localhost:3001";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3001", // Evite "*" se puder, aponte direto para o front
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400", // Cacheia a resposta do CORS por 24 horas
};

export async function OPTIONS() {
    return new NextResponse(null, { 
        status: 204, 
        headers: corsHeaders 
    });
}

export async function POST(req: NextRequest) {
    try {
        const { cartItems, customer } = await req.json();

        if (!cartItems || !customer) {
            return new NextResponse("Not enough data to checkout", { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: { allowed_countries: ["BR"] },
            shipping_options: [
                { shipping_rate: "shr_1RJ0Il2cPUMYHwUs8rqFEcRc" },
                { shipping_rate: "shr_1RJ0QU2cPUMYHwUsEMMEICbr" }
            ],
            line_items: cartItems.map((cartItem: any) => ({
                price_data: {
                    currency: "brl",
                    product_data: {
                        name: cartItem.item.title,
                        metadata: {
                            productId: cartItem.item._id,
                            ...(cartItem.size && { size: cartItem.size }),
                            ...(cartItem.color && { color: cartItem.color })
                        }
                    },
                    unit_amount: cartItem.item.price * 100,
                },
                quantity: cartItem.quantity
            })),
            client_reference_id: customer.clerkId,
            success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
            cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`
        });

        return NextResponse.json(session, { headers: corsHeaders });

    } catch (err) {
        console.log("[checkout_POST]", err);
        return new NextResponse("Internal Server Error", { 
            status: 500, 
            headers: corsHeaders 
        });
    }

}