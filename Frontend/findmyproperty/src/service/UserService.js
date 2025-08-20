import axios from 'axios'
import { User } from '../models/User';
import { BuyPlanModel } from '../models/BuyPlanModel';
import { ChangePasswordModel } from '../models/ChangePasswordModel';
const baseUrl = "http://localhost:8080/users/"

class UserService {

    async getUser(uid) {
        try {

            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("JWT token not found");

            const response = await axios.get(`${baseUrl}user/${uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return new User(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    async buyPlan(id, role, plan) {
        console.log(id + " " + role + " " + plan)
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("JWT token not found");

            const payload = new BuyPlanModel({ id, role, plan });

            const response = await axios.post("http://localhost:8080/subusers/add", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error purchasing plan:", error);
            throw error;
        }
    }

    async editUser(uid, newUserDetail) {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("JWT token not found");

            const response = await axios.put(`${baseUrl}edit/${uid}`, newUserDetail, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error editing user:", error);
            throw error;
        }
    }

    async changePassword(uid, changePass) {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("JWT token not found");

            const response = await axios.post(`${baseUrl}${uid}/changepassword`, changePass, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    }

    async changeImage(uid, file) {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("JWT token not found");

            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(`${baseUrl}${uid}/changeimage`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error changing image:", error);
            throw error;
        }
    }

}

export default new UserService();