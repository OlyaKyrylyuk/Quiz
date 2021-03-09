import express, { Application, Request, Response } from "express";

const app: Application = express();

const router = express.Router();

router.get('/',(req:Request, res:Response)=>{
   return  res.send('Start')
})

app.use("/", router);

app.listen(3000, () => {
    console.log("server listening");
  });