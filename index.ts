import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { pageRouter } from './src/page';
import { ItemsTable } from './src/db/items';
import Logger from './src/utils/logger';
import dotenv from 'dotenv';
import { itemsRouter } from './src/items';
import { pusherServer } from './src/lib/pusher';
dotenv.config();
const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/page', pageRouter);
app.use('/items', itemsRouter);



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

];


endpoints.forEach((endpoint) => {
    console.log(`** Registering: "${endpoint.method.toUpperCase()}" at path: ${endpoint.path}`);
    switch (endpoint.method) {
      case "get":
        app.get(endpoint.path, endpoint.handler);
        break;
      case "post":
        app.post(endpoint.path, endpoint.handler);
        break;
      case "put":
        app.put(endpoint.path, endpoint.handler);
        break;
      case "delete":
        app.delete(endpoint.path, endpoint.handler);
        break;
      default:
        throw new Error(`Invalid method: ${endpoint.method}`);
    }
  });

  /////////////////////////////
 
app.listen(process.env.PORT, async () => {
//
   ////
    Logger.http(`\n**  Server running on port ${process.env.PORT} **\n\n  `)
})//