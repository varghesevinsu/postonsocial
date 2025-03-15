from firebase_admin import credentials, firestore
import uuid
from app import db


def get_by_id(collection, user_id):
    """ Get record by id from firestore """
    try:
        doc_ref = db.collection(collection).document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            print(f"{collection} not found for {user_id}")
            return None
    except Exception as e:
        print(f"Error getting document: {e}")
        return None


def get_all(collection, user_id):
    """ Get all records from firestore """
    try:
        docs = db.collection(collection).where('user_id', '==', user_id).stream()
        results = [doc.to_dict() for doc in docs]
        return results
    except Exception as e:
        print(f"Error getting documents: {e}")
        return None


def create(collection, data):
    """ Create a new record in firestore """
    docid = str(uuid.uuid4())
    try:
        doc_ref = db.collection(collection).document(docid)
        doc_ref.set(data)
        return docid
    except Exception as e:
        print(f"Error creating document: {e}")
        return None


def update(collection, user_id, data):
    """ Update a record in firestore """
    try:
        doc_ref = db.collection(collection).document(user_id)
        doc_ref.update(data)
        return True
    except Exception as e:
        print(f"Error updating document: {e}")
        return False


def delete(collection, user_id):
    """ Delete a record from firestore """
    try:
        doc_ref = db.collection(collection).document(user_id)
        doc_ref.delete()
        return True
    except Exception as e:
        print(f"Error deleting document: {e}")
        return False
