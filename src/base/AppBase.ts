import {Client} from "discord.js";
import Config from "../Config";
import Logger from "../Logger";

export default class AppBase {

    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public login(): void {
        Logger.clear();
        this.client.login(Config.get("TOKEN")).then(() => {});
    }
}