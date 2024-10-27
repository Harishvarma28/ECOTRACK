# models/recycling_collection.py

from app import db

class RecyclingCollection(db.Model):
    __tablename__ = 'recycling_collection'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    collection_date = db.Column(db.Date, nullable=False)
    food_waste_weight = db.Column(db.Numeric(10, 2))
    aluminum_weight = db.Column(db.Numeric(10, 2))
    cardboard_weight = db.Column(db.Numeric(10, 2))
    glass_weight = db.Column(db.Numeric(10, 2))
    metal_weight = db.Column(db.Numeric(10, 2))
    metal_subcategory = db.Column(db.String(50))
    paper_weight = db.Column(db.Numeric(10, 2))
    paper_subcategory = db.Column(db.String(50))
    plastic_weight = db.Column(db.Numeric(10, 2))
    plastic_subcategory = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<RecyclingCollection {self.id}>'
