"use client";
import { useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Globe,
  Building2,
  Eye,
  Send,
  CheckCircle,
  DollarSign,
  Calculator,
  Target,
  AlertCircle,
} from "lucide-react";

export function ExportTab({ projectData }) {
  const [selectedExportType, setSelectedExportType] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const exportOptions = [
    {
      id: "pdf",
      name: "PDF Report",
      icon: FileText,
      description: "Professional PDF untuk presentasi & dokumentasi",
      color: "red",
      features: ["Layout professional", "Charts & graphs", "Executive summary"],
    },
    {
      id: "excel",
      name: "Excel Spreadsheet",
      icon: FileSpreadsheet,
      description: "File Excel dengan kalkulasi otomatis",
      color: "green",
      features: ["Formula otomatis", "Multiple worksheets", "Editable format"],
    },
    {
      id: "google-sheets",
      name: "Google Sheets",
      icon: Globe,
      description: "Shareable online spreadsheet",
      color: "blue",
      features: ["Real-time collaboration", "Cloud storage", "Auto-sync"],
    },
    {
      id: "bank-summary",
      name: "Bank-Ready Summary",
      icon: Building2,
      description: "Executive summary untuk pengajuan funding",
      color: "purple",
      features: [
        "Bank-friendly format",
        "Key metrics highlighted",
        "Risk assessment",
      ],
    },
  ];

  const handleExport = async (exportType) => {
    setSelectedExportType(exportType);
    setIsExporting(true);

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would implement actual export logic
      // For now, we'll just show success
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
        setIsExporting(false);
        setSelectedExportType("");
      }, 3000);
    } catch (error) {
      console.error("Export failed:", error);
      setIsExporting(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!projectData) return null;

    const totalCapex =
      projectData.capex_items?.reduce(
        (sum, item) => sum + (item.amount || 0),
        0,
      ) || 0;

    const monthlyOpex =
      projectData.opex_items?.reduce(
        (sum, item) => sum + (item.amount || 0),
        0,
      ) || 0;

    const annualOpex = monthlyOpex * 12;
    const totalInvestment = totalCapex + monthlyOpex * 6; // 6 months working capital

    const totalMonthlyRevenue =
      projectData.unit_economics?.reduce(
        (sum, product) => sum + product.selling_price * product.monthly_volume,
        0,
      ) || 0;

    const totalMonthlyProfit =
      projectData.unit_economics?.reduce((sum, product) => {
        const margin =
          product.selling_price - product.cogs - product.variable_cost;
        return sum + margin * product.monthly_volume;
      }, 0) || 0;

    const netMonthlyProfit = totalMonthlyProfit - monthlyOpex;
    const annualRevenue = totalMonthlyRevenue * 12;
    const annualNetProfit = netMonthlyProfit * 12;

    const paybackPeriod =
      totalInvestment > 0 && netMonthlyProfit > 0
        ? totalInvestment / netMonthlyProfit
        : 0;

    const roi =
      totalInvestment > 0 ? (annualNetProfit / totalInvestment) * 100 : 0;

    return {
      totalCapex,
      monthlyOpex,
      annualOpex,
      totalInvestment,
      totalMonthlyRevenue,
      totalMonthlyProfit,
      netMonthlyProfit,
      annualRevenue,
      annualNetProfit,
      paybackPeriod,
      roi,
    };
  };

  const metrics = getSummaryMetrics();

  if (exportSuccess) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Export Berhasil!
          </h3>
          <p className="text-green-600">
            File telah berhasil di-download. Cek folder Downloads Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Export & Download Options
          </h3>
          <p className="text-gray-600">
            Pilih format export yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedExportType === option.id;
            const colorClasses = {
              red: "border-red-200 bg-red-50 text-red-800",
              green: "border-green-200 bg-green-50 text-green-800",
              blue: "border-blue-200 bg-blue-50 text-blue-800",
              purple: "border-purple-200 bg-purple-50 text-purple-800",
            };

            return (
              <div
                key={option.id}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[option.color]}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {option.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {option.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleExport(option.id)}
                  disabled={isExporting}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isExporting && isSelected
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : `bg-${option.color}-600 text-white hover:bg-${option.color}-700`
                  }`}
                >
                  {isExporting && isSelected ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Exporting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download {option.name}</span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview - Executive Summary */}
      {metrics && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Executive Summary Preview
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>Preview untuk Bank-Ready Summary</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Project Overview */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Ringkasan Proyek
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">
                    Nama Proyek:
                  </span>
                  <span className="ml-2 text-blue-700">
                    {projectData?.project_name || "Belum diisi"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Industri:</span>
                  <span className="ml-2 text-blue-700">
                    {projectData?.industry?.toUpperCase() || "Belum dipilih"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Durasi:</span>
                  <span className="ml-2 text-blue-700">
                    {projectData?.project_duration || 12} bulan
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Mulai:</span>
                  <span className="ml-2 text-blue-700">
                    {projectData?.start_date || "Belum ditentukan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Highlights */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h5 className="font-medium text-green-800 mb-1">
                  Total Investment
                </h5>
                <p className="text-2xl font-bold text-green-600">
                  Rp {formatCurrency(metrics.totalInvestment)}
                </p>
                <p className="text-xs text-green-700 mt-1">
                  CAPEX + 6 bulan working capital
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                <Calculator className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h5 className="font-medium text-purple-800 mb-1">
                  Annual Revenue
                </h5>
                <p className="text-2xl font-bold text-purple-600">
                  Rp {formatCurrency(metrics.annualRevenue)}
                </p>
                <p className="text-xs text-purple-700 mt-1">
                  Rp {formatCurrency(metrics.totalMonthlyRevenue)}/bulan
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
                <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h5 className="font-medium text-orange-800 mb-1">ROI</h5>
                <p className="text-2xl font-bold text-orange-600">
                  {metrics.roi.toFixed(1)}%
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Return on Investment
                </p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-medium text-yellow-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Risk Assessment
              </h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h6 className="font-medium text-yellow-800 mb-2">
                    Strengths:
                  </h6>
                  <ul className="space-y-1 text-yellow-700">
                    {metrics.roi > 20 && <li>• High ROI potential</li>}
                    {metrics.paybackPeriod <= 24 && (
                      <li>• Quick payback period</li>
                    )}
                    {metrics.netMonthlyProfit > 0 && (
                      <li>• Positive cash flow projection</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-yellow-800 mb-2">
                    Considerations:
                  </h6>
                  <ul className="space-y-1 text-yellow-700">
                    <li>• Market competition analysis needed</li>
                    <li>• Seasonal demand variations</li>
                    <li>• Economic downturns impact</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bank Recommendation */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Recommendation untuk Bank
              </h5>
              <p className="text-sm text-blue-700">
                Berdasarkan analisis finansial, proyek ini menunjukkan{" "}
                <strong>
                  {metrics.roi > 15 ? "prospek yang baik" : "prospek moderat"}
                </strong>{" "}
                dengan ROI {metrics.roi.toFixed(1)}% dan payback period{" "}
                {metrics.paybackPeriod.toFixed(1)} bulan. Direkomendasikan untuk{" "}
                {metrics.roi > 20
                  ? "persetujuan pendanaan"
                  : "evaluasi lebih lanjut dengan mitigasi risiko"}
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Export Tips */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">💡 Tips Export:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • <strong>PDF:</strong> Terbaik untuk presentasi ke investor atau
            stakeholder
          </li>
          <li>
            • <strong>Excel:</strong> Ideal untuk analisis lebih lanjut dan
            simulasi skenario
          </li>
          <li>
            • <strong>Google Sheets:</strong> Cocok untuk kolaborasi tim dan
            update real-time
          </li>
          <li>
            • <strong>Bank Summary:</strong> Format khusus untuk pengajuan
            kredit/funding
          </li>
        </ul>
      </div>
    </div>
  );
}
