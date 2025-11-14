import {
  calculateProductMetrics,
  formatCurrency,
} from "@/utils/rabCalculations";

export function ProductAnalytics({ product, taxSettings }) {
  const {
    margin,
    marginPercent,
    monthlyRevenue,
    monthlyProfit,
    ppnAmount,
    pphAmount,
    netProfit,
  } = calculateProductMetrics(product, taxSettings);

  return (
    <div className="grid md:grid-cols-5 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="text-xs font-medium text-gray-500 mb-1">
          Margin/Unit
        </div>
        <div
          className={`font-semibold ${margin >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          Rp {formatCurrency(Math.abs(margin))}
        </div>
        <div className="text-xs text-gray-500">
          ({marginPercent.toFixed(1)}%)
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-500 mb-1">
          Revenue/Bulan
        </div>
        <div className="font-semibold text-blue-600">
          Rp {formatCurrency(monthlyRevenue)}
        </div>
        <div className="text-xs text-gray-500">
          {taxSettings.include_ppn && `+PPN: Rp ${formatCurrency(ppnAmount)}`}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-500 mb-1">
          Profit/Bulan
        </div>
        <div
          className={`font-semibold ${monthlyProfit >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          Rp {formatCurrency(Math.abs(monthlyProfit))}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-500 mb-1">
          PPh ({taxSettings.pph_rate}%)
        </div>
        <div className="font-semibold text-orange-600">
          Rp {formatCurrency(pphAmount)}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-500 mb-1">Net Profit</div>
        <div
          className={`font-semibold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          Rp {formatCurrency(Math.abs(netProfit))}
        </div>
      </div>
    </div>
  );
}
