from app.database.db import db
from datetime import datetime

class User(db.Model):#asi se hereda
    __tablename__="users"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50), nullable=False)#El nulable me dice que no puede quedar null
    email=db.Column(db.String(50), nullable=False, unique= True)#El nulable me dice que no puede quedar null
    password=db.Column(db.String(255), nullable=False)#El nulable me dice que no puede quedar null
    rol=db.Column(db.String(20), default="empleado")#administrador o epmpleado
    state=db.Column(db.String(20), default="activo")#activo o no
    created_at=db.Column(db.DateTime, default=datetime.now() )#El nulable me dice que no puede quedar null


    #Relaciones inversas
    orders= db.relationship("Order", backref="users", lazy=True)
    #El order es la tabla que se va a relaciuonar
    #El backref es para poner a donde hace referencia (para atras)
    #El lazy hace que cuando pedimpos las prdenes del clientes, va yu busca las correctas. Hasta que no lo invoca, no existe esa madre. Por lo que carga hasta que lo pide

