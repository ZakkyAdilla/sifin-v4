import { calculateProductBEP, formatCurrency } from "@/utils/rabCalculations";

export function ProductBEPList({ opexItems, unitEconomics }) {
  const totalFixedCosts = opexItems.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3">Break-Even per Produk</h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {unitEconomics.map((product, index) => {
          const { bepUnits, bepRevenue, isProfitable, unitsNeeded } =
            calculateProductBEP(product, totalFixedCosts, unitEconomics.length);

          return (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">
                {product.name || `Produk ${index + 1}`}
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">BEP Unit:</span>
                  <span className="font-medium">
                    {bepUnits.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">BEP Revenue:</span>
                  <span className="font-medium">
                    Rp {formatCurrency(bepRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Volume:</span>
                  <span
                    className={`font-medium ${isProfitable ? "text-green-600" : "text-red-600"}`}
                  >
                    {product.monthly_volume.toLocaleString()}
                  </span>
                </div>
              </div>
              {isProfitable ? (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✅ Sudah Profitable
                </div>
              ) : (
                <div className="mt-2 text-xs text-red-600 font-medium">
                  ⚠️ Butuh {unitsNeeded.toLocaleString()} unit lagi
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
