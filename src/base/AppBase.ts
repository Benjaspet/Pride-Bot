import {Client} from "discord.js";
import BaseConfig from "../base/ConfigBase";
import Util from "../utils/Util";

export default class AppBase {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public login(): void {
        Util.clearConsole();
        this.client.login(BaseConfig.get("TOKEN")).then(() => {});
    }
}