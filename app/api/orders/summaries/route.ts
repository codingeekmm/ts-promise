import { OrderRepository } from "@/app/_repositories/Order";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     if (searchParams.size == 0) {
//       const result = await OrderRepository.selectAllOrderSummary();
//       return NextResponse.json(result);
//     } else {
//       const customerName = searchParams.get("customerName");
//       const orderDate = searchParams.get("orderDate");

//       if (customerName && orderDate) {
//         const result =
//           await OrderRepository.selectAllOrderSummaryByCustomerNameAndOrderDate(
//             customerName,
//             orderDate
//           );
//         return NextResponse.json(result);
//       } else if (customerName && !orderDate) {
//         const result =
//           await OrderRepository.selectAllOrderSummaryByCustomerName(
//             customerName
//           );
//         return NextResponse.json(result);
//       } else if (!customerName && orderDate) {
//         const result = await OrderRepository.selectAllOrderSummaryByOrderDate(
//           orderDate
//         );
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

// //### 27.8.23
// export async function GET(request: NextRequest) {
//   try {
//     // console.log("hello");
//     const result =
//       await OrderRepository.selectAllOrderSummaryByOrderDateWithResult();
//     // console.log("Result", result);
//     // const a = result.map((item) => {
//     //   item.then((r) => {
//     //    console.log(r)
//     //   });
//     // });//

//     console.log("result", mysasis);
//     return NextResponse.json(mysasis);
//   } catch (e) {
//     //return NextResponse.next({ status: 500 });
//     return NextResponse.json(
//       { error: "Internal Server Error 1234" },
//       { status: 500 }
//     );
//   }
// }

// //### 31.8.23
// export async function GET(request: NextRequest) {
//   try {
//     const result =
//       await OrderRepository.selectAllOrderSummaryByOrderDateWithResult();

//     return NextResponse.json(result);
//   } catch (e) {
//     //return NextResponse.next({ status: 500 });
//     return NextResponse.json(
//       { error: "Internal Server Error 1234" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.size == 0) {
      const result = await OrderRepository.SelectAllSummaryWithRelatedOrders();
      return NextResponse.json(result);
    } else {
      const customerName = searchParams.get("customerName");
      const orderDate = searchParams.get("orderDate");

      if (customerName && orderDate) {
        const result =
          await OrderRepository.SelectAllSummaryWithRelatedOrdersByCustomerNameAndOrderDate(
            customerName,
            new Date(orderDate)
          );
        return NextResponse.json(result);
      } else if (customerName && !orderDate) {
        const result =
          await OrderRepository.SelectAllSummaryWithRelatedOrdersByCustomerName(
            customerName
          );
        return NextResponse.json(result);
      } else if (!customerName && orderDate) {
        const result =
          await OrderRepository.SelectAllSummaryWithRelatedOrdersByOrderDate(
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
