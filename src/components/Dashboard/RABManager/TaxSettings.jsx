export function TaxSettings({ taxSettings, onUpdate }) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-3">Pengaturan Pajak</h4>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={taxSettings.include_ppn}
            onChange={(e) => onUpdate("include_ppn", e.target.checked)}
            className="rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Include PPN
          </label>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            PPN Rate (%)
          </label>
          <input
            type="number"
            value={taxSettings.ppn_rate}
            onChange={(e) =>
              onUpdate("ppn_rate", parseFloat(e.target.value) || 11)
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={taxSettings.is_umkm}
            onChange={(e) => onUpdate("is_umkm", e.target.checked)}
            className="rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            UMKM (PPh Final 0.5%)
          </label>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            PPh Rate (%)
          </label>
          <input
            type="number"
            value={taxSettings.pph_rate}
            onChange={(e) =>
              onUpdate("pph_rate", parseFloat(e.target.value) || 0.5)
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}
