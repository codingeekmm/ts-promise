import { OrderRepository } from "@/app/_repositories/Order";
import { Order } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.size == 0) {
      const result = await OrderRepository.SelectAll();
      return NextResponse.json(result);
    } else {
      const customerName = searchParams.get("customerName");
      const orderDate = searchParams.get("orderDate");

      if (customerName && orderDate) {
        const result =
          await OrderRepository.SelectAllByCustomerNameAndorderDate(
            customerName,
            new Date(orderDate)
          );
        return NextResponse.json(result);
      } else if (customerName && !orderDate) {
        const result = await OrderRepository.SelectAllByCustomerName(
          customerName
        );
        return NextResponse.json(result);
      } else if (!customerName && orderDate) {
        const result = await OrderRepository.SelectAllByOrderDate(
          new Date(orderDate)
        );
        return NextResponse.json(result);
      }
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     if (searchParams.size == 0) {
//       const result =
//         await OrderRepository.selectAllOrderSummaryByOrderDateWithResult();
//       return NextResponse.json(result);
//     } else {
//       const customerName = searchParams.get("customerName");
//       const orderDate = searchParams.get("orderDate");

//       if (customerName && orderDate) {
//         const result =
//           await OrderRepository.SelectAllByCustomerNameAndorderDate(
//             customerName,
//             orderDate
//           );
//         return NextResponse.json(result);
//       } else if (customerName && !orderDate) {
//         const result = await OrderRepository.SelectAllByCustomerName(
//           customerName
//         );
//         return NextResponse.json(result);
//       } else if (!customerName && orderDate) {
//         const result = await OrderRepository.SelectAllByOrderDate(orderDate);
//         return NextResponse.json(result);
//       }
//     }
//   } catch (e) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const orders: Order[] = await request.json();
    const newOrders = await OrderRepository.createMany(orders);

    return NextResponse.json(newOrders);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//update Many
export async function PUT(request: NextRequest) {
  try {
    // const order: Order = await request.json();
    const { searchParams } = new URL(request.url);
    const customerName = searchParams.get("customerName")!;
    const updatedOrders = await OrderRepository.updateMany(customerName);

    return NextResponse.json(updatedOrders);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
