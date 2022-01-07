const express = require('express');
const cors = require('cors');

const{Sequelize} = require('./models');

const models=require('./models');
const res = require('express/lib/response');

const app=express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let itemCompra = models.itemCompra;
let produto = models.Produto;

app.get('/', function(req, res){
    res.send('Ola Deus!');
});

app.post('/servico', async(req, res) =>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
        error: true,
        message: "Foi impossivel se conectar!"
        })
    });
});

app.post('/cliente', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
        })
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Não foi possivel inserir o cliente.",
        });
    });
});

app.post ('/cliente/:id/pedido', async (req, res)=>{
    const pedid = {
        data: req.body.data,
        ClienteId: req.params. id
    };

    if(!await cliente.findByPk(req.params.id)) {
        return res.json({
            error: true,
            message: "Cliente não localizado "
        });
    };

    await pedido.create(pedid)
        .then(order=> {
            return res.json({
                error: false,
                message: "Pedido inserido",
                order
            });
        }).catch(erro =>{
            return res.json({
                error: true,
                message: "Não foi possivel incluir o pedido do cliente"
            });
    });
});

app.post ('/cliente/:id/compra', async (req, res)=>{
    const pedid = {
        data: req.body.data,
        ClienteId: req.params. id
    };

    if(!await cliente.findByPk(req.params.id)) {
        return res.json({
            error: true,
            message: "Cliente não localizado "
        });
    };

    await compra.create(pedid)
        .then(order=> {
            return res. status(400).json({
                error: false,
                message: "Compra foi inserido",
                order
            });
            }).catch(erro =>{
            return res.json({
                error: true,
                message: "Não foi possivel incluir o compra do cliente"
            });
    });
});

app.post('/itempedido/:id', async (req, res) => {
    const itens = {
        PedidoId: req.params.id,
        ServicoId: req.body.ServicoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
   
    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.json({
            error: true,
            message: "Serviço não localizado."
        });
    };

    await itempedido.create(itens).then(function(){
        return res. json({
            error: false,
            message: "Item criado com sucesso."
        });
    }).catch(function (erro) {
        return res.json({
            error: true,
            message: " Não foi possivel executar"
        });
    });
});

app.post('/itemcompra/:id', async (req, res) => {
    const itens = {
        CompraId: req.params.id,
        ProdutoId: req.body.ProdutoId,
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };
   
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.json({
            error: true,
            message: "Item não localizado."
        });
    };

    await itemCompra.create(itens).then(function(){
        return res. json({
            error: false,
            message: "Item criado com sucesso."
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel executar. "
        });
    });
});

app.put('/produtos', async (req, res) => {
    await produto.create(
        req.body
    ).then(function (){
        return res.json({
            error: false,
            message: "Produto criado"
        });
    }).catch(function(erro){
        return res.status(400).send({
            error: true,
            message: " Não foi possivel executar" 
        });
    });
});

app.post('/pedidos', async(req, res) =>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
        error: true,
        message: "Foi impossivel se conectar!"
        });
    });
});

app.post('/itempedido', async(req, res) =>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
        error: true,
        message: "Foi impossivel se conectar!"
        })
    });
});

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw:true
        order:[['nome', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    }).catch(function (erro) { 
        return res.status(400).json({
            error: true,
            message: 'Impossivel executar!'
        });
    });
});

app.get('/listaservicos/:id', async (req, res) => { 
    if (!await servico.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Servico não localizado!'
        });
    }
    await servico.findByPk(req.params.id).then(serv => {
        return res.json({
            error: false,
            serv
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possível conectar!',
        });
    });
});

app.get('/listaitempedido', async(req, res)=>{
    await itempedido.findAll({
        order:[['nome', 'ASC']]
    }).then(function(itempedido){
        res.json({itempedido})
    }).catch(function (erro) { 
        return res.status(400).json({
            error: true,
            message: 'Impossivel executar!'
        });
    });
});

app.get('/listaitempedido/:id', async (req, res) => { 
    if (!await itempedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Servico não localizado!'
        });
    }
    await itempedido.findByPk(req.params.id).then(ped => {
        return res.json({
            error: false,
            serv
        })
    });
});

app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
        order: [['id', 'DESC']],
        include: [{ all: true }]
    }).then(function(clientes){
        res.json({
            error: false,
            clientes
        })
    }).catch(function (erro){
        return res.status(400).json({
            error: true,
            message: "Impossivel executar"
        });
    });
});

app.get('/listacompra/:id', async (req, res) => { 
    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não executada!'
        });
    }
    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Erro: não foi possível conectar!',
            });
        });
});

app.get('/listapedido', async(req, res)=>{
    await pedido.findAll({
        order: [['id', 'DESC']],
        include: [{ all: true }]
    }).then(function(clientes){
        res.json({
            error: false,
            clientes
        })
    }).catch(function (erro){
        return res.status(400).json({
            error: true,
            message: "Impossivel executar"
        });
    });
});

app.get('/listapedido/:id', async (req, res) => { 
    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não executada!'
        });
    }
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Erro: não foi possível conectar!',
            });
        });
});

app.get('/listacliente', async(req, res)=>{
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({
            error: false,
            clientes
        });
    }).catch(function (erro) {
        return res.status(400).jsom({
            error: true,
            message: "Não foi possivel executar"
        });
    })
});

app.get('/listacliente/:id', async (req, res) => { 
    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não encontrado!'
        });
    }

    await cliente.findAll({
        where: { id: req.params.id },
        include: [{ all: true }]
    }).then(function (clientes) {
        res.json({
            error: false,
            clientes
        })
    }).catch(function (erro) { 
        return res.status(400).json({
            error: true,
            message: 'ERRO: Foi impossível se conectar!'
        });
    });
});

app.get('/cliente/pedido/:id', async (req, res) => { 

    await pedido.findAll({ where: { ClienteId: req.params.id }, include: {all: true}})
        .then(ped => {
            return res.json({pe});
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Não foi possível executar!',
            });
        });
});

app.get('/cliente/compra/:id', async (req, res) => { 

    await compra.findAll({ where: { ClienteId: req.params.id }, include: {all: true} })
        .then(ped => {
            return res.json({pe});
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Não foi conectar!',
            });
        });
});

app.get('/pedido/:id', async (req, res) => { 

    await pedido.findByPk(req.params.id, { include: {all: true}})
        .then(ped => {
            return res.json({ped});
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Erro ao tentar executar pedido!',
            });
        });
});

app.get('/compra/:id', async (req, res) => { 
    await compra.findByPk(req.params.id, {include: {all: tru}})
        .then(ped => {
            return res.json({ped});
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: 'Não foi possivel executar!',
            });
        });
});

app.get('/listaproduto/:id', async (req, res) => { 
    if (!await produto.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado!'
        });
    }
    await produto.findByPk(req.params.id).then(serv => {
        return res.json({
            error: false,
            serv
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possível conectar!',
        });
    });
});

app.get('/servico/:id/pedidos', async (req, res) => { 
    await itemPedido.findAll({
        where: { ServicoId: req.params.id }, include: {all: true}
    }).then(item => {
        return res.json({
            error: false,
            item
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Não foi possível executar!',
        });
    });
});

app.get('/produto/:id/compras', async (req, res) => { 
        await itemCompra.findAll({
        where: { ProdutoId: req.params.id }, include: {all: true}
    }).then(item => {
        return res.json({
            error: false,
            item
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Não foi possível executar!',
        });
    });
});

app.get('/listaprodutos', async (req, res) => { 
    await produto.findAll({
        order: [['nome', 'ASC']]
    }).then(function (produto) {
        res.json({ produto })
    }).catch(function (erro) { 
        return res.status(400).json({
            error: true,
            message: 'ERRO: Foi impossível se conectar!'
        });
    });
});

app.get('/pedido/:id/servicos', async (req, res) => { 
    await itemPedido.findAll({
        where: { PedidoId: req.params.id }, include: [{ all: true }]
    }).then(item => {
        return res.json({
            error: false,
            item
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Não foi possível executar!',
        });
    });
});

app.get('/compra/:id/produtos', async (req, res) => { 
    await itemCompra.findAll({
        where: { CompraId: req.params.id }, include: [{ all: true }]
    }).then(item => {
        return res.json({
            error: false,
            item
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Não foi possível executar!',
        });
    });
});

app.get('/compra/:id/produtos', async (req, res) => { 
    await itemCompra.findAll({
        where: { ProdutoId: req.params.id }
    }).then(prod => {
        return res.json({
            error: false,
            prod
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: 'Não foi possível executar!',
        });
    });
});

app.put('/atualizarcliente/:id', async (req, res) => { 
    await cliente.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Clientes foi alterado !"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cadastro!"
        });
    });
});

app.put('/atualizapedido/:id', async (req, res) => { 
    await pedido.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Pedido foi alterado!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido!"
        });
    });
});

app.put('/atualizaservico/:id', async (req, res) => { 
    await servico.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço!"
        });
    });
});

app.put('/atualizaproduto/:id', async (req, res) => { 
    await produto.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Prouto foi alterado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço!"
        });
    });
});

app.put('/atualizacompra/:id', async (req, res) => { 
    await compra.update(req.body, {
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Compra foi alterado!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço!"
        });
    });
});

app.put('/compras/:id/editaritem', async (req, res) => { 
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
    }
    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não encontrado'
        });
    }
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado'
        });
    };

    await itemCompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "ItemCompra foi alterada com sucesso!",
            itens
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar."
        });
    });
});

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req, res)=>{
    await servico.findByPk(req.params.id)
    .then(serv => {
        return res.json({
           error: false,
           serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: Não foi possivel conectar!"
        });
    });
});

app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message:"Serviço foi alterao com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:'Erro na alteração do serviço.'
        });
    });
});

app.get('/pedidos/:id', async(req,res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    })
})

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item={
        quantidade:req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)){
        return res. status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (! await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error:true,
            message: "Serviço não foi encontrado."
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId}, 
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro não foi possivel alterar."
        });
    });
});

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).jsom({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});

app.delete('/excluirpedido/:id', async (req, res) => {  
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: 'Pedido foi excluido com sucesso!'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o pedido!",
        });
    });
});

app.delete('/excluiritempedido/:id', async (req, res) => { 
    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não encontrado'
        });
    }
    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: 'Servico não foi encontrado'
        });
    };

    await itempedido.destroy({
        where: Sequelize.and({ PedidoId: req.params.id },
            { ServicoId: req.body.ServicoId })
    }).then(function () {
        return res.json({
            error: false,
            message: 'Pedido foi excluido com sucesso'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o pedido",
        });
    });
});

app.delete('/excluirservico/:id', async (req, res) => {  
    await servico.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: 'Servico foi excluido com sucesso!'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o cliente!",
        });
    });
});

app.delete('/excluircompra/:id', async (req, res) => {  
    await compra.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: 'Compra foi excluido com sucesso!'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o cliente!",
        });
    });
});

app.delete('/excluiritemcompra/:id', async (req, res) => {  

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não encontrada'
        });
    }
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado'
        });
    }

    await itemCompra.destroy({
        where: Sequelize.and({ CompraId: req.params.id },
            { ProdutoId: req.body.ProdutoId })
    }).then(function () {
        return res.json({
            error: false,
            message: 'Compra foi excluido com sucesso!'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o pedido!",
        });
    });
});

app.delete('/excluirproduto/:id', async (req, res) => {  
    await produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: 'Produto foi excluido com sucesso!'
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "erro ao excluir o produto",
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});
