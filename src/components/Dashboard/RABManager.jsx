"use client";
import { useState } from "react";
import { industryTemplates } from "@/utils/rabTemplates";
import { useRABProject } from "@/hooks/useRABProject";
import { SubTabNavigation } from "./RABManager/SubTabNavigation";
import { TemplateSelection } from "./RABManager/TemplateSelection";
import { CapexOpexTab } from "./RABManager/CapexOpexTab";
import { UnitEconomicsTab } from "./RABManager/UnitEconomicsTab";
import { ExportTab } from "./RABManager/ExportTab";

export function RABManager({ financialData }) {
  const [activeSubTab, setActiveSubTab] = useState("template-selection");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const {
    projectData,
    updateProjectInfo,
    updateTaxSettings,
    loadTemplate,
    loadSampleProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useRABProject();

  const handleSelectIndustry = (industryId) => {
    const template = industryTemplates.find((t) => t.id === industryId);
    if (template) {
      setSelectedIndustry(industryId);
      loadTemplate(template);
      setActiveSubTab("capex-opex");
    }
  };

  const handleLoadSampleProducts = () => {
    const template = industryTemplates.find((t) => t.id === selectedIndustry);
    loadSampleProducts(template);
  };

  return (
    <div className="space-y-6">
      <SubTabNavigation
        activeSubTab={activeSubTab}
        onTabChange={setActiveSubTab}
      />

      {activeSubTab === "template-selection" && (
        <TemplateSelection
          templates={industryTemplates}
          selectedIndustry={selectedIndustry}
          onSelectIndustry={handleSelectIndustry}
        />
      )}

      {activeSubTab === "capex-opex" && (
        <CapexOpexTab
          projectData={projectData}
          onUpdateProjectInfo={updateProjectInfo}
        />
      )}

      {activeSubTab === "unit-economics" && (
        <UnitEconomicsTab
          projectData={projectData}
          onUpdateTaxSettings={updateTaxSettings}
          onLoadSampleProducts={handleLoadSampleProducts}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
        />
      )}

      {activeSubTab === "export" && <ExportTab projectData={projectData} />}
    </div>
  );
}
