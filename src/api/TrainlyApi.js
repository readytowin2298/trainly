import axios from "axios";
// const axios = require('axios')

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class TrainlyApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TrainlyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      };

    static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
    }

    //  Get token for login from username, password. 

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    // Signup for site.

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    };
    
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    static async getAssignments(userEmail){
        let res = await this.request(`assignments`);
        // console.log(res)
        return res;
    };

    static async getAssignment(assignmentId){
        let res = await this.request(`assignments/${assignmentId}`);
        return res;
    }

    static async getQuiz(quizId){
        let res = await this.request(`quizzes/${quizId}`);
        return res;
    }

}

export default TrainlyApi;
// module.exports = TrainlyApi;