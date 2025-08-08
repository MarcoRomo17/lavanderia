from flask import jsonify, request, Blueprint
from app.controllers.garment_controller import create_garment, get_garment, get_garments, delete_garment, update_garment

garment_bp= Blueprint("garment_bp", __name__, url_prefix="/garment")

@garment_bp.route("/create", methods=['POST'])
def create():
    data = request.json
    garment= create_garment(data["type"], data["description"], data["observations"])
    return jsonify({"msg":"Prenda registrada"}), 200
    
  
@garment_bp.route("/get-all", methods=['GET'])
def get_all():
    garment= get_garments()
    return jsonify({"msg":"Se encontro algo", "garments":garment}), 200

@garment_bp.route("/update/<int:garment_id>", methods=['PUT'])
def update(garment_id):
    data = request.json
    garment= update_garment(garment_id,data)
    return jsonify({"msg":"Prenda actualizada"}), 200


@garment_bp.route("/delete/<int:garment_id>", methods=['DELETE'])
def delete(garment_id):
    delete_garment(garment_id)
    return jsonify({"msg":"Prenda eliminada"}), 200
   