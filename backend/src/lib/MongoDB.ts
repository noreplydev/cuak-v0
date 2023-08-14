const {MongoClient} = require('mongodb')
const DATABASE = "db"
require('dotenv').config();

class MongoDB {

    static generateClient(database: string = DATABASE) {
        const uri = `mongodb://${process.env.MONGODB_HOST}/${database}`;
        return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    static async connectClient() {
        const client = MongoDB.generateClient()
        return await client.connect()
    }

    static async read(collectionName: string, dbquery: any, showHidden?: boolean) {
        const client = await MongoDB.connectClient()
        const collection = client.db(DATABASE).collection(collectionName);
        if (!showHidden) dbquery = { ...dbquery, hidden: { $exists: false } }
        const data = await collection.find(dbquery).toArray();
        if (data.length == 0) throw "Not found"
        return data
    }

    static async readOne(collectionName: string, dbquery: any, showHidden?: boolean) {
        const client = await MongoDB.connectClient()
        const collection = client.db(DATABASE).collection(collectionName);
        if (!showHidden) dbquery = { ...dbquery, hidden: { $exists: false } }
        const data = await collection.findOne(dbquery)
        if (!data) throw "Not found"
        return data
    }

    static async create(collectionName: string, data: any) {
        const client = await MongoDB.connectClient()
        const collection = client.db(DATABASE).collection(collectionName);
        data = MongoDB.insertId(data) // Check that has _id
        try {
            await collection.insertOne(data)
            return data
        } catch (e) {
            if (e.code == 11000) throw "Duplicated key"
        }
    }

    static async update(collectionName: string, dbquery: any, data: any) { // update One
        const client = await MongoDB.connectClient()
        const collection = client.db(DATABASE).collection(collectionName);
        data = MongoDB.insertId(data) // Check that has _id
        try {
            await collection.replaceOne(dbquery, data)
            return data
        } catch (e) {
            if (e.code == 11000) throw "Duplicated key"
        }
    }

    static async delete(collectionName: string, dbquery: any) { // delete One
        let data = await MongoDB.readOne(collectionName, dbquery)
        if (!data) throw "Not found"
        data = { ...data, hidden: true }; // Sets to hidden
        await MongoDB.update(collectionName, dbquery, data)
        return data
    }

    static async recover(collectionName: string, dbquery: any) { // recover one element deleted
        let data = await MongoDB.readOne(collectionName, dbquery, true)
        if (!data) throw "Not found"
        delete data.hidden // Removes hidden
        await MongoDB.update(collectionName, dbquery, data)
        return data
    }

    static async generateIndex(collectionName: string, field: string, indexType: 'unique' | 'text') { // recover one element deleted
        const client = await MongoDB.connectClient()
        const collection = client.db(DATABASE).collection(collectionName);
        switch (indexType) {
            case 'unique':
                await collection.createIndex({ [field]: 1 }, { unique: true })
                break;
            case 'text':
                await collection.createIndex({ [field]: "text" })
                break;
        }
    }

    static insertId(data: any) {
        const { v4: uuidv4 } = require('uuid');
        return data.hasOwnProperty("_id") ? data : { ...data, _id: uuidv4() }
    }
}

export default MongoDB