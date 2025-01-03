import datetime
from flask import Blueprint, request, jsonify
from dateutil.parser import parse as parse_date
from app.utils.db_utils import execute_query

# Create the recycling blueprint
recycling_bp = Blueprint('recycling', __name__)

@recycling_bp.route('/recycling-collection', methods=['POST'])
def recycling_collection():
    data = request.get_json()
        # Set a default user_id of 2
    user_id = data.get('userId') 
    # Check if 'collectionDate' is provided and valid
    collection_date = data.get('collectionDate')
    if collection_date:
        try:
            # Parse the ISO 8601 date and format it to 'YYYY-MM-DD'
            collection_date = parse_date(collection_date).strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Invalid date format for collectionDate"}), 400
    else:
        return jsonify({"error": "'collectionDate' is required"}), 400
    food_waste_weight = data.get('foodWasteWeight')
    aluminum_weight = data.get('aluminumWeight')
    cardboard_weight = data.get('cardboardWeight')
    glass_weight = data.get('glassWeight')
    metal_weight = data.get('metalWeight')
    metal_subcategory = data.get('metalSubcategory')
    paper_weight = data.get('paperWeight')
    paper_subcategory = data.get('paperSubcategory')
    plastic_weight = data.get('plasticWeight')
    plastic_subcategory = data.get('plasticSubcategory')

    # Insert data into `recycling_collection` table
    query = """
        INSERT INTO recycling_collection (
            user_id,collection_date, food_waste_weight, aluminum_weight, cardboard_weight, 
            glass_weight, metal_weight, metal_subcategory, paper_weight, 
            paper_subcategory, plastic_weight, plastic_subcategory
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    params = (
        user_id,collection_date, food_waste_weight, aluminum_weight, cardboard_weight,
        glass_weight, metal_weight, metal_subcategory, paper_weight,
        paper_subcategory, plastic_weight, plastic_subcategory
    )
    
    result = execute_query(query, params)
    if result:
        return jsonify({"message": "Recycling collection data saved successfully"}), 201
    return jsonify({"error": "Failed to save recycling collection data"}), 500

@recycling_bp.route('/recycling-revenue', methods=['POST'])
def recycling_revenue():
    data = request.get_json()
    user_id = data.get('userId')   # Set user ID; adjust as needed

    # Extracting values from the incoming JSON data
    sale_date = data.get('saleDate')            # Sale Date
    if sale_date:
        try:
            # Parse the ISO 8601 date and format it to 'YYYY-MM-DD'
            sale_date = parse_date(sale_date).strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Invalid date format for sale_date"}), 400
    else:
        return jsonify({"error": "'sale_date' is required"}), 400
    
    material_type = data.get('materialType')    # Material Type
    revenue_amount = data.get('revenueAmount')  # Revenue Amount
    buyer = data.get('buyer')
    weight = data.get('weight')                 # Weight

    # Validate weight to ensure it is not negative
    if weight is None:
        return jsonify({"error": "'weight' is required"}), 400
    if weight < 0:
        return jsonify({"error": "'weight' cannot be negative"}), 400                    # Buyer
    

    # Insert data into `recycling_revenue` table
    query = """
        INSERT INTO recycling_revenue (
            user_id, sale_date, material_type, revenue_amount, buyer,weight
        )
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (user_id, sale_date, material_type, revenue_amount, buyer,weight)
    
    result = execute_query(query, params)  # Execute the query with parameters
    if result:
        return jsonify({"message": "Recycling revenue data saved successfully"}), 201
    return jsonify({"error": "Failed to save recycling revenue data"}), 500


@recycling_bp.route('/landfill-expense', methods=['POST'])
def landfill_expense():
    data = request.get_json()
    user_id = data.get('userId') # Set user ID; adjust as needed

    # Extracting values from the incoming JSON data
    landfill_date = data.get('landfillDate')  # Landfill Date
    if landfill_date:
        try:
            # Parse the ISO 8601 date and format it to 'YYYY-MM-DD'
            landfill_date = parse_date(landfill_date).strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Invalid date format for landfill_date"}), 400
    else:
        return jsonify({"error": "'landfill_date' is required"}), 400
    weight = data.get('weight')  # Weight in lbs.
    expense_amount = data.get('expenseAmount')  # Expense amount
    landfill_hauler = data.get('landfillHauler')  # Company name


    # Insert data into `landfill_expense` table
    query = """
        INSERT INTO landfill_expense (
            user_id, landfill_date, weight, expense_amount, landfill_hauler
        )
        VALUES (%s, %s, %s, %s, %s)
    """
    params = (user_id, landfill_date, weight, expense_amount, landfill_hauler)
    
    result = execute_query(query, params)  # Execute the query with parameters
    if result:
        return jsonify({"message": "Landfill expense data saved successfully"}), 201
    return jsonify({"error": "Failed to save landfill expense data"}), 500


