import { Plus } from "lucide-react";
import { TaxSettings } from "./TaxSettings";
import { ProductList } from "./ProductList";
import { BEPAnalysis } from "./BEPAnalysis";

export function UnitEconomicsTab({
  projectData,
  onUpdateTaxSettings,
  onLoadSampleProducts,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Unit Economics & BEP Analysis
            </h3>
            <p className="text-gray-600">
              Analisis HPP per produk, margin, dan break-even point untuk bisnis
              Anda
            </p>
          </div>
          <button
            onClick={onLoadSampleProducts}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Load Sample Products</span>
          </button>
        </div>

        <TaxSettings
          taxSettings={projectData.tax_settings}
          onUpdate={onUpdateTaxSettings}
        />
      </div>

      <ProductList
        products={projectData.unit_economics}
        taxSettings={projectData.tax_settings}
        onAddProduct={onAddProduct}
        onUpdateProduct={onUpdateProduct}
        onDeleteProduct={onDeleteProduct}
      />

      <BEPAnalysis
        opexItems={projectData.opex_items}
        unitEconomics={projectData.unit_economics}
      />
    </div>
  );
}
