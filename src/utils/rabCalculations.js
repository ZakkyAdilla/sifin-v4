export const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

export const calculateProductMetrics = (product, taxSettings) => {
  const margin = product.selling_price - product.cogs - product.variable_cost;
  const marginPercent =
    product.selling_price > 0 ? (margin / product.selling_price) * 100 : 0;
  const monthlyRevenue = product.selling_price * product.monthly_volume;
  const monthlyProfit = margin * product.monthly_volume;

  const ppnAmount = taxSettings.include_ppn
    ? (monthlyRevenue * taxSettings.ppn_rate) / 100
    : 0;
  const pphAmount = (monthlyRevenue * taxSettings.pph_rate) / 100;
  const netProfit = monthlyProfit - pphAmount;

  return {
    margin,
    marginPercent,
    monthlyRevenue,
    monthlyProfit,
    ppnAmount,
    pphAmount,
    netProfit,
  };
};

export const calculateOverallBEP = (opexItems, unitEconomics) => {
  const totalFixedCosts = opexItems.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );
  const totalWeightedMargin = unitEconomics.reduce((sum, product) => {
    const margin = product.selling_price - product.cogs - product.variable_cost;
    return sum + margin * product.monthly_volume;
  }, 0);
  const totalVolume = unitEconomics.reduce(
    (sum, product) => sum + product.monthly_volume,
    0,
  );
  const averageMargin = totalVolume > 0 ? totalWeightedMargin / totalVolume : 0;

  const bepUnits =
    averageMargin > 0 ? Math.ceil(totalFixedCosts / averageMargin) : 0;
  const bepRevenue = unitEconomics.reduce((sum, product) => {
    const productShare =
      totalVolume > 0 ? product.monthly_volume / totalVolume : 0;
    return sum + product.selling_price * bepUnits * productShare;
  }, 0);

  return {
    bepUnits,
    bepRevenue,
    totalFixedCosts,
    averageMargin,
  };
};

export const calculateProductBEP = (
  product,
  totalFixedCosts,
  totalProducts,
) => {
  const margin = product.selling_price - product.cogs - product.variable_cost;
  const allocatedFixedCost =
    totalProducts > 0 ? totalFixedCosts / totalProducts : 0;
  const bepUnits = margin > 0 ? Math.ceil(allocatedFixedCost / margin) : 0;

  return {
    bepUnits,
    bepRevenue: bepUnits * product.selling_price,
    isProfitable: product.monthly_volume >= bepUnits,
    unitsNeeded: Math.max(0, bepUnits - product.monthly_volume),
  };
};
