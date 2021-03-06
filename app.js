// Imports
import express from 'express';
import { createConnection } from 'mysql';

import cors from 'cors'

// create connection
const db = createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'test'
});

// Connect to databse
db.connect((err) => {
    if(err){
        console.log('error');
    }
    console.log('MySQL connected...');
});

// Configure express app 
const app = express();
app.use(cors());

//create table 
app.get('/createmoduletable', (req, res) => {
    let sql = 'CREATE TABLE modules(moduleId int AUTO_INCREMENT, moduleName VARCHAR(255), moduleCode VARCHAR(255), moduleLevel int(1), moduleLeaderID VARCHAR(255), moduleImage VARCHAR(255),PRIMARY KEY(moduleId))';
    db.query(sql,(err, result) => {
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send('Module table created...');
    })
});

//insert Games module
app.get('/addgpmodule', (req,res) => {
    let module = {ModuleName: "Games Programming",
                  ModuleCode: "CI8900",
                  ModuleLevel: 4,
                  ModuleLeaderID: 1,
                  ModuleImage: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"};
    let sql = "INSERT INTO modules SET ?"
    let query=db.query(sql,module,(err,result)=>{
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send('Games Programming added to Modules table...');
    });
 });

 //Read data
app.get('/getmodules', (req,res) => {
    let sql = "SELECT * FROM modules"
    let query=db.query(sql, (err,result)=>{
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send(result);
    });
 });

  //select single module
app.get('/getmodules/:moduleId', (req,res) => {
    let sql = `SELECT * FROM modules WHERE moduleId = ${req.params.moduleId}`;
    let query=db.query(sql, (err,result)=>{
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send('Single module fetched...');
    });
 });

//update module
app.get('/updatemodules/:moduleId', (req,res) => {
    let newModuleName = "Programming (Games)";
    let sql = `UPDATE modules SET moduleName= '${newModuleName}' WHERE moduleId = ${req.params.moduleId}`;
    let query=db.query(sql,(err,result) => {
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send('Module has been updated...');
    });
 });

 //delete module
app.get('/deletemodules/:moduleId', (req,res) => {
    let sql = `DELETE FROM modules WHERE moduleId = ${req.params.moduleId}`;
    let query=db.query(sql,(err,result)=>{
        if(err) {
            console.log('error')
        }
        console.log(result);
        res.send('Module has been deleted...');
    });
 });


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));