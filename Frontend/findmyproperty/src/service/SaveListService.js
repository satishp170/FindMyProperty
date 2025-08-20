import axios from 'axios'
import { Property } from '../models/Property';
const baseUrl = "http://localhost:8080/savelist/"

class SaveListService {
    async isSave(uid, pid) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const response = await axios.get(`${baseUrl}issave/${uid}/${pid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data === true;
        } catch (error) {
            console.error(`Error checking if property ${pid} is saved by user ${uid}:`, error);
            throw error;
        }
    }

    async saveItem(uid, pid) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const payload = {
                userId: uid,
                propertyId: pid
            };

            const response = await axios.post(`${baseUrl}add`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error saving property ${pid} for user ${uid}:`, error);
            throw error;
        }
    }

    async removeItem(uid, pid) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const response = await axios.delete(`${baseUrl}delete/${uid}/${pid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error removing saved property ${pid} for user ${uid}:`, error);
            throw error;
        }
    }

    async getSavedProperties(uid) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const response = await axios.get(`${baseUrl}user/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const propertyList = response.data.map(item => new Property(item));
            return propertyList;
        } catch (error) {
            console.error(`Error fetching saved properties for user ${uid}:`, error);
            throw error;
        }
    }
}

export default new SaveListService();