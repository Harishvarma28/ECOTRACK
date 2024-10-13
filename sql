create database recycle;
use recycle;
CREATE TABLE recycling_collection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    collection_date DATE NOT NULL,
    food_waste_weight DECIMAL(10,2),
    aluminum_weight DECIMAL(10,2),
    cardboard_weight DECIMAL(10,2),
    glass_weight DECIMAL(10,2),
    metal_cans_weight DECIMAL(10,2),
    metal_scrap_weight DECIMAL(10,2),
    paper_books_weight DECIMAL(10,2),
    paper_mixed_weight DECIMAL(10,2),
    paper_newspaper_weight DECIMAL(10,2),
    paper_white_weight DECIMAL(10,2),
    plastic_pet_weight DECIMAL(10,2),
    plastic_hdpe_colored_weight DECIMAL(10,2),
    plastic_hdpe_natural_weight DECIMAL(10,2)
);
CREATE TABLE recycling_revenue_sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sale_date DATE NOT NULL,
    material_type VARCHAR(50) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    revenue DECIMAL(10,2) NOT NULL,
    buyer_company VARCHAR(100) NOT NULL
);
CREATE TABLE landfill_expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    landfill_date DATE NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    expense DECIMAL(10,2) NOT NULL,
    hauler_company VARCHAR(100) NOT NULL
);
CREATE TABLE user_credentials (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., 'Admin', 'DataEntry', 'ReportRunner'
    permissions TEXT -- e.g., 'Recycle Material Set-up', 'Running Reports'
);