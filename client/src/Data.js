
export default class Data {
    
    /**
    *   'api' method
    *   1. Defines the url to be fetched
    *   2. Defines an 'options' object containing request options
    *   3. Stringifies body in case there is one
    *   4. Handles authentication, in case it is required
    *   5. Returns a function 'fetch' that calls the Fetch API with the information gatthered above
    * 
    *   @param {string} path - The route path of the request
    *   @param {string} method - The HTTP method of the request
    *   @param {string} [body] - The body of the request
    *   @param {boolean} [requiresAuthentication] - true or false, if authentication is required for the route or not
    *   @param {string} [credentials] - The credentials of the authentication, in case it is required
    *   @return {function} Fetch API with the url and the options object as arguments
    * 
    */
    api(path, method = 'GET', body = null, requiresAuthentication = false, credentials = null) {
        // Defines the url to be called on the API
        const url = 'http://localhost:5000/api' + path;

        // Defines an 'options' object to be sent as second argument on the Fetch API
        const options = {
            method,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };

        // If there is a body in the method call, stringifies the body and adds it to a property 'body' of the 'options' object
        if (body) {
            options.body = JSON.stringify(body);
        }

        // If credentials are required, encodes user credentials and implements the authorization header
        if (requiresAuthentication) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    // Method for calling the GET route 'Get Users' of the API
    async getUser(userCredentials) {
        const res = await this.api('/users', 'GET', null, true, userCredentials);
        if (res.status === 200) {
            return res.json().then(data => data);
        } else if (res.status === 401) {
            return null;    // In case no user was found with the credentials provided
        } else {
            throw new Error();
        }
    }
    
    // Method for calling the POST route 'Create User' of the API
    async createUser(newUser) {
        const res = await this.api('/users', 'POST', newUser);
        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            return res.json().then(data => data.errors);    // Array with error messages, in case an existing e-mail address or incomplete data was provided
        } else {
            throw new Error();
        }
    }

    // Method for calling the GET route 'Get Courses' of the API
    async getCourses() {
        const res = await this.api('/courses', 'GET');
        if (res.status === 200) {
            return res.json().then(data => data);
        } else {
            throw new Error();
        }
    }

    // Method for calling the GET route 'Get Course' (single one) of the API
    async getCourseById(courseId) {
        const res = await this.api(`/courses/${courseId}`, 'GET');
        if (res.status === 200) {
            return res.json().then(data => data);
        } else {
            throw new Error();
        }
    }

    // Method for calling the POST route 'Create Course' of the API
    async createCourse(newCourse, userCredentials) {
        const res = await this.api('/courses', 'POST', newCourse, true, userCredentials);
        if (res.status === 201) {
            return [];
        } else if (res.status === 400) {
            return res.json().then(data => data.errors);    // Array with error messages in case incomplete data was provided
        } else {
            throw new Error();
        }
    }

    // Method for calling the PUT route 'Update Course' of the API
    async updateCourse(courseId, updatedCourse, userCredentials) {
        const res = await this.api(`/courses/${courseId}`, 'PUT', updatedCourse, true, userCredentials);
        if (res.status === 204) {
            return [];
        } else if (res.status === 400) {
            return res.json().then(data => data.errors);    // Array with error messages in case incomplete data was provided
        } else if (res.status === 403) {
            return res.json().then(data => data);   // Object with a message property describing the error
        } else {
            throw new Error();
        }
    }

    // Method for calling the DELETE route 'Delete Course' of the API
    async deleteCourse(courseId, userCredentials) {
        const res = await this.api(`/courses/${courseId}`, 'DELETE', null, true, userCredentials);
        if (res.status === 204) {
            return [];
        } else if (res.status === 403) {
            return res.json().then(data => data);   // Object with a message property describing the error
        } else {
            throw new Error();
        }
    }
}