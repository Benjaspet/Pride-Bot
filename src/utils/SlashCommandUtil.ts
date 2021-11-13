import {Client} from "discord.js";
import PrideCommand from "../commands/PrideCommand";
import PronounsCommand from "../commands/PronounsCommand";

export default class SlashCommandUtil {

    public static getAllSlashCommandData(client: Client): object[] {
        return [
            new PrideCommand(client).slashData,
            new PronounsCommand(client).slashData
        ];
    }
}