var appLc = angular.module("appLc", []);

appLc.controller("MainCtrl", ["$http", function($http){
    
    var _me = this,
        lista = [];

    function listarContatos(){
        $http.get("/listacontatos").then(function(response){
            _me.lista = response.data; //docs -> response.data
            //console.log(response.data);
        });
    }//
    listarContatos();

    function resetar(){
        _me.contato = "";
    }//

    function inserirContato(c){
        $http.post("/listacontatos", c).then(function(response){
            //_me.lista.push(response.data);
            listarContatos();
            resetar();
        });//
    }//

    function buscarContato(id){
        $http.get("/listacontatos/" + id).then(function(response){
            _me.contato = response.data;
        });//
    }//

    function atualizarContato(c){
        var id = c._id;
        //passando id parâmetro na url e contato no body
        $http.put("/listacontatos/" + id, c).then(function(response){
            //console.log(response.data);
            listarContatos();
        });//
    }//

    _me.salvarContato = function(){
        var c = _me.contato;
        //console.log(c);
        if(!c._id){
            inserirContato(c);
        }else{
            //Atualizando contato selecionado
            atualizarContato(c);
        }
    };//

    _me.editarContato = function(id){
        //Resetando os campos antes de buscar novo contato
        resetar();
        //Listando contato selecionado
        buscarContato(id);
    }//

    _me.deletarContato = function(id){
        //console.log(id);
        $http.delete("/listacontatos/" + id).then(function(response){
            //console.log(response.data);
            listarContatos();
        });//
    }//

    _me.limparContato = function(){
        resetar();
    }//

}]);//