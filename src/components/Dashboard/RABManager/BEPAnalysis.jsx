import { Target } from "lucide-react";
import { OverallBEP } from "./OverallBEP";
import { ProductBEPList } from "./ProductBEPList";

export function BEPAnalysis({ opexItems, unitEconomics }) {
  if (unitEconomics.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Break-Even Point Analysis
        </h3>
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Tambahkan produk untuk melihat analisis break-even point</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Break-Even Point Analysis
      </h3>

      <div className="space-y-6">
        <OverallBEP opexItems={opexItems} unitEconomics={unitEconomics} />
        <ProductBEPList opexItems={opexItems} unitEconomics={unitEconomics} />
      </div>
    </div>
  );
}
