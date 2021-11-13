var express = require('express');
var path = require('path');
var bodyParser = require(body-parser);
var mongo = require('mongoose');

var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){
    if(err){ console.log(err);}
    else{ console.log('Conectado a ' + db, ' + ', response);}
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATON, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var UsesSchema = new Schema({
    name: { type: String },
    address:{ type: String },
},{ versionKey: false });

var model = mongo.model('users', UserSchema, 'users');

app.post("/api/SaveUser", function(req,res){
    var mod = new model(req.body);
    if(req.body.mode == "Save"){
        mod.save(function(err, data){
           if(err){
               res.send(err);
           } 
           else{
               res.send({data:"Se ha insertado el registro .. !!"});
           }
        });
    }
    else{
        model.findByIdAndUpdate(req.body.findByIdAndUpdate, { name: req.body.name, address: req.body.address},
            function(err, data){
                if(err){
                    res.send(err);
                }
                else{
                    res.send({data:"Se ha actualizado el registro .. !!"});
                }
            });
    }
});

app.post("/api/deleteUsser", function(req, res){
    model.remove({_id: req.body.id }, function(err) {
        if(err){
            req.send(err);
        }
        else{
            res.body({data:"El registro ha sido eliminado .. !!"});
        }
    });
});

app.get("/api/gether", function(req, res){
    model.find({}, function(err, data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });

    app.listen(0000, function () {
        console.log('Aplicación de ejemplo que escucha en la parte 0000:')
    });
});