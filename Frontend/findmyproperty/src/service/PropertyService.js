import axios from 'axios'
import { Property } from '../models/Property';
import { PostPropertyModel } from '../models/PostPropertyModel';
const baseUrl = "http://localhost:8080/properties/"

class PropertyService {
    async getAllProperties() {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const response = await axios.get(baseUrl + "list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const propertyList = response.data.map(item => new Property(item));
            return propertyList;
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw error;
        }
    }

    async getProperty(pid) {
        try {
            const token = localStorage.getItem("jwt");
            const response = await axios.get(baseUrl + "property/" + pid, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return new Property(response.data);
        } catch (error) {
            console.error("Error fetching property with ID:", pid, error);
            throw error;
        }
    }

    async getSearchProperties(loc, type, mxp, mxar) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const params = new URLSearchParams();
            if (loc) params.append("loc", loc);
            if (type) params.append("type", type);
            if (mxp !== undefined) params.append("mxp", mxp);
            if (mxar !== undefined) params.append("mxar", mxar);

            const response = await axios.get(baseUrl + "search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            });

            const propertyList = response.data.map(item => new Property(item));
            return propertyList;
        } catch (error) {
            console.error("Error searching properties:", error);
            throw error;
        }
    }


    async postProperty(propertyData) {
        try {
            const token = localStorage.getItem("jwt");
            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const model = new PostPropertyModel(propertyData);

            const response = await axios.post(baseUrl + "add", model, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error posting property:", error);
            throw error;
        }
    }

    async getPropertiesByCategory(category) {
        try {
            const token = localStorage.getItem("jwt");

            if (!token || token.trim() === "") {
                throw new Error("JWT token missing or empty");
            }

            const response = await axios.get(baseUrl + "category/" + category, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const propertyList = response.data.map(item => new Property(item));
            return propertyList;
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw error;
        }
    }


    // updateData(sjsp) {
    //     let myheader = { 'content-type': 'application/json' }
    //     return axios.put(baseUrl + "sjsps/" + sjsp.sjspid, sjsp, { headers: myheader });
    // }

    // deleteData(sjspid) {
    //     return axios.delete(baseUrl + "sjsps/" + sjspid);
    // }
}

export default new PropertyService();