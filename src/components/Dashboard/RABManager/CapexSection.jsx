import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/rabCalculations";

export function CapexSection({ capexItems }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          CAPEX - Capital Expenditure
        </h3>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Tambah Item</span>
        </button>
      </div>

      <div className="space-y-4">
        {capexItems.map((item, index) => (
          <div
            key={item.id || index}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Item
                </label>
                <input
                  type="text"
                  value={item.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Contoh: Mesin Kopi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="equipment">Equipment</option>
                  <option value="furniture">Furniture</option>
                  <option value="technology">Technology</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah (Rp)
                </label>
                <input
                  type="text"
                  value={formatCurrency(item.amount)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="50,000,000"
                />
              </div>
              <div className="flex items-end">
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-medium text-blue-800">Total CAPEX:</span>
          <span className="text-xl font-bold text-blue-600">
            Rp{" "}
            {formatCurrency(
              capexItems.reduce((sum, item) => sum + (item.amount || 0), 0),
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
