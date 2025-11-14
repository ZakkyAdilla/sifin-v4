"use client";
import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  CreditCard,
  Receipt,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Plus,
  Send,
  Eye,
  MoreHorizontal,
  X,
  Save,
  Edit,
  Trash2,
} from "lucide-react";

export function TransactionManager({ financialData }) {
  const [activeSubTab, setActiveSubTab] = useState("auto-categorization");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [invoiceStats, setInvoiceStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    amount: "",
    description: "",
    due_date: "",
    status: "draft",
  });

  const subTabs = [
    {
      id: "auto-categorization",
      label: "Auto Categorization",
      icon: Upload,
    },
    {
      id: "invoice-tracker",
      label: "Invoice & Payment",
      icon: Receipt,
    },
  ];

  // Fetch invoices from database
  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/invoices");
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setInvoices(data.invoices || []);
      setInvoiceStats(data.stats || {});
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === "invoice-tracker") {
      fetchInvoices();
    }
  }, [activeSubTab]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Here you would typically process the file and extract transactions
      // For demo purposes, we'll add some sample transactions
      const sampleTransactions = [
        {
          id: 1,
          date: "2024-11-01",
          description: "Penjualan Produk A",
          amount: 150000,
          type: "income",
          category: "Revenue",
          status: "categorized",
        },
        {
          id: 2,
          date: "2024-11-02",
          description: "Pembelian Bahan Baku",
          amount: -75000,
          type: "expense",
          category: "Cost of Goods",
          status: "categorized",
        },
        {
          id: 3,
          date: "2024-11-03",
          description: "Transfer ke Supplier",
          amount: -200000,
          type: "expense",
          category: "Uncategorized",
          status: "pending",
        },
      ];
      setTransactions(sampleTransactions);
    }
  };

  // Handle form submission for creating/editing invoices
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const url = editingInvoice
        ? `/api/invoices/${editingInvoice.id}`
        : "/api/invoices";
      const method = editingInvoice ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save invoice");
      }

      // Reset form and refresh data
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        amount: "",
        description: "",
        due_date: "",
        status: "draft",
      });
      setShowCreateForm(false);
      setEditingInvoice(null);

      // Refresh invoices list
      await fetchInvoices();
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (invoice, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === "paid"
          ? { payment_date: new Date().toISOString().split("T")[0] }
          : {}),
      };

      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Refresh invoices list
      await fetchInvoices();
    } catch (error) {
      console.error("Error updating invoice status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  // Handle edit invoice
  const handleEdit = (invoice) => {
    setFormData({
      customer_name: invoice.customer_name || "",
      customer_email: invoice.customer_email || "",
      customer_phone: invoice.customer_phone || "",
      amount: invoice.amount || "",
      description: invoice.description || "",
      due_date: invoice.due_date || "",
      status: invoice.status || "draft",
    });
    setEditingInvoice(invoice);
    setShowCreateForm(true);
  };

  // Handle delete invoice
  const handleDelete = async (invoice) => {
    if (!confirm(`Hapus invoice ${invoice.invoice_number}?`)) return;

    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete invoice");
      }

      await fetchInvoices();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      alert("Error deleting invoice. Please try again.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { bg: "bg-gray-100", text: "text-gray-800", label: "Draft" },
      sent: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Terkirim" },
      paid: { bg: "bg-green-100", text: "text-green-800", label: "Lunas" },
      overdue: { bg: "bg-red-100", text: "text-red-800", label: "Terlambat" },
      cancelled: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </div>
    );
  };

  const renderAutoCategorization = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Mutasi Rekening
          </h3>
          <p className="text-gray-600">
            Upload file CSV, Excel, atau PDF dari bank untuk kategorisasi
            otomatis transaksi
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-gray-900">
              Drag & drop file atau klik untuk upload
            </h4>
            <p className="text-gray-600">
              Mendukung format: CSV, Excel (.xlsx), PDF
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Pilih File</span>
            </label>
          </div>
        </div>

        {uploadedFile && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-green-600">
                  File berhasil diupload dan diproses!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transactions List */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Hasil Kategorisasi AI
              </h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <DollarSign className="w-5 h-5" />
                      ) : (
                        <CreditCard className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        Rp {formatCurrency(Math.abs(transaction.amount))}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "categorized"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status === "categorized"
                        ? "Terkategorisasi"
                        : "Perlu Review"}
                    </div>

                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInvoiceTracker = () => (
    <div className="space-y-6">
      {/* Create/Edit Invoice Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingInvoice ? "Edit Invoice" : "Buat Invoice Baru"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingInvoice(null);
                  setFormData({
                    customer_name: "",
                    customer_email: "",
                    customer_phone: "",
                    amount: "",
                    description: "",
                    due_date: "",
                    status: "draft",
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Customer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="PT. Contoh Indonesia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Customer
                </label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@contoh.co.id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telepon
                </label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="021-1234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah *
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Jasa konsultasi keuangan..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jatuh Tempo *
                </label>
                <input
                  type="date"
                  required
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Terkirim</option>
                  <option value="paid">Lunas</option>
                  <option value="overdue">Terlambat</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingInvoice(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingInvoice ? "Update" : "Simpan"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Manajemen Invoice
            </h3>
            <p className="text-gray-600">
              Buat dan kelola faktur digital untuk pelanggan Anda
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Invoice</span>
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Draft</h4>
                <p className="text-sm text-gray-500">Belum dikirim</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {invoiceStats.draft_count || 0}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Send className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terkirim</h4>
                <p className="text-sm text-gray-500">Menunggu pembayaran</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {invoiceStats.sent_count || 0}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terbayar</h4>
                <p className="text-sm text-gray-500">Lunas</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {invoiceStats.paid_count || 0}
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terlambat</h4>
                <p className="text-sm text-gray-500">Lewat jatuh tempo</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {invoiceStats.overdue_count || 0}
            </p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">Total Terbayar</h4>
            <p className="text-2xl font-bold text-green-600">
              Rp {formatCurrency(invoiceStats.total_paid || 0)}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Total Pending</h4>
            <p className="text-2xl font-bold text-yellow-600">
              Rp {formatCurrency(invoiceStats.total_pending || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Daftar Invoice
            </h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading invoices...</span>
            </div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Belum ada invoice. Buat invoice pertama Anda!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {invoice.invoice_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {invoice.customer_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        Rp {formatCurrency(invoice.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Jatuh tempo:{" "}
                        {new Date(invoice.due_date).toLocaleDateString("id-ID")}
                      </p>
                    </div>

                    {getStatusBadge(invoice.status)}

                    {/* Status Action Buttons */}
                    <div className="flex items-center space-x-1">
                      {invoice.status === "draft" && (
                        <button
                          onClick={() => handleStatusUpdate(invoice, "sent")}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          title="Kirim Invoice"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}

                      {(invoice.status === "sent" ||
                        invoice.status === "overdue") && (
                        <button
                          onClick={() => handleStatusUpdate(invoice, "paid")}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                          title="Tandai Lunas"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleEdit(invoice)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                        title="Edit Invoice"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(invoice)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Hapus Invoice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeSubTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab Content */}
      {activeSubTab === "auto-categorization" && renderAutoCategorization()}
      {activeSubTab === "invoice-tracker" && renderInvoiceTracker()}
    </div>
  );
}
