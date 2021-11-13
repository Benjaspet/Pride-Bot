import {Client} from "discord.js";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import Util from "../utils/Util";
import ConfigBase from "./ConfigBase";
import SlashCommandUtil from "../utils/SlashCommandUtil";
import LoggerBase from "./LoggerBase";

export default class SlashCommandBase {

    public client: Client;
    public slashData: object[];
    public action: any = {
        deploy: true,
        delete: false,
        guild: true
    };
    private clientId: string = ConfigBase.get("CLIENT-ID");
    private guildId: string = ConfigBase.get("GUILD-ID");

    constructor(client: Client, slashData: object[], action: any) {
        this.slashData = slashData;
        this.action = action;
        this.init().then(() => {});
    }

    private async init(): Promise<void> {
        const rest = new REST({version: "9"}).setToken(ConfigBase.get("TOKEN"));
        if (this.action.deploy) {
            if (this.action.guild) {
                try {
                    LoggerBase.info("Refreshing all guild slash commands..");
                    await rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
                        body: SlashCommandUtil.getAllSlashCommandData(this.client)});
                    await Util.sleep(1000);
                    LoggerBase.info("Successfully updated all guild slash commands.");
                } catch (error) {
                    LoggerBase.error(error);
                }
            } else {
                try {
                    LoggerBase.info("Refreshing all global slash commands..");
                    await rest.put(Routes.applicationCommands(this.clientId), {
                        body: SlashCommandUtil.getAllSlashCommandData(this.client)
                    });
                    await Util.sleep(1000);
                    LoggerBase.info("Successfully updated all global slash commands.");
                } catch (error) {
                    LoggerBase.error(error);
                }
            }
        } else if (this.action.delete && !this.action.deploy) {
            if (this.action.guild) {
                try {
                    LoggerBase.info("Deleting all guild slash commands...");
                    await rest.put(Routes.applicationGuildCommands(this.clientId,this.guildId), {
                        body: []});
                    LoggerBase.info("Successfully deleted all guild slash commands.");
                } catch (error) {
                    LoggerBase.error(error);
                }
            } else {
                try {
                    LoggerBase.info("Deleting all global slash commands...");
                    await rest.put(Routes.applicationCommands(this.clientId), {
                        body: []});
                    LoggerBase.info("Successfully deleted all global slash commands.");
                } catch (error) {
                    LoggerBase.error(error);
                }
            }
        }
    }
}