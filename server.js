var express     = require('express'),
    app         = express(),
    mongojs     = require('mongojs'),
    db          = mongojs('listacontatos', ['listacontatos']),
    bodyParser  = require('body-parser');


//TEMPLATE
app.use(express.static(__dirname + "/app/public"));

//FORMATO DOS PARÂMETROS (JSON) QUE SERÃO PASSADOS VIA 'BODY - CORPO' DO DOCUMENTO (req.body)
app.use(bodyParser.json());

//ROTAS
/*
    app.get("/", function(req, res){
        res.send("Resposta da rota: HOME.");
    });
*/

app.get("/listacontatos", function(req, res){
    console.log("GET Request - Home");
    db.listacontatos.find(function(err, contatos){
        //console.log(contato);
        res.json(contatos);
    });
});//

app.get("/listacontatos/:id", function(req, res){
    var id = req.params.id;
    db.listacontatos.findOne({ "_id": mongojs.ObjectId(id) }, function(err, contato){
        res.json(contato);
    });//
});//

app.post("/listacontatos", function(req, res){
    //var contato = req.body;
    //console.log(req.body);
    db.listacontatos.insert(req.body, function(err, contato){
        res.json(contato);
    });
});//

app.put("/listacontatos/:id", function(req, res){
    var id = req.params.id;
    var c = req.body;
    db.listacontatos.findAndModify({
        query:  {"_id": mongojs.ObjectId(id)},
        update: {$set: {nome: c.nome, email: c.email, fone: c.fone}},
        new:    true
    }, function(err, result){
        res.json(result);
    });//
});//

app.delete("/listacontatos/:id", function(req, res){
    var id = req.params.id;
    db.listacontatos.remove({"_id": mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

//PORTA
app.listen(3000);
console.log("Servidor rodando na porta: 3000");