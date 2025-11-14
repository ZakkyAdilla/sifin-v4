import { useState } from "react";

export function useRABProject() {
  const [projectData, setProjectData] = useState({
    project_name: "",
    project_duration: 12,
    start_date: "",
    industry: "",
    capex_items: [],
    opex_items: [],
    unit_economics: [],
    tax_settings: {
      include_ppn: true,
      ppn_rate: 11,
      pph_rate: 0.5,
      is_umkm: true,
    },
  });

  const updateProjectInfo = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTaxSettings = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      tax_settings: {
        ...prev.tax_settings,
        [field]: value,
      },
    }));
  };

  const loadTemplate = (template) => {
    setProjectData((prev) => ({
      ...prev,
      industry: template.id,
      capex_items: template.sample_capex.map((item, index) => ({
        ...item,
        id: `capex_${index}`,
        description: "",
      })),
      opex_items: template.sample_opex.map((item, index) => ({
        ...item,
        id: `opex_${index}`,
        description: "",
      })),
    }));
  };

  const loadSampleProducts = (template) => {
    if (template && template.sample_products) {
      setProjectData((prev) => ({
        ...prev,
        unit_economics: template.sample_products.map((product, index) => ({
          ...product,
          id: `product_${index}`,
          monthly_volume: 100,
        })),
      }));
    }
  };

  const addCapexItem = () => {
    setProjectData((prev) => ({
      ...prev,
      capex_items: [
        ...prev.capex_items,
        {
          id: `capex_${prev.capex_items.length}`,
          name: "",
          amount: 0,
          category: "equipment",
          description: "",
        },
      ],
    }));
  };

  const addOpexItem = () => {
    setProjectData((prev) => ({
      ...prev,
      opex_items: [
        ...prev.opex_items,
        {
          id: `opex_${prev.opex_items.length}`,
          name: "",
          amount: 0,
          category: "cogs",
          frequency: "monthly",
          description: "",
        },
      ],
    }));
  };

  const addProduct = () => {
    setProjectData((prev) => ({
      ...prev,
      unit_economics: [
        ...prev.unit_economics,
        {
          id: `product_${prev.unit_economics.length}`,
          name: "",
          selling_price: 0,
          cogs: 0,
          variable_cost: 0,
          monthly_volume: 0,
        },
      ],
    }));
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...projectData.unit_economics];
    updatedProducts[index][field] = value;
    setProjectData((prev) => ({
      ...prev,
      unit_economics: updatedProducts,
    }));
  };

  const deleteProduct = (index) => {
    const updatedProducts = projectData.unit_economics.filter(
      (_, i) => i !== index,
    );
    setProjectData((prev) => ({
      ...prev,
      unit_economics: updatedProducts,
    }));
  };

  return {
    projectData,
    updateProjectInfo,
    updateTaxSettings,
    loadTemplate,
    loadSampleProducts,
    addCapexItem,
    addOpexItem,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
