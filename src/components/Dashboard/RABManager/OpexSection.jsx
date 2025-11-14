import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/rabCalculations";

export function OpexSection({ opexItems }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          OPEX - Operational Expenditure
        </h3>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Plus className="w-4 h-4" />
          <span>Tambah Item</span>
        </button>
      </div>

      <div className="space-y-4">
        {opexItems.map((item, index) => (
          <div
            key={item.id || index}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Item
                </label>
                <input
                  type="text"
                  value={item.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Contoh: Gaji Barista"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="cogs">COGS</option>
                  <option value="salary">Salary</option>
                  <option value="rent">Rent</option>
                  <option value="utilities">Utilities</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah/Bulan (Rp)
                </label>
                <input
                  type="text"
                  value={formatCurrency(item.amount)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="5,000,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frekuensi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="monthly">Bulanan</option>
                  <option value="quarterly">Kuartalan</option>
                  <option value="annual">Tahunan</option>
                </select>
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

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-medium text-green-800">Total OPEX/Bulan:</span>
          <span className="text-xl font-bold text-green-600">
            Rp{" "}
            {formatCurrency(
              opexItems.reduce((sum, item) => sum + (item.amount || 0), 0),
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
