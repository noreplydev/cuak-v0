import MongoDB from "../lib/MongoDB";

const bcrypt = require('bcrypt');

export interface UserInterface {
    email: string,
    password: string
}

class User {
    email: any
    password: any

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    static async generateHash(password: string, saltRounds?: number): Promise<string> {
        const salts = saltRounds ?? 10
        const hash = await bcrypt.hash(password, salts);
        return hash
    }

    static async validatePassword(password: string, hash: string) {
        const validation = await bcrypt.compare(password, hash);
        if (! Boolean(validation)) throw 'Unauthorized'
    }

    static async generateIndexes() {
        MongoDB.generateIndex('users', 'email', 'unique')
    }
}

export default User