import { Sequelize } from "sequelize";

const db = new Sequelize('dbnodejs', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;