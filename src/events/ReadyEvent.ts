import {IEvent} from "../structs/IEvent";
import {Client, ClientEvents, Presence} from "discord.js";
import Util from "../utils/Util";
import Logger from "../Logger";
import SlashCommandUtil from "../utils/SlashCommandUtil";
import Config from "../Config";
import SlashCommandBase from "../base/SlashCommandBase";

export default class ReadyEvent implements IEvent {

    public name: keyof ClientEvents;
    public once: boolean;
    public readonly client: Client;

    constructor(client: Client, name: keyof ClientEvents, once: boolean) {
        this.name = name;
        this.once = once;
        this.client = client;
    }

    public async execute(): Promise<void> {
        Util.clearConsole();
        this.handlePresence();
        Logger.info(`Logged in as ${this.client.user.tag}.`);
        await this.handleApplicationCommands();
    }

    private handlePresence(): void {
        this.updatePresence()
            .then(() => setInterval(() => this.updatePresence(), 500 * 1000))
            .catch(() => this.handlePresence())
        return undefined;
    }

    private async updatePresence(): Promise<Presence | undefined> {
        const activity = Config.get("ACTIVITY");
        return this.client.user.setActivity({type: "WATCHING", name: activity});
    }

    private async handleApplicationCommands() {
        if (JSON.parse(Config.get("DEPLOY-APPLICATION-COMMANDS-GUILD")) == true) {
            await new SlashCommandBase(this.client, SlashCommandUtil.getAllSlashCommandData(this.client), {
                deploy: true,
                delete: false,
                guild: true
            });
        } else if (JSON.parse(Config.get("DEPLOY-APPLICATION-COMMANDS-GLOBAL")) == true) {
            await new SlashCommandBase(this.client, SlashCommandUtil.getAllSlashCommandData(this.client), {
                deploy: true,
                delete: false,
                guild: false
            });
        } else if (JSON.parse(Config.get("DELETE-APPLICATION-COMMANDS-GUILD")) == true) {
            await new SlashCommandBase(this.client, SlashCommandUtil.getAllSlashCommandData(this.client), {
                deploy: false,
                delete: true,
                guild: true
            });
        } else if (JSON.parse(Config.get("DELETE-APPLICATION-COMMANDS-GLOBAL")) == true) {
            await new SlashCommandBase(this.client, SlashCommandUtil.getAllSlashCommandData(this.client), {
                deploy: false,
                delete: true,
                guild: false
            });
        } else {
            Logger.info("Application commands loaded.");
        }
    }
}