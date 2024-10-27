from flask import Blueprint, request, jsonify
from app import db  # Ensure you import your db instance
from app.models.recycling_collection import RecyclingCollection

recycling_bp = Blueprint('recycling_collection', __name__)

@recycling_bp.route('/submit-recycling-collection', methods=['POST'])
def submit_recycling_collection():
    data = request.get_json()

    # Extract data from the request
    collection_date = data.get('collectionDate')
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

    # Create a new recycling collection record
    new_collection = RecyclingCollection(
        collection_date=collection_date,
        food_waste_weight=food_waste_weight,
        aluminum_weight=aluminum_weight,
        cardboard_weight=cardboard_weight,
        glass_weight=glass_weight,
        metal_weight=metal_weight,
        metal_subcategory=metal_subcategory,
        paper_weight=paper_weight,
        paper_subcategory=paper_subcategory,
        plastic_weight=plastic_weight,
        plastic_subcategory=plastic_subcategory
    )

    db.session.add(new_collection)
    db.session.commit()

    return jsonify({"message": "Recycling collection submitted successfully!"}), 201
