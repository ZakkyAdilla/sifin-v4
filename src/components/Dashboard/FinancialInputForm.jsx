import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  Save,
  CheckCircle,
} from "lucide-react";

export function FinancialInputForm({ onDataUpdate, initialData = null }) {
  const [formData, setFormData] = useState({
    // Pendapatan 5 bulan
    revenue_month1: "",
    revenue_month2: "",
    revenue_month3: "",
    revenue_month4: "",
    revenue_month5: "",

    // Pengeluaran 5 bulan
    expense_month1: "",
    expense_month2: "",
    expense_month3: "",
    expense_month4: "",
    expense_month5: "",

    // Breakdown pengeluaran (bulan terakhir)
    raw_materials: "",
    salary: "",
    operational: "",
    utilities: "",
    transportation: "",
    other_expenses: "",

    // Arus kas
    cash_sales: "",
    credit_sales: "",
    accounts_receivable: "",
    inventory: "",
    cash_balance: "",

    // Kewajiban & Modal
    accounts_payable: "",
    bank_loans: "",
    initial_capital: "",

    // Info bisnis
    employees: "",
    business_age_months: "",
  });

  const [isComplete, setIsComplete] = useState(false);
  const [showForm, setShowForm] = useState(!initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsComplete(true);
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const newFormData = {
      ...formData,
      [field]: numericValue,
    };
    setFormData(newFormData);
    setHasChanges(true);

    // Check if minimum required fields are filled
    const requiredFields = ["revenue_month5", "expense_month5", "cash_balance"];
    const hasRequiredData = requiredFields.every((field) => newFormData[field]);

    if (hasRequiredData) {
      setIsComplete(true);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const calculateSummary = () => {
    const currentRevenue = parseFloat(formData.revenue_month5) || 0;
    const currentExpense = parseFloat(formData.expense_month5) || 0;
    const previousRevenue =
      parseFloat(formData.revenue_month4) || currentRevenue;

    const profit = currentRevenue - currentExpense;
    const profitMargin =
      currentRevenue > 0 ? (profit / currentRevenue) * 100 : 0;
    const growth =
      previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : 0;

    return { profit, profitMargin, growth, currentRevenue, currentExpense };
  };

  const handleSaveAndAnalyze = async () => {
    if (!isComplete) {
      alert(
        "Mohon isi minimal data pendapatan & pengeluaran bulan terakhir dan saldo kas",
      );
      return;
    }

    setIsSaving(true);

    try {
      // Simulate save delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      setShowForm(false);
      setHasChanges(false);
      setShowSaveSuccess(true);

      if (onDataUpdate) {
        onDataUpdate(formData);
      }

      // Hide success message after 3 seconds
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickSave = async () => {
    if (!hasChanges) return;

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHasChanges(false);
      setShowSaveSuccess(true);

      if (onDataUpdate) {
        onDataUpdate(formData);
      }

      setTimeout(() => setShowSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Success notification
  if (showSaveSuccess) {
    return (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2" />
        Data berhasil disimpan!
      </div>
    );
  }

  if (!showForm && isComplete) {
    const summary = calculateSummary();
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 text-[#2196F3] mr-2" />
            Data Keuangan Tersimpan
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-[#2196F3] hover:text-[#1976D2] flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Calculator className="w-4 h-4 mr-1" />
            Edit Data
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <h3 className="text-sm font-medium text-green-800 mb-1">
              Pendapatan Bulan Ini
            </h3>
            <p className="text-2xl font-bold text-green-600">
              Rp {formatCurrency(summary.currentRevenue)}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              Profit Margin
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {summary.profitMargin.toFixed(1)}%
            </p>
          </div>
          <div
            className={`${summary.growth >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border rounded-xl p-4 text-center`}
          >
            <h3
              className={`text-sm font-medium ${summary.growth >= 0 ? "text-green-800" : "text-red-800"} mb-1`}
            >
              Growth Rate
            </h3>
            <p
              className={`text-2xl font-bold ${summary.growth >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {summary.growth >= 0 ? "+" : ""}
              {summary.growth.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-[#F5F7FA] rounded-xl p-4">
          <p className="text-gray-700 text-center">
            ✅ Data keuangan telah tersimpan. Lihat grafik analisis dan health
            score di bawah!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
      {/* Floating Save Button (appears when there are changes) */}
      {hasChanges && showForm && (
        <button
          onClick={handleQuickSave}
          disabled={isSaving}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40 flex items-center space-x-2"
          title="Simpan Perubahan"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              <Save className="w-6 h-6" />
              <span className="hidden sm:block">Simpan</span>
            </>
          )}
        </button>
      )}

      {/* Success Notification */}
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Data berhasil disimpan!
        </div>
      )}

      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-[#2196F3] mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Input Data Keuangan
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveAndAnalyze();
        }}
        className="space-y-8"
      >
        {/* Pendapatan & Pengeluaran 5 Bulan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Pendapatan & Pengeluaran (5 Bulan Terakhir)
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((month) => (
              <div key={month} className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 text-center">
                  Bulan {month}
                  {month === 5 && <span className="text-red-500 ml-1">*</span>}
                </h4>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Pendapatan
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatCurrency(formData[`revenue_month${month}`])}
                      onChange={(e) =>
                        handleInputChange(
                          `revenue_month${month}`,
                          e.target.value,
                        )
                      }
                      placeholder="15.000.000"
                      className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                      required={month === 5}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Pengeluaran
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-2 text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formatCurrency(formData[`expense_month${month}`])}
                      onChange={(e) =>
                        handleInputChange(
                          `expense_month${month}`,
                          e.target.value,
                        )
                      }
                      placeholder="12.000.000"
                      className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                      required={month === 5}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown Pengeluaran */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 text-orange-600 mr-2" />
            Detail Pengeluaran (Bulan Terakhir)
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bahan Baku/Produk
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.raw_materials)}
                  onChange={(e) =>
                    handleInputChange("raw_materials", e.target.value)
                  }
                  placeholder="8.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gaji Karyawan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.salary)}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="3.500.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biaya Operasional
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.operational)}
                  onChange={(e) =>
                    handleInputChange("operational", e.target.value)
                  }
                  placeholder="2.800.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listrik & Air
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.utilities)}
                  onChange={(e) =>
                    handleInputChange("utilities", e.target.value)
                  }
                  placeholder="620.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportasi
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.transportation)}
                  onChange={(e) =>
                    handleInputChange("transportation", e.target.value)
                  }
                  placeholder="1.100.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lain-lain
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.other_expenses)}
                  onChange={(e) =>
                    handleInputChange("other_expenses", e.target.value)
                  }
                  placeholder="750.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Arus Kas & Posisi Keuangan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            Arus Kas & Posisi Keuangan
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saldo Kas Saat Ini <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.cash_balance)}
                  onChange={(e) =>
                    handleInputChange("cash_balance", e.target.value)
                  }
                  placeholder="5.200.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Piutang Usaha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.accounts_receivable)}
                  onChange={(e) =>
                    handleInputChange("accounts_receivable", e.target.value)
                  }
                  placeholder="3.500.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nilai Persediaan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.inventory)}
                  onChange={(e) =>
                    handleInputChange("inventory", e.target.value)
                  }
                  placeholder="8.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hutang Usaha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.accounts_payable)}
                  onChange={(e) =>
                    handleInputChange("accounts_payable", e.target.value)
                  }
                  placeholder="2.500.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pinjaman Bank
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.bank_loans)}
                  onChange={(e) =>
                    handleInputChange("bank_loans", e.target.value)
                  }
                  placeholder="8.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Awal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                <input
                  type="text"
                  value={formatCurrency(formData.initial_capital)}
                  onChange={(e) =>
                    handleInputChange("initial_capital", e.target.value)
                  }
                  placeholder="20.000.000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Bisnis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Info Bisnis
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Karyawan
              </label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => handleInputChange("employees", e.target.value)}
                placeholder="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Umur Bisnis (Bulan)
              </label>
              <input
                type="number"
                value={formData.business_age_months}
                onChange={(e) =>
                  handleInputChange("business_age_months", e.target.value)
                }
                placeholder="24"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            💡 Tips Mengisi Data:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>Minimal isi:</strong> Pendapatan & pengeluaran bulan
              terakhir + saldo kas
            </li>
            <li>
              • <strong>Untuk analisis terbaik:</strong> Isi data 5 bulan
              terakhir
            </li>
            <li>
              • <strong>Format angka:</strong> Masukkan angka biasa (contoh:
              5000000 untuk 5 juta)
            </li>
            <li>
              • <strong>Data akan otomatis:</strong> Generate grafik + analisis
              + health score
            </li>
          </ul>
        </div>

        {/* Submit Buttons Section */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          {/* Progress Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm">
              <div
                className={`w-3 h-3 rounded-full ${isComplete ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span
                className={
                  isComplete ? "text-green-600 font-medium" : "text-gray-500"
                }
              >
                {isComplete
                  ? "Data minimum telah terpenuhi"
                  : "Isi data minimum untuk melanjutkan"}
              </span>
            </div>
          </div>

          {/* Main Submit Button */}
          <button
            type="submit"
            disabled={!isComplete || isSaving}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
              isComplete
                ? "bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Menyimpan Data...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Simpan Data & Lihat Analisis Lengkap</span>
              </>
            )}
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleQuickSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                hasChanges && !isSaving
                  ? "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              <span>Simpan Sementara</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Yakin ingin mereset semua data? Data yang belum disimpan akan hilang.",
                  )
                ) {
                  setFormData({
                    revenue_month1: "",
                    revenue_month2: "",
                    revenue_month3: "",
                    revenue_month4: "",
                    revenue_month5: "",
                    expense_month1: "",
                    expense_month2: "",
                    expense_month3: "",
                    expense_month4: "",
                    expense_month5: "",
                    raw_materials: "",
                    salary: "",
                    operational: "",
                    utilities: "",
                    transportation: "",
                    other_expenses: "",
                    cash_sales: "",
                    credit_sales: "",
                    accounts_receivable: "",
                    inventory: "",
                    cash_balance: "",
                    accounts_payable: "",
                    bank_loans: "",
                    initial_capital: "",
                    employees: "",
                    business_age_months: "",
                  });
                  setIsComplete(false);
                  setHasChanges(false);
                }
              }}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <span>Reset Form</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
