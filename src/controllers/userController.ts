import {Request, Response} from 'express';


export const defaultController = (_req: 
    Request, res: 
    Response)=>{
    res.send("Welcome E-move")
}

export const signUp = (_req: 
    Request, res: 
    Response)=>{
    res.send("Welcome E-move signup")
}