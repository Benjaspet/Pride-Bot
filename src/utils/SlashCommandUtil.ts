import {Client} from "discord.js";
import PrideCommand from "../commands/PrideCommand";

export default class SlashCommandUtil {

    public static getAllSlashCommandData(client: Client): object[] {
        return [
            new PrideCommand(client).slashData
        ];
    }
}