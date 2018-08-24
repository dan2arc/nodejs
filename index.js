
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const filtros = require('./filtros');
//const banco = require('./banco');
const con = require('./connectionFactory')
const mysql = require('mysql');


app.use( bodyParser.json() ); // support json encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ); // support encoded bodies

app.get('/hello-world', (req, res) =>{
   res.json({foo:'bar'})
});

app.get('/tasks', (req, res) =>{
//feito
  const sql = "SELECT * FROM tasks";
  con.query(sql,(result)=>{
    if(result.length == 0){
      res.status(404);
      console.log("não encontrado");
    }else{
      res.status(200);
      res.json(result);
      console.log("busca concluida com sucesso");
    }
    res.end();
  });
});
app.get('/tasks/status/done', (req, res) =>{
  //feito
  const sql = "SELECT * FROM TASKS WHERE STATUS = 'done'";
  con.query(sql,(result)=>{
    if(result.length == 0){
      res.status(404);
      console.log("não encontrado");
    }else{
      res.status(200);
      res.json(result);
      console.log("busca concluida com sucesso");
    }
    res.end();
  });
});

app.get('/tasks/status/todo', (req, res) =>{
  //feito
  const sql = "SELECT * FROM TASKS WHERE STATUS = 'todo'";
  con.query(sql,(result)=>{
    if(result.length == 0){
      res.status(404);
      console.log("não encontrado");
    }else{
      res.status(200);
      res.json(result);
      console.log("busca concluida com sucesso");
    }
    res.end();
  });
});
app.get('/task/:todoIndex', (req, res) =>{
  //feito
  const valorRecebido = parseInt(req.params.todoIndex);
  const sql = mysql.format("SELECT * FROM TASKS WHERE ID = ?", [valorRecebido]); 
  con.query(sql,(result)=>{
    if(result.length == 0){
      console.log(result);
      res.status(404);
      res.json("Não encontrado na base de dados ");

      console.log("não encontrado na base de dados");
    }else{
      res.status(200);
      res.json(result);
      console.log(result);

      console.log("busca concluida com sucesso");
    }
    res.end();
  });
});

app.post('/nova-tarefa', (req, res) =>{
  var tarefa = req.body.name;
  var status = req.body.status;
  //feito

  const sql = mysql.format ("INSERT INTO tasks(taskName, status) VALUES (?,?)",[tarefa,status]);
  con.query(sql,(result)=>{
    if(result.affectedRows == 0){
      res.status(404);
      console.log("não encontrado");
    }else{
      res.status(201);
      console.log("inserido com sucesso");
    }
    res.end();
  });

});


app.put('/atualizar-tarefa/:todoIndex', (req, res) =>{
  // Todo[5]: Baseado na rota "nova-tarefa", crie uma funcionalidade que atualiza os dados uma tarefa em um indice e atualiza o banco.
  // feito
  const indexRecebido = parseInt(req.params.todoIndex);
  var status = req.body.status
  const sql = mysql.format("UPDATE `TASKS` SET `status`= ? WHERE id = ?",[status,indexRecebido]);

  con.query(sql,(result)=>{
    if(result.affectedRows == 0){
      res.status(404);
      console.log("não encontrado");
    }else{
      res.status(201);
      console.log("alterado com sucesso");
    }
    res.end();
  });

});


app.delete('/remover-tarefa/:todoIndex', (req, res) =>{
  // Todo[6]: Baseado na rota "nova-tarefa", crie uma funcionalidade deleta uma tarefa em um indice e atualiza o banco.
  // feito

  const indexRecebido = parseInt(req.params.todoIndex);
   const sql = mysql.format("DELETE FROM `tasks` WHERE id = ?",[indexRecebido]);

    con.query(sql,(result)=>{
      if(result.affectedRows == 0){
        res.status(404);
        console.log("não encontrado");
      }else{
        res.status(410);
        console.log("deletado com sucesso");
      }
      res.end();
    });

  });


app.listen(8081, () =>{
   console.log('Servidor Rodando')
})
