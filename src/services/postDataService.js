import axios from 'axios';

let API_URL = 'http://52.175.201.248:3000/facebook/';


class AxiosClientProvider {

    constructor() {
        this.defaultOptions = {
            baseURL: API_URL,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            // withCredentials: true
        };
        this.instance = axios.create(this.defaultOptions);
    }

    getFacebookPosts(userId = 1, cb) {
        //  URl , data, header, callback
        this.instance.get("facebook_post/" + userId).then((response) => {
            if (response.data) {
                let dataObj = response.data;
                if (dataObj.success == true) {
                    cb(dataObj.list);
                } else {
                    cb([]);
                }
            } else {
                cb([]);
            }
        }).catch((err) => {
            console.log("Some error occured in get category", err);
            cb([]);
        });
    }

    getFacebookCommment(userId = 1, cb) {
        //  URl , data, header, callback
        this.instance.get("facebook_comments/" + userId).then((response) => {
            if (response.data) {
                let dataObj = response.data;
                if (dataObj.success == true) {
                    cb(dataObj.list);
                } else {
                    cb([]);
                }
            } else {
                cb([]);
            }
        }).catch((err) => {
            console.log("Some error occured in get category", err);
            cb([]);
        });
    }

    getFacebookPostsCommment(userId = 1, cb) {
        //  URl , data, header, callback
        this.instance.get("facebook_post_comments/" + userId).then((response) => {
            if (response.data) {
                let dataObj = response.data;
                if (dataObj.success == true) {
                    cb(dataObj.list);
                } else {
                    cb([]);
                }
            } else {
                cb([]);
            }
        }).catch((err) => {
            console.log("Some error occured in get category", err);
            cb([]);
        });
    }

};

export default AxiosClientProvider;