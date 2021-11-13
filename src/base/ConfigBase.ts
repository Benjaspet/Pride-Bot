import {config} from "dotenv";

config();

export default class ConfigBase {

    public static get(value: string): any {
        return process.env[value];
    }

}