export default class Logger {
    public static debug = false;

    public static log(message: string): void {
        if (this.debug) console.log(message);
    }

    public static connect(url: string): void {
        if (this.debug) console.log("%cCONNECT " + url, "color: blueviolet");
    }
}
