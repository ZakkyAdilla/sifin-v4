import { Coffee, ShoppingCart, FileText, Wrench, Monitor } from "lucide-react";

export const industryTemplates = [
  {
    id: "fnb",
    name: "F&B / Restoran",
    icon: Coffee,
    description: "Template untuk restoran, cafe, katering",
    sample_capex: [
      { name: "Peralatan Dapur", amount: 50000000, category: "equipment" },
      {
        name: "Furniture & Interior",
        amount: 30000000,
        category: "furniture",
      },
      { name: "POS System", amount: 5000000, category: "technology" },
    ],
    sample_opex: [
      {
        name: "Bahan Baku",
        amount: 15000000,
        category: "cogs",
        frequency: "monthly",
      },
      {
        name: "Gaji Staff",
        amount: 8000000,
        category: "salary",
        frequency: "monthly",
      },
      {
        name: "Sewa Tempat",
        amount: 12000000,
        category: "rent",
        frequency: "monthly",
      },
    ],
    sample_products: [
      {
        name: "Nasi Ayam",
        selling_price: 25000,
        cogs: 12000,
        variable_cost: 2000,
      },
      {
        name: "Kopi Latte",
        selling_price: 18000,
        cogs: 8000,
        variable_cost: 1500,
      },
    ],
  },
  {
    id: "retail",
    name: "Retail / Toko",
    icon: ShoppingCart,
    description: "Template untuk toko, minimarket, fashion",
    sample_capex: [
      { name: "Rak & Display", amount: 25000000, category: "furniture" },
      { name: "Cash Register", amount: 8000000, category: "technology" },
      { name: "Renovasi Toko", amount: 40000000, category: "renovation" },
    ],
    sample_opex: [
      {
        name: "Inventory",
        amount: 50000000,
        category: "cogs",
        frequency: "monthly",
      },
      {
        name: "Gaji Kasir",
        amount: 6000000,
        category: "salary",
        frequency: "monthly",
      },
      {
        name: "Sewa Toko",
        amount: 10000000,
        category: "rent",
        frequency: "monthly",
      },
    ],
    sample_products: [
      {
        name: "Baju Kemeja",
        selling_price: 150000,
        cogs: 75000,
        variable_cost: 5000,
      },
      {
        name: "Celana Jeans",
        selling_price: 250000,
        cogs: 125000,
        variable_cost: 7500,
      },
    ],
  },
  {
    id: "services",
    name: "Jasa / Konsultan",
    icon: FileText,
    description: "Template untuk jasa profesional, konsultan",
    sample_capex: [
      { name: "Komputer & Laptop", amount: 20000000, category: "technology" },
      { name: "Software License", amount: 10000000, category: "software" },
      { name: "Office Furniture", amount: 15000000, category: "furniture" },
    ],
    sample_opex: [
      {
        name: "Gaji Konsultan",
        amount: 15000000,
        category: "salary",
        frequency: "monthly",
      },
      {
        name: "Sewa Office",
        amount: 8000000,
        category: "rent",
        frequency: "monthly",
      },
      {
        name: "Marketing",
        amount: 5000000,
        category: "marketing",
        frequency: "monthly",
      },
    ],
    sample_products: [
      {
        name: "Konsultasi Strategy",
        selling_price: 2000000,
        cogs: 500000,
        variable_cost: 100000,
      },
      {
        name: "Training Workshop",
        selling_price: 5000000,
        cogs: 1000000,
        variable_cost: 200000,
      },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufaktur Ringan",
    icon: Wrench,
    description: "Template untuk produksi skala kecil-menengah",
    sample_capex: [
      { name: "Mesin Produksi", amount: 100000000, category: "machinery" },
      {
        name: "Warehouse Setup",
        amount: 30000000,
        category: "infrastructure",
      },
      {
        name: "Quality Control Tools",
        amount: 15000000,
        category: "equipment",
      },
    ],
    sample_opex: [
      {
        name: "Raw Materials",
        amount: 25000000,
        category: "cogs",
        frequency: "monthly",
      },
      {
        name: "Worker Salary",
        amount: 20000000,
        category: "salary",
        frequency: "monthly",
      },
      {
        name: "Utilities",
        amount: 8000000,
        category: "utilities",
        frequency: "monthly",
      },
    ],
    sample_products: [
      {
        name: "Sabun Cuci",
        selling_price: 15000,
        cogs: 8000,
        variable_cost: 1000,
      },
      {
        name: "Deterjen Bubuk",
        selling_price: 25000,
        cogs: 12000,
        variable_cost: 1500,
      },
    ],
  },
  {
    id: "online",
    name: "Online Shop / E-commerce",
    icon: Monitor,
    description: "Template untuk toko online, marketplace",
    sample_capex: [
      {
        name: "Website Development",
        amount: 15000000,
        category: "technology",
      },
      {
        name: "Packaging Equipment",
        amount: 10000000,
        category: "equipment",
      },
      { name: "Photography Setup", amount: 8000000, category: "marketing" },
    ],
    sample_opex: [
      {
        name: "Product Purchase",
        amount: 30000000,
        category: "cogs",
        frequency: "monthly",
      },
      {
        name: "Marketing Ads",
        amount: 8000000,
        category: "marketing",
        frequency: "monthly",
      },
      {
        name: "Shipping & Packaging",
        amount: 5000000,
        category: "logistics",
        frequency: "monthly",
      },
    ],
    sample_products: [
      {
        name: "Tas Laptop",
        selling_price: 120000,
        cogs: 60000,
        variable_cost: 8000,
      },
      {
        name: "Power Bank",
        selling_price: 85000,
        cogs: 45000,
        variable_cost: 5000,
      },
    ],
  },
];
