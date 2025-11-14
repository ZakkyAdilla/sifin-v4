import { calculateOverallBEP, formatCurrency } from "@/utils/rabCalculations";

export function OverallBEP({ opexItems, unitEconomics }) {
  const { bepUnits, bepRevenue } = calculateOverallBEP(
    opexItems,
    unitEconomics,
  );

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-800 mb-3">
        Break-Even Point Overall
      </h4>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {bepUnits.toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Unit per bulan</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            Rp {formatCurrency(bepRevenue)}
          </div>
          <div className="text-sm text-blue-700">Revenue per bulan</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {(bepRevenue / 30).toFixed(0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Revenue per hari</div>
        </div>
      </div>
    </div>
  );
}
