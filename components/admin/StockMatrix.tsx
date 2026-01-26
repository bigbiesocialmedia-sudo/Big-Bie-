import React from 'react';
import { ProductColor, ProductSize } from '../../types';

interface StockMatrixProps {
    colors: ProductColor[];
    sizes: ProductSize[];
    stockMatrix: Record<string, number>;
    onChange: (stockMatrix: Record<string, number>) => void;
}

const StockMatrix: React.FC<StockMatrixProps> = ({ colors, sizes, stockMatrix, onChange }) => {

    const handleStockChange = (sizeValue: string, colorValue: string, stock: string) => {
        const updated = { ...stockMatrix };
        const key = `${sizeValue}-${colorValue}`;

        // If empty or invalid, remove from matrix
        if (!stock || stock === '') {
            delete updated[key];
        } else {
            const numStock = parseInt(stock);
            if (!isNaN(numStock) && numStock >= 0) {
                updated[key] = numStock;
            }
        }

        onChange(updated);
    };

    const getStock = (sizeValue: string, colorValue: string): number | undefined => {
        const key = `${sizeValue}-${colorValue}`;
        return stockMatrix[key];
    };

    if (colors.length === 0 || sizes.length === 0) {
        return (
            <div className="space-y-4">
                <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold">Stock Inventory</h3>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p className="text-yellow-800 font-medium">
                        ⚠️ Please add at least one color and one size to manage stock inventory
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="border-b pb-2">
                <h3 className="text-lg font-semibold">Stock Inventory</h3>
                <p className="text-sm text-gray-600 mt-1">
                    Enter stock quantities for each size+color combination. Leave empty if combination doesn't exist.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left font-semibold text-sm">
                                Size / Color
                            </th>
                            {colors.map(color => (
                                <th
                                    key={color.id}
                                    className="border border-gray-300 p-2 text-center font-semibold text-sm min-w-[100px]"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded border border-gray-400"
                                            style={{ backgroundColor: color.value || '#CCCCCC' }}
                                        />
                                        <span>{color.name || 'Unnamed'}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map(size => (
                            <tr key={size.id}>
                                <td className="border border-gray-300 p-2 font-medium bg-gray-50 text-sm">
                                    {size.name || 'Unnamed'}
                                </td>
                                {colors.map(color => {
                                    const stock = getStock(size.value, color.value);
                                    return (
                                        <td key={`${size.id}-${color.id}`} className="border border-gray-300 p-1">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-full p-2 text-center border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="-"
                                                value={stock !== undefined ? stock : ''}
                                                onChange={e => handleStockChange(size.value, color.value, e.target.value)}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Empty cells = combination doesn't exist.
                    Enter <strong>0</strong> for out-of-stock items, or leave empty if you don't sell that combination.
                </p>
            </div>
        </div>
    );
};

export default StockMatrix;