@recycling_bp.route('/recycling-collection', methods=['GET'])
def get_recycling_collection():
    # Query to retrieve all data from `recycling_collection` table, including the `id` column
    query = """
        SELECT id, user_id, collection_date, food_waste_weight, aluminum_weight, cardboard_weight, 
               glass_weight, metal_weight, metal_subcategory, paper_weight, 
               paper_subcategory, plastic_weight, plastic_subcategory
        FROM recycling_collection
    """
    result = execute_query(query)
    if result:
        # Format result to include column names
        data = [
            {
                "id": row[0],
                "user_id": row[1],
                "collection_date": row[2],
                "food_waste_weight": row[3],
                "aluminum_weight": row[4],
                "cardboard_weight": row[5],
                "glass_weight": row[6],
                "metal_weight": row[7],
                "metal_subcategory": row[8],
                "paper_weight": row[9],
                "paper_subcategory": row[10],
                "plastic_weight": row[11],
                "plastic_subcategory": row[12]
            }
            for row in result
        ]
        return jsonify({"data": data}), 200
    return jsonify({"error": "Failed to fetch recycling collection data"}), 500


@recycling_bp.route('/recycling-revenue', methods=['GET'])
def get_recycling_revenue():
    # Query to retrieve all data from `recycling_revenue` table, including the `id` column
    query = """
        SELECT id, user_id, sale_date, material_type, revenue_amount, buyer, weight
        FROM recycling_revenue
    """
    result = execute_query(query)
    if result:
        # Format result to include column names
        data = [
            {
                "id": row[0],
                "user_id": row[1],
                "sale_date": row[2],
                "material_type": row[3],
                "revenue_amount": row[4],
                "buyer": row[5],
                "weight": row[6]
            }
            for row in result
        ]
        return jsonify({"data": data}), 200
    return jsonify({"error": "Failed to fetch recycling revenue data"}), 500


@recycling_bp.route('/landfill-expense', methods=['GET'])
def get_landfill_expense():
    # Query to retrieve all data from `landfill_expense` table, including the `id` column
    query = """
        SELECT id, user_id, landfill_date, weight, expense_amount, landfill_hauler
        FROM landfill_expense
    """
    result = execute_query(query)
    if result:
        # Format result to include column names
        data = [
            {
                "id": row[0],
                "user_id": row[1],
                "landfill_date": row[2],
                "weight": row[3],
                "expense_amount": row[4],
                "landfill_hauler": row[5]
            }
            for row in result
        ]
        return jsonify({"data": data}), 200
    return jsonify({"error": "Failed to fetch landfill expense data"}), 500


@recycling_bp.route('/recycling-collection/<int:id>', methods=['DELETE'])
def delete_recycling_collection(id):
    # Query to delete a record from `recycling_collection` table by id
    query = "DELETE FROM recycling_collection WHERE id = %s"
    result = execute_query(query, (id,))
    if result:
        return jsonify({"message": f"Recycling collection with id {id} deleted successfully"}), 200
    return jsonify({"error": "Failed to delete recycling collection data"}), 500


@recycling_bp.route('/recycling-revenue/<int:id>', methods=['DELETE'])
def delete_recycling_revenue(id):
    # Query to delete a record from `recycling_revenue` table by id
    query = "DELETE FROM recycling_revenue WHERE id = %s"
    result = execute_query(query, (id,))
    if result:
        return jsonify({"message": f"Recycling revenue with id {id} deleted successfully"}), 200
    return jsonify({"error": "Failed to delete recycling revenue data"}), 500


@recycling_bp.route('/landfill-expense/<int:id>', methods=['DELETE'])
def delete_landfill_expense(id):
    # Query to delete a record from `landfill_expense` table by id
    query = "DELETE FROM landfill_expense WHERE id = %s"
    result = execute_query(query, (id,))
    if result:
        return jsonify({"message": f"Landfill expense with id {id} deleted successfully"}), 200
    return jsonify({"error": "Failed to delete landfill expense data"}), 500
