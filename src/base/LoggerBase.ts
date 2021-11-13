export default class LoggerBase {

    public static info(message: string) {
        console.log(`[Pronoun Bot] [INFO] ${message}`);
    }

    public static warn(message: string): void {
        console.log(`[Pronoun Bot] [WARNING] ${message}`)
    }

    public static error(message: string): void {
        console.log(`[Pronoun Bot] [ERROR] ${message}`)
    }
}