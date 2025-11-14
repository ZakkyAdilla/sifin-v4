import { Plus, Trash2 } from "lucide-react";
import { ProductAnalytics } from "./ProductAnalytics";

export function ProductList({
  products,
  taxSettings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Daftar Produk/Layanan
        </h3>
        <button
          onClick={onAddProduct}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="grid md:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    onUpdateProduct(index, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Nasi Ayam"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga Jual (Rp)
                </label>
                <input
                  type="number"
                  value={product.selling_price}
                  onChange={(e) =>
                    onUpdateProduct(
                      index,
                      "selling_price",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  COGS (Rp)
                </label>
                <input
                  type="number"
                  value={product.cogs}
                  onChange={(e) =>
                    onUpdateProduct(
                      index,
                      "cogs",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="12000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biaya Variabel (Rp)
                </label>
                <input
                  type="number"
                  value={product.variable_cost}
                  onChange={(e) =>
                    onUpdateProduct(
                      index,
                      "variable_cost",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="2000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume/Bulan
                </label>
                <input
                  type="number"
                  value={product.monthly_volume}
                  onChange={(e) =>
                    onUpdateProduct(
                      index,
                      "monthly_volume",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="100"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => onDeleteProduct(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ProductAnalytics product={product} taxSettings={taxSettings} />
          </div>
        ))}
      </div>
    </div>
  );
}
