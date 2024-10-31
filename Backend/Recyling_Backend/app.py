# app.py
from flask import Flask
from app.routes.user_routes import user_bp
from app.routes.recycling_collection_router import recycling_bp  # Import the new recycling blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(user_bp)
app.register_blueprint(recycling_bp)  # Register the recycling collection blueprint

if __name__ == '__main__':
    app.run(debug=True)



# -- Table for Recycling Collection
# CREATE TABLE recycling_collection (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     collection_date DATE,
#     food_waste_weight DECIMAL,
#     aluminum_weight DECIMAL,
#     plastic_weight DECIMAL,
#     glass_weight DECIMAL,
#     other_waste_weight DECIMAL
# );

# -- Table for Recycling Revenue
# -- Table for Recycling Revenue
# CREATE TABLE recycling_revenue (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     revenue_date DATE,
#     sales_amount DECIMAL,
#     materials_sold VARCHAR(255),
#     buyer VARCHAR(255),
#     material_type VARCHAR(255), -- Added subcategory for material type
#     sale_date DATE               -- Added sale_date field
# );


# -- Table for Landfill Expense
# CREATE TABLE landfill_expense (
#     id SERIAL PRIMARY KEY,
#     user_id INT NOT NULL,
#     landfill_date DATE,             -- Changed from expense_date to landfill_date
#     weight DECIMAL,                 -- Added weight column for weight in lbs.
#     expense_amount DECIMAL,         -- Changed from expense_amount to expense for the amount in US$
#     landfill_hauler VARCHAR(255)    -- Changed from landfill_location to landfill/hauler for company name
# );

