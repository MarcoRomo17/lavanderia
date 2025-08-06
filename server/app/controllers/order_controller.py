from app.database.db import db
from app.models.order import Order
from app.models.order_detail import OrderDetail
from app.models.garment import Garment
from app.models.service import Service
from app.models.client import Client
from app.models.user import User

def create_order(client_id, user_id, estimated_date, total_price):
    order= Order(client_id=client_id, user_id= user_id, estimated_delivery_date=estimated_date, total= total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_service(name, description, price):
    service=Service(name=name, description= description, price=price)
    db.session.add(service)
    db.session.commit()
    return service


def add_garment(type, description, notes):
    garment=Garment( type= type, description=description, observations= notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail(order_id,garment_id, service_id, quantity):
    order_detail= OrderDetail(order_id=order_id,garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail

def get_order_detail(order_id):
    #La busqueda debe de traer cliente, garment y cada uno debe de traer su propio servicio
    print("HOLA SOY el order_id: ", order_id)
    print(order_id, type(order_id)) 
    order= Order.query.get(order_id)

    print("HOLA SOY ORDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER", order.to_dict())

    order_data={
        "order_id":order.id,
        "client":order.client.name,
        "status":order.state,
        "garments":[]
    } 

    garments_from_OR = OrderDetail.query.filter_by(order_id=order.id)

    for garment in garments_from_OR:
        print("HOLA AMIGO TIENES UNA MONEDAS? GARMENTTTTTTTTTTTTTTTTT" , garment.to_dict())
        garment_Filtered= Garment.query.get(garment.id)
        garment_data = {
            "type":garment_Filtered.type,
            "description":garment_Filtered.description,
            "observations":garment_Filtered.observations,
            "services":[]
        }
        for gs in garments_from_OR:
            print("SOY GGGGSSSSSS", gs.to_dict())
            service = Service.query.get(gs.service_id)
            print("HOLA AMIGO TIENES UNA MONEDAS? Services", service.to_dict())
            service_data= {
                "name":service.name,
                "description": service.description,
                "price":service.price
            }
            garment_data["services"].append(service_data)
        order_data["garments"].append(garment_data)
    return order_data

def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    
    order.state = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state= status).all()
    data=[{
        "id":o.id,
        "client_name":o.client_id,
        "user_name":o.user_id,
        "state":o.state,
        "created_at":o.created_at,
        "total":o.total,
    } for o in orders]
    return data


def create_order_table(orders):
    data=[]
    for order in orders:
        client = Client.query.get(order.client_id)
        user = User.query.get(order.user_id)
        order_table={
            "id":order.id,
            "client_name":client.name,#cambiarlo a client naame
            "user_name":user.name,
            "state":order.state,
            "created_at":order.created_at,
            "total":order.total
        } 
        data.append(order_table)
    return data


def get_order_dashboard(pagination):
    #Piden pagina 1
    #Los que vamos a ignorar son 0
    orders = Order.query.filter().order_by(Order.created_at.desc()).limit(10)
    if pagination >1:
        orders = orders.offset(pagination*10)
    return create_order_table(orders.all())

def get_pending_order_dashboard(pagination):
    order_received = Order.query.filter_by(state="recibido").order_by(Order.created_at.desc()).limit(10)
    order_process = Order.query.filter_by(state="en proceso").order_by(Order.created_at.desc()).limit(10)
    if pagination >1:
        order_received = order_received.offset(pagination*10)
        order_process = order_process.offset(pagination*10)
    orders = order_received.all()+ order_process.all()
    return create_order_table(orders)

def get_counting():
    num_garments = Garment.query.filter().count()
    num_services = Service.query.filter().count()
    num_clients = Client.query.filter().count()
    num_users = User.query.filter().count()

    data={
        "quantity_garments": num_garments,
        "quantity_services": num_services,
        "quantity_users": num_users,
        "quantity_clients": num_clients,
    }
    return data