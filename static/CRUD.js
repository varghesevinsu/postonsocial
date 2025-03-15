import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from "firebase/firestore";

/**
 * Firebase CRUD operations class
 * Handles Create, Read, Update, and Delete operations for Firestore
 */
class FirebaseCrud {
    /**
     * Initialize the CRUD operations with the Firebase app
     * @param {Object} app - Firebase app instance
     */
    constructor(app) {
        this.db = getFirestore(app);
    }

    /**
     * Create a new document in a collection
     * @param {string} collectionName - Name of the collection
     * @param {Object} data - Data to be stored
     * @param {boolean} addTimestamps - Whether to add created/updated timestamps
     * @param {string} customId - Optional custom document ID
     * @returns {Promise<string>} - ID of the created document
     */
    async create(collectionName, data, addTimestamps = true, customId = null) {
        try {
            // Add timestamps if requested
            const dataWithTimestamps = addTimestamps ? {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            } : data;

            let docRef;

            if (customId) {
                // Use custom ID
                docRef = doc(this.db, collectionName, customId);
                await setDoc(docRef, dataWithTimestamps);
                return customId;
            } else {
                // Let Firebase generate the ID
                docRef = await addDoc(collection(this.db, collectionName), dataWithTimestamps);
                return docRef.id;
            }
        } catch (error) {
            console.error("Error creating document:", error);
            throw error;
        }
    }

    /**
     * Read a single document by ID
     * @param {string} collectionName - Name of the collection
     * @param {string} documentId - ID of the document to read
     * @returns {Promise<Object|null>} - Document data or null if not found
     */
    async readOne(collectionName, documentId) {
        try {
            const docRef = doc(this.db, collectionName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such document!");
                return null;
            }
        } catch (error) {
            console.error("Error reading document:", error);
            throw error;
        }
    }

    /**
     * Read all documents from a collection
     * @param {string} collectionName - Name of the collection
     * @returns {Promise<Array>} - Array of documents
     */
    async readAll(collectionName) {
        try {
            const querySnapshot = await getDocs(collection(this.db, collectionName));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error reading documents:", error);
            throw error;
        }
    }

    /**
     * Query documents based on conditions
     * @param {string} collectionName - Name of the collection
     * @param {Array} conditions - Array of where conditions: [field, operator, value]
     * @param {string} orderByField - Field to order by (optional)
     * @param {string} orderDirection - Direction to order (asc/desc)
     * @param {number} limitCount - Maximum number of documents to return
     * @returns {Promise<Array>} - Array of matching documents
     */
    async queryDocuments(
        collectionName,
        conditions = [],
        orderByField = null,
        orderDirection = 'asc',
        limitCount = null
    ) {
        try {
            const collectionRef = collection(this.db, collectionName);

            // Build query constraints
            const queryConstraints = [];

            // Add where conditions
            conditions.forEach(condition => {
                if (condition.length === 3) {
                    queryConstraints.push(where(condition[0], condition[1], condition[2]));
                }
            });

            // Add ordering if specified
            if (orderByField) {
                queryConstraints.push(orderBy(orderByField, orderDirection));
            }

            // Add limit if specified
            if (limitCount) {
                queryConstraints.push(limit(limitCount));
            }

            // Execute the query
            const q = query(collectionRef, ...queryConstraints);
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error querying documents:", error);
            throw error;
        }
    }

    /**
     * Update a document
     * @param {string} collectionName - Name of the collection
     * @param {string} documentId - ID of the document to update
     * @param {Object} data - Data to update
     * @param {boolean} updateTimestamp - Whether to update the timestamp
     * @returns {Promise<void>}
     */
    async update(collectionName, documentId, data, updateTimestamp = true) {
        try {
            const docRef = doc(this.db, collectionName, documentId);

            // Add updated timestamp if requested
            const updateData = updateTimestamp ? {
                ...data,
                updatedAt: serverTimestamp()
            } : data;

            await updateDoc(docRef, updateData);
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    /**
     * Delete a document
     * @param {string} collectionName - Name of the collection
     * @param {string} documentId - ID of the document to delete
     * @returns {Promise<void>}
     */
    async delete(collectionName, documentId) {
        try {
            const docRef = doc(this.db, collectionName, documentId);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }

    /**
     * Check if a document exists
     * @param {string} collectionName - Name of the collection
     * @param {string} documentId - ID of the document
     * @returns {Promise<boolean>} - Whether the document exists
     */
    async exists(collectionName, documentId) {
        try {
            const docRef = doc(this.db, collectionName, documentId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (error) {
            console.error("Error checking document existence:", error);
            throw error;
        }
    }
}

export default FirebaseCrud;