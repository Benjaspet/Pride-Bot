import PrideCommand from "../commands/PrideCommand";
import {Client, Interaction} from "discord.js";

export default class CommandBase {

    public static async respondToApplicationCommands(client: Client, interaction: Interaction) {
        new PrideCommand(client).execute(interaction).then(() => {});
    }
}