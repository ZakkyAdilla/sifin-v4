export function TemplateSelection({
  templates,
  selectedIndustry,
  onSelectIndustry,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Pilih Template RAB per Industri
        </h3>
        <p className="text-gray-600">
          Mulai dengan template yang sudah disesuaikan untuk industri Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              onClick={() => onSelectIndustry(template.id)}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedIndustry === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {template.name}
                  </h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500">
                  SAMPLE ITEMS:
                </div>
                <div className="text-xs text-gray-600">
                  CAPEX: {template.sample_capex.length} items
                </div>
                <div className="text-xs text-gray-600">
                  OPEX: {template.sample_opex.length} items/bulan
                </div>
              </div>

              {selectedIndustry === template.id && (
                <div className="mt-4 p-3 bg-blue-100 rounded-md">
                  <p className="text-sm font-medium text-blue-800">
                    ✅ Template Dipilih
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedIndustry && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 font-medium">
            🎉 Template berhasil dipilih! Klik tab "CAPEX & OPEX" untuk mulai
            mengedit RAB Anda.
          </p>
        </div>
      )}
    </div>
  );
}
