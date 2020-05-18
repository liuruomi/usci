from app import app
import json
from flask import render_template, request, jsonify
from flask_cors import CORS, cross_origin
import hashlib
from datetime import date, datetime
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

products = []
num = 0


@app.route('/')
def home():
    return "Home"

@app.route('/product', methods=['GET', 'POST'])
def product():
    global num
    if request.method == 'POST':
        value = request.json
        name = value["prod"]["name"]
        price = value["prod"]["price"]
        stock = value["prod"]["stock"]
        # product_id = hashlib.sha224(name).hexdigest()
        now = date.today()
        time = datetime.now()
        # timestamp = datetime.timestamp(now)
        # print(product_id)
        obj = {
            "name" : name,
            "product_id": {
                "product_name": name,
                "current_price": price,
                "stock": stock,
                "time": time
            }
        }
        products.append(obj)

    return jsonify(products)

@app.route('/product/<name>', methods=['GET'])
def prod(name):
    myprod = {};

    for prod in products:
        if prod["name"] == name:
            myprod = prod
            break

    return jsonify(myprod)

@app.route('/product/<name>', methods=['DELETE'])
def delete(name):
    myprod = {};

    for prod in products:
        if prod["name"] == name:
            products.remove(prod)
            break

    return jsonify(myprod)

