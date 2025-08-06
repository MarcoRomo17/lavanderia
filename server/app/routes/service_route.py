from flask import jsonify, request, Blueprint
from app.controllers.service_controller import create_service, update_service, get_services, delete_service

service_bp= Blueprint("service_bp", __name__, url_prefix="/services")

@service_bp.route("/create", methods=['POST'])
def create():
    data = request.json
    service= create_service(data["name"], data["description"], data["price"])
    return jsonify({"msg":"Prenda registrada"}), 200
    
  
@service_bp.route("/get-all", methods=['GET'])
def get_all():
    service= get_services()
    return jsonify({"msg":"Se encontro algo", "Lo encontrado":service}), 200

@service_bp.route("/update/<int:service_id>", methods=['PUT'])
def update(service_id):
    data = request.json
    service= update_service(service_id,data)
    return jsonify({"msg":"Prenda actualizada"}), 200


@service_bp.route("/delete/<int:service_id>", methods=['DELETE'])
def delete(service_id):
    delete_service(service_id)
    return jsonify({"msg":"Prenda eliminada"}), 200
   