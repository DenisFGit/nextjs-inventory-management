'use client'
import { deleteProduct } from "@/lib/actions/products";
import { prisma } from '../lib/prisma';
import { getCurrentUser } from "@/lib/auth";


export async function DeleteProductComponent() {

    const user = await getCurrentUser();
    const userId = user.id;

    const allProducts = await prisma.product.findMany({
        where: { userId: userId },
    });


    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {allProducts.map((product) => {
                return <tr key={product.id} className="hover: bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {product.lowStockAt}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        <form action={async (formData: FormData) => {
                            await deleteProduct(formData);
                        }}>
                            <input type="hidden" name="id" value={product.id} />
                            <button className="text-red-600 hover:text-red-900">
                                Delete
                            </button>
                        </form>
                    </td>
                </tr>
            })}
        </tbody>
    )
}