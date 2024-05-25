import mysql from "mysql2"
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('mysql://uvxl34jpk3y1rzuw:AFxwCTKSSmxuPpcY1qAo@bqbz73azmxvtm1t2okaz-mysql.services.clever-cloud.com:3306/bqbz73azmxvtm1t2okaz');

const connectionDB=async ()=>{
    return await sequelize.sync().then(()=>{
        console.log("connection database initialized successfully")
    }).catch((err)=>{
        console.log({msg:"connection faild",err})
    });
}

export default connectionDB
