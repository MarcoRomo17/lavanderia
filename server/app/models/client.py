from app.database.db import db
from datetime import datetime

class Client(db.Model):#asi se hereda
    __tablename__="clients"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50), nullable=False)#El nulable me dice que no puede quedar null
    phone_number=db.Column(db.String(15), nullable=False, unique=True)#El numero en string, por que podenmos agregar lada y zona
    address=db.Column(db.String(255), nullable=False)
    created_at=db.Column(db.DateTime, default=datetime.now() )#El nulable me dice que no puede quedar null
    #Relaciones inversas
    orders= db.relationship("Order", backref="client", lazy=True)
    #El order es la tabla que se va a relaciuonar
    #El backref es para poner a donde hace referencia (para atras)
    #El lazy hace que cuando pedimpos las prdenes del clientes, va yu busca las correctas. Hasta que no lo invoca, no existe esa madre. Por lo que carga hasta que lo pide

    def to_dict(self, orders:bool=False):#ponemos que ea opcional el order
        client={
            'id':self.id,
            'name':self.name,
            'phone_number':self.phone_number,
            'address':self.address,
            'created_at':self.created_at,
        }

        if orders:
            client["orders"]=self.orders
        return client

