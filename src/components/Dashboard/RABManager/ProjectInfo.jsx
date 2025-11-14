export function ProjectInfo({ projectData, onUpdate }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Informasi Proyek
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Proyek
          </label>
          <input
            type="text"
            value={projectData.project_name}
            onChange={(e) => onUpdate("project_name", e.target.value)}
            placeholder="Contoh: Buka Cafe di Kemang"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi Proyek (Bulan)
          </label>
          <input
            type="number"
            value={projectData.project_duration}
            onChange={(e) =>
              onUpdate("project_duration", parseInt(e.target.value) || 12)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Mulai
          </label>
          <input
            type="date"
            value={projectData.start_date}
            onChange={(e) => onUpdate("start_date", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
