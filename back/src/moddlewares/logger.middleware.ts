import { NextFunction, Request, Response } from 'express';



export function loggerGlobal(req: Request, res: Response, next: NextFunction) {

    const currentDate = new Date()
    const date = currentDate.toLocaleDateString()
    const time = currentDate.toLocaleTimeString()



  console.log(`[${date} - ${time}]Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
  next();
}
