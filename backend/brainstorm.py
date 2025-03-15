from flask import Blueprint, jsonify, request, session
from .firestore import create, get_all, update, delete
from app import auth_required #import auth required from the main app file.

brainstorm_bp = Blueprint('brainstorm', __name__)

@brainstorm_bp.route('/create_brainstorm', methods=['POST'])
@auth_required
def create_brainstorm():
    user_id = session.get('user').get('uid')
    _d = request.get_json()
    data = _d.get("newNote")
    data['user_id'] = user_id
    return jsonify(create('brainstorm', data))

@brainstorm_bp.route('/update_brainstorm', methods=['POST'])
@auth_required
def update_brainstorm():
    user_id = session.get('user').get('uid')
    _d = request.get_json()
    data = _d.get("newNote")
    data['user_id'] = user_id
    return jsonify(update('brainstorm', data))

@brainstorm_bp.route('/get_brainstorms', methods=['GET'])
@auth_required
def get_brainstorm():
    user_id = session.get('user').get('uid')
    return jsonify(get_all('brainstorm', user_id))