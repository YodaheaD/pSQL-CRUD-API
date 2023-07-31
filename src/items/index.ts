import express, { Express, Request, Response } from 'express';
import cors from "cors";
 
import dotenv from 'dotenv';
import { ItemsTable } from '../db/items';
import Logger from '../utils/logger';
dotenv.config();
export const itemsRouter:Express = express();

itemsRouter.use(express.json());
itemsRouter.use(express.urlencoded({ extended: true }));
itemsRouter.use(cors());


 


const endpoints = [
  {
    path: "/users",
    method: "get",
    handler: (req: express.Request, res: express.Response) => {
      
      res.send("Hello world from '/users'");
    },
  },
  {
    path: "/users/:id",
    method: "get",
    handler: (req: express.Request, res: express.Response) => {
      res.send(`Hello world from '/users/${req.params.id}'`);
    },
  },
  {
    path: "/table/:tablename",
    method: "get",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        console.log(`Table Parameter: ${req.params.tablename}'`);

        switch(req.params.tablename){
          case "items":
            const data = await ItemsTable.getAllData();
            res.send({data:data});
            break;
          default:
            throw new Error(`Invalid method: ${req.params.tablename}`);
            res.send(`No table exists with name: ${req.params.tablename}'`);
        }
      } catch (err) {
        console.log(err);
        
      }
    },
  },
  { // Inserting data into table
    path: "/items/insert",
    method: "post",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {data}=req.body;
        //const data1 = await ItemsTable.getColumnNames();        //const data = await ItemsTable.getAllData();
        const data1 = await ItemsTable.insertData(data);        //const data = await ItemsTable.getAllData();
        res.send(
          `Hello world, the data is ${JSON.stringify(data1)}'`
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
  {
    path: "/extra/addcolumn",
    method: "post",
    handler: (req: express.Request, res: express.Response) => {
      const { columnDetails } = req.body;

      try{
        const data =  ItemsTable.addColumn( columnDetails);
        res.send(
          `Hello world, the data is ${JSON.stringify(data)}'`
        );
      }
      catch(err){
        console.log(err);
      }

    },
  },
  {
    path: "/extra/delcolumn",
    method: "delete",
    handler: (req: express.Request, res: express.Response) => {
      const { column } = req.body;
console.log(`column: ${JSON.stringify(column)}`)
      try{
        const data =  ItemsTable.deleteColumn({columnDetails:column});
        res.send(
          `Hello world, the data is ${JSON.stringify(data)}'`
        );
      }
      catch(err){
        console.log(err);
      }
    },
  },
];


endpoints.forEach((endpoint) => {
    console.log(`** Registering: "${endpoint.method.toUpperCase()}" at path: ${endpoint.path}`);
    switch (endpoint.method) {
      case "get":
        itemsRouter.get(endpoint.path, endpoint.handler);
        break;
      case "post":
        itemsRouter.post(endpoint.path, endpoint.handler);
        break;
      case "put":
        itemsRouter.put(endpoint.path, endpoint.handler);
        break;
      case "delete":
        itemsRouter.delete(endpoint.path, endpoint.handler);
        break;
      default:
        throw new Error(`Invalid method: ${endpoint.method}`);
    }
  });

  /////////////////////////////

itemsRouter.get('/', (req:Request, res:Response) => {
    res.send("Hello from Express Api")
})
 