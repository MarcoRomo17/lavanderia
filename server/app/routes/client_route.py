from flask import jsonify, request, Blueprint
from app.controllers.client_controller import create_client, search_client_by_name, search_client_by_phone, update_client, delete_client, search_clients

client_bp= Blueprint("client_bp", __name__, url_prefix="/clientes")

@client_bp.route("/create", methods=['POST'])
def create():
    data = request.json
    name = data.get("name")
    phone_number = data.get("phone_number")
    address = data.get("address")
    
    if not name or not phone_number or not address:
        return jsonify({"error":"Los datos basicos de un cliente son obligatorios"}), 400
    
    client= create_client(name, phone_number, address)
    return jsonify({
        "msg":"Cliente creado con exito",
        "client": client.to_dict()
                }),200


@client_bp.route("/search/name", methods=['GET'])
def search_by_name():
    name= request.args.get("name")#para acceder a los argumentos de las peticiones. a los querys
    clients = search_client_by_name(name)

    #creamos arreglos de respuestas
    #Fea pero entencible
    #data=[]
    #for client in clients:
    #data.append(client.to_dict())
        
    data=[client.to_dict() for client in clients]# dentro del arreglohacemos el ciclo. Es un ciclo generativo
    #es la manera fancy de hacerla. COmo tal es lo que se hace en el ciclo y ya pues despues el ciclo
    return jsonify(data),200

@client_bp.route("/search/phone", methods=['GET'])
def search_by_phone():
    phone = request.args.get("phone")
    client = search_client_by_phone(phone)

    if not client:
        return jsonify({"error":"Cliente no encontrado pipi"}), 400
    
    return jsonify(client.to_dict()),200


@client_bp.route("/search", methods=["GET"])
def search():
    parameter = request.args.get("parameter")
    filter = request.args.get("filter")
    clients=[]
    if filter and parameter:
        if filter=="name":
            clients = search_client_by_name(parameter)
        elif filter =="phone":
            clients = search_client_by_name(parameter)
        else:
            return jsonify({"msg":"Filtro desconocido"}), 400
    else:
        clients= search_clients()
    return [client.to_dict() for client in clients]




@client_bp.route("/update/<int:client_id>", methods=['PUT'])
def update(client_id):
    data=request.json
    client= update_client(client_id, data)
    if not client:
        return jsonify({"error":"Cliente no encontrado"}),400
    return jsonify({"msg":"Cliente actualizado con exito"}),200

#ELIMNAR
@client_bp.route("/delete/<int:client_id>", methods=['DELETE'])
def delete(client_id):
    client= delete_client(client_id)
    if not client:
        return jsonify({"error":"Cliente no encontrado"}),400
    return jsonify({"msg":"Cliente eliminado con exito"}),200
