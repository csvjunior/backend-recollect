import { connect } from "mongoose";

export default class Conection {
    private db_conection_string: string;

    constructor(db_conection_string: string){
        this.db_conection_string = db_conection_string;
    }

    async createConection() {
        try {
            await connect(this.db_conection_string);
            console.log("Banco de dados conectado");
        } catch (error) {
            console.error(error);
        }  
    }
}