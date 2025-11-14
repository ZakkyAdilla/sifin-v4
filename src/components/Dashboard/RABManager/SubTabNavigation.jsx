import { Calculator, Download, Building, Target } from "lucide-react";

const subTabs = [
  { id: "template-selection", label: "Template Industri", icon: Building },
  { id: "capex-opex", label: "CAPEX & OPEX", icon: Calculator },
  { id: "unit-economics", label: "Unit Economics", icon: Target },
  { id: "export", label: "Export & Summary", icon: Download },
];

export function SubTabNavigation({ activeSubTab, onTabChange }) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      {subTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
  );
}
