const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/user";
const DATABASE_NAME = "user";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("user_details");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
//POST API - creating user details.
app.post("/createUser", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        return response.send(result.result);
    });
});
//GET API - Retrieving User details.
app.get("/getUser", (request, response) => {
    collection.find(request.body).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
//PUT API - Updating User details.
app.put("/updateUser", (request, response) => {
    var AGE = {"age":request.body.age}
    var NAME = {"name":request.body.name}
    console.log("age",AGE)
    collection.updateOne(NAME,{$set:AGE},(error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
//DELETE API - Deleting User details.
app.delete("/deleteUser", (request, response) => {
    collection.deleteOne(request.body,(error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});