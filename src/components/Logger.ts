export default class Logger {
    public static debug = false;

    /**
     * Writes the specified messages into the console log
     * @param {string} message Messages to write
     */
    public static log(...message: string[]): void {
        if (this.debug) console.log(message);
    }

    /**
     * Notification about a connection created to the specified URL
     * @param {string} url URL that is being connected to
     */
    public static connect(url: string): void {
        if (this.debug) console.log("%cCONNECT " + url, "color: blueviolet");
    }
}
