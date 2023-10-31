import { Order } from "@prisma/client";
import { prisma } from "../_utils/prismaSingleton";

export namespace OrderRepository {
  // export async function SelectAll() {
  //   return await prisma.order.findMany();
  // }

  export async function SelectAll() {
    try {
      const orders = await prisma.order.findMany({
        // Your query conditions here
      });
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function create(order: Order) {
    return await prisma.order.create({
      //   data: user,
      data: {
        ...order,
      },
    });
  }
  export async function SelectById(id: string) {
    return await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
  }
  export async function update(id: string, order: Order) {
    console.log(id, order);
    return await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...order,
      },
    });
  }
  export async function remove(id: string) {
    return await prisma.order.delete({
      where: {
        id: id,
      },
    });
  }

  // //####
  export async function SelectAllByOrderDate(orderDate: Date) {
    return await prisma.order.findMany({
      where: {
        orderDate: new Date(orderDate),
      },
    });
  }

  export async function SelectAllByCustomerName(customerName: string) {
    return await prisma.order.findMany({
      where: {
        customerName,
      },
    });
  }
  export async function SelectAllByCustomerNameAndorderDate(
    customerName: string,
    orderDate: Date
  ) {
    return await prisma.order.findMany({
      where: {
        customerName,
        orderDate,
      },
    });
  }
  // //### Summary Search
  // export async function SelectAllOrderSummary() {
  //   return await prisma.order.groupBy({
  //     by: ["productName", "orderDate"],
  //     _sum: {
  //       qty: true,
  //       conversionBag: true,
  //     },
  //   });
  // }

  export async function SelectAllOrderSummary() {
    try {
      const result = await prisma.order.groupBy({
        by: ["productName", "orderDate"],
        _sum: {
          qty: true,
          conversionBag: true,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function SelectAllOrderSummaryByCustomerName(
    customerName: string
  ) {
    return await prisma.order.groupBy({
      by: ["productName", "orderDate"],
      _sum: {
        qty: true,
        conversionBag: true,
      },
      where: {
        customerName,
      },
    });
  }
  export async function SelectAllOrderSummaryByOrderDate(orderDate: Date) {
    return await prisma.order.groupBy({
      by: ["productName", "orderDate"],
      _sum: {
        qty: true,
        conversionBag: true,
      },
      where: {
        orderDate: new Date(orderDate),
      },
    });
  }
  export async function SelectAllOrderSummaryByCustomerNameAndOrderDate(
    customerName: string,
    orderDate: Date
  ) {
    return await prisma.order.groupBy({
      by: ["productName", "orderDate"],
      _sum: {
        qty: true,
        conversionBag: true,
      },
      where: {
        customerName,
        orderDate: new Date(orderDate),
      },
    });
  }

  //## creatMany, update many
  export async function createMany(orders: Order[]) {
    return await prisma.order.createMany({
      data: [...orders],
    });
  }

  export async function updateMany(customerName: string) {
    console.log(customerName);
    return await prisma.order.updateMany({
      where: {
        customerName,
      },
      data: {
        customerName: "Update Cusotmer Name",
      },
    });
  }

  // //#### 27.10.23
  // export async function SelectAllSummaryWithRelatedOrders() {
  //   let cusOrders: CusOrder[] = [];

  //   interface CusOrder {
  //     productName: string;
  //     orderDate: string;
  //     sumQty: number;
  //     sumBag: number;
  //     orders: Order[];
  //   }

  //   //####
  //   try {
  //     const summaries = await OrderRepository.selectAllOrderSummary();
  //     //### Start Map
  //     summaries.map(async (summary) => {
  //       const related_orders =
  //         await OrderRepository.SelectAllByProductNameAndOrderDate(
  //           summary.productName,
  //           // summary.orderDate
  //           "2023-01-01"
  //         );
  //       const cusOrder = {
  //         productName: summary.productName,
  //         orderDate: "2023-01-01",
  //         sumQty: summary._sum.qty!,
  //         sumBag: summary._sum.conversionBag!,
  //         orders: related_orders,
  //       };

  //       cusOrders.push(cusOrder);
  //       console.log("INSIDE MAP", summary.productName, cusOrders);
  //       // cusOrders = { ...cusOrders, ...cusOrder };
  //       // console.log("INSIDE MAP", cusOrders);
  //     });
  //     //### End Map
  //     console.log("OUTSID MAP", cusOrders);
  //     return cusOrders;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // //#### 27.10.23 ASYN
  // export async function SelectAllSummaryWithRelatedOrders() {
  //   let cusOrders: CusOrder[] = [];

  //   interface CusOrder {
  //     productName: string;
  //     orderDate: string;
  //     sumQty: number;
  //     sumBag: number;
  //     orders: Order[];
  //   }

  //   //####
  //   try {
  //     const summaries = await OrderRepository.selectAllOrderSummary();
  //     //### Start Map
  //     summaries.map(async (summary) => {
  //       const related_orders =
  //         await OrderRepository.SelectAllByProductNameAndOrderDate(
  //           summary.productName,
  //           // summary.orderDate
  //           "2023-01-01"
  //         );
  //       const cusOrder = {
  //         productName: summary.productName,
  //         orderDate: "2023-01-01",
  //         sumQty: summary._sum.qty!,
  //         sumBag: summary._sum.conversionBag!,
  //         orders: related_orders,
  //       };

  //       cusOrders.push(cusOrder);
  //       console.log("INSIDE MAP", summary.productName, cusOrders);
  //       // cusOrders = { ...cusOrders, ...cusOrder };
  //       // console.log("INSIDE MAP", cusOrders);
  //     });
  //     //### End Map
  //     console.log("OUTSID MAP", cusOrders);
  //     return cusOrders;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  // // //#### 27.10.23 REMOVE ASYN
  // export async function SelectAllSummaryWithRelatedOrders() {
  //   let cusOrders: CusOrder[] = [];

  //   interface CusOrder {
  //     productName: string;
  //     orderDate: string;
  //     sumQty: number;
  //     sumBag: number;
  //     orders: Order[];
  //   }

  //   //####
  //   try {
  //     const summaries = await OrderRepository.SelectAllOrderSummary();
  //     //### Start Map
  //     summaries.map((summary) => {
  //       const related_orders =
  //         OrderRepository.SelectAllByProductNameAndOrderDate(
  //           summary.productName,
  //           // summary.orderDate
  //           "2023-01-01"
  //         );
  //       const cusOrder = {
  //         productName: summary.productName,
  //         orderDate: "2023-01-01",
  //         sumQty: summary._sum.qty!,
  //         sumBag: summary._sum.conversionBag!,
  //         orders: related_orders,
  //       };

  //       cusOrders.push(cusOrder);
  //       console.log("INSIDE MAP", summary.productName, cusOrders);
  //       // cusOrders = { ...cusOrders, ...cusOrder };
  //       // console.log("INSIDE MAP", cusOrders);
  //     });
  //     //### End Map
  //     console.log("OUTSID MAP", cusOrders);
  //     return cusOrders;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  //#### 30.10.23 OK
  // export async function SelectAllSummaryWithRelatedOrders() {
  //   try {
  //     let cusOrders: CusOrder[] = [];
  //     interface CusOrder {
  //       productName: string;
  //       orderDate: string;
  //       sumQty: number;
  //       sumBag: number;
  //       orders: Order[];
  //     }
  //     //####
  //     const summaries = await OrderRepository.SelectAllOrderSummary();

  //     //### Start Map
  //     const result = summaries.map(async (summary) => {
  //       const related_orders =
  //         await OrderRepository.SelectAllByProductNameAndOrderDate(
  //           summary.productName,
  //           // summary.orderDate
  //           "2023-01-01"
  //         );
  //       const cusOrder = {
  //         productName: summary.productName,
  //         orderDate: "2023-01-01",
  //         sumQty: summary._sum.qty!,
  //         sumBag: summary._sum.conversionBag!,
  //         orders: related_orders,
  //       };

  //       return cusOrder;
  //     });
  //     //### End Map

  //     return await Promise.all(result);
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

  //#### 30.10.23 Final
  export async function SelectAllSummaryWithRelatedOrders() {
    try {
      let cusOrders: CusOrder[] = [];
      interface CusOrder {
        productName: string;
        orderDate: Date;
        sumQty: number;
        sumBag: number;
        orders: Order[];
      }
      //####
      const summaries = await OrderRepository.SelectAllOrderSummary();

      //### Start Map
      const result = summaries.map(async (summary) => {
        const related_orders =
          await OrderRepository.SelectAllByProductNameAndOrderDate(
            summary.productName,
            summary.orderDate
          );
        const cusOrder = {
          productName: summary.productName,
          orderDate: summary.orderDate,
          sumQty: summary._sum.qty!,
          sumBag: summary._sum.conversionBag!,
          orders: related_orders,
        };

        return cusOrder;
      });
      //### End Map

      return await Promise.all(result);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function SelectAllSummaryWithRelatedOrdersByCustomerNameAndOrderDate(
    customerName: string,
    orderDate: Date
  ) {
    try {
      let cusOrders: CusOrder[] = [];
      interface CusOrder {
        productName: string;
        orderDate: Date;
        sumQty: number;
        sumBag: number;
        orders: Order[];
      }
      //####
      const summaries =
        await OrderRepository.SelectAllOrderSummaryByCustomerNameAndOrderDate(
          customerName,
          orderDate
        );

      //### Start Map
      const result = summaries.map(async (summary) => {
        const related_orders =
          await OrderRepository.SelectAllByProductNameAndOrderDate(
            summary.productName,
            summary.orderDate
          );
        const cusOrder = {
          productName: summary.productName,
          orderDate: summary.orderDate,
          sumQty: summary._sum.qty!,
          sumBag: summary._sum.conversionBag!,
          orders: related_orders,
        };

        return cusOrder;
      });
      //### End Map

      return await Promise.all(result);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function SelectAllSummaryWithRelatedOrdersByCustomerName(
    customerName: string
  ) {
    try {
      let cusOrders: CusOrder[] = [];
      interface CusOrder {
        productName: string;
        orderDate: Date;
        sumQty: number;
        sumBag: number;
        orders: Order[];
      }
      //####
      const summaries = await OrderRepository.SelectAllByCustomerName(
        customerName
      );

      //### Start Map
      const result = summaries.map(async (summary) => {
        const related_orders =
          await OrderRepository.SelectAllByProductNameAndOrderDate(
            summary.productName,
            summary.orderDate
          );
        const cusOrder = {
          productName: summary.productName,
          orderDate: summary.orderDate,
          sumQty: summary.qty!,
          sumBag: summary.conversionBag!,
          orders: related_orders,
        };

        return cusOrder;
      });
      //### End Map

      return await Promise.all(result);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function SelectAllSummaryWithRelatedOrdersByOrderDate(
    orderDate: Date
  ) {
    try {
      let cusOrders: CusOrder[] = [];
      interface CusOrder {
        productName: string;
        orderDate: Date;
        sumQty: number;
        sumBag: number;
        orders: Order[];
      }
      //####
      const summaries = await OrderRepository.SelectAllOrderSummaryByOrderDate(
        orderDate
      );

      //### Start Map
      const result = summaries.map(async (summary) => {
        const related_orders =
          await OrderRepository.SelectAllByProductNameAndOrderDate(
            summary.productName,
            summary.orderDate
          );
        const cusOrder = {
          productName: summary.productName,
          orderDate: summary.orderDate,
          sumQty: summary._sum.qty!,
          sumBag: summary._sum.conversionBag!,
          orders: related_orders,
        };

        return cusOrder;
      });
      //### End Map

      return await Promise.all(result);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  export async function SelectAllByProductNameAndOrderDate(
    productName: string,
    orderDate: Date
  ) {
    try {
      const result = await prisma.order.findMany({
        where: {
          productName,
          orderDate: new Date(orderDate),
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  // export async function createCusOrder(
  //   productName: string,
  //   orderDate: string,
  //   sumQty: number,
  //   sumBag: number,
  //   orders: Order[]
  // ) {
  //   const cusOrder = {
  //     productName,
  //     orderDate: "2023-01-01",
  //     sumQty,
  //     sumBag,
  //     orders,
  //   };
  //   // console.log(cusOrder);
  //   return cusOrder;
  // }

  //####
}
