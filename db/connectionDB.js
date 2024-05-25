import mysql from "mysql2"
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('simpleFacebook', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

const connectionDB=async ()=>{
    return await sequelize.sync().then(()=>{
        console.log("connection database initialized successfully")
    }).catch((err)=>{
        console.log({msg:"connection faild",err})
    });
}

export default connectionDB