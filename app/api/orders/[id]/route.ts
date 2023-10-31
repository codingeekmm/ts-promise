import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OrderRepository } from "@/app/_repositories/Order";
import { Order } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //const user: User = await request.json();
    console.log(params.id);
    const result = await OrderRepository.SelectById(params.id);
    return NextResponse.json(result);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const order: Order = await request.json();
//     const updatedOrder = await OrderRepository.update(params.id, order);

//     return NextResponse.json(updatedOrder);
//   } catch (e) {
//     //return NextResponse.next({ status: 500 });
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedOrder = await OrderRepository.remove(params.id);
    return NextResponse.json(deletedOrder);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
