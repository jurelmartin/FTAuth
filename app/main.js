const appName = "authenticationserver";

function isEmpty(obj) {
    return !Object.keys(obj).length;
  }

class User {
    constructor(id, password = undefined, ip = undefined) {
        // Check input
        if (typeof(id) !== "string") {
            throw new TypeError("Username not string");
        }

        if (typeof(password) !== "string" && typeof(password) !== "undefined") {
            throw new TypeError("Password not string");
        }

        if (typeof(ip) !== "string" && typeof(ip) !== "undefined") {
            throw new TypeError("Ip not string");
        }

        // Assign attributes
        this.id = id;
        this.password = password;
        this.ip = ip;
    }

    setPassword(password) {
        // Check input
        if (typeof(password) !== "string") {
            throw new TypeError("Password not string");
        }

        this.password = password;
    }

    setIp(ip) {
        // Check input
        if (typeof(ip) !== "string") {
            throw new TypeError("Ip not string");
        }

        this.password = password;
    }

    async isValid() {
        let hash = await User.getHash(this.id);

        if (hash) {
            return true;
        }

        return false;
    }

    async isPasswordCorrect(password = this.password) {
        if (password === undefined) {
            throw new Error("User: Password is not set for user " + this.id);
        }

        if (!(await this.isValid())) {
            return false;
        }

        let hash = await User.getHash(this.id);

        let isValid = await User.checkPassword(password, hash);

        return isValid;
    }

    logIn(callback) {        
        // callback(err, token)
        User.session.create({
            app: appName,
            id: this.id,
            ip: this.ip 
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }

            callback(err, resp.token);
        });
    }

    logOutEverywhere(callback) {
        // callback(err, nbKilled)
        User.session.killsoid({
            app: appName,
            id: this.id
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }

            callback(err, resp.kill);
        });
    }

    static logOut(token, callback) {
        if (callback === undefined) {
            callback = err => {
                if (err) {
                    throw err;
                }
            }
        }
        
        User.session.kill({
            app: appName,
            token: token
        }, callback);
    }

    static isloggedIn(token, callback) {
        // callback(err, isLoggedIn)
        User.session.get({
            app: appName,
            token: token
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }

            if (!isEmpty(resp)) {
                callback(err, true);
                return;
            }

            callback(err, false);
        });
    }

    static getId(token, callback) {
        // callback(err, id)
        User.session.get({
            app: appName,
            token: token
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }

            callback(err, resp.id);
        });
    }
}


module.exports = User;