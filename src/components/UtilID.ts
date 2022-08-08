export class UtilID {

    private static uniqueIDs: Set<string> = new Set();

    /**
     * Creates a random string of letters, to be used as an ID.  
     * The IDs are not cryptographically secure, don't use this for anything important.  
     * There is no garbage collection here, don't forget to use `remove()` if you need to use this for a long time.
     * @param unique If false, simply returns a randomized string
     */
    public static make(unique = true): string {
        if (!unique) return getRandomString();

        let uniqueID: string;
        do { uniqueID = getRandomString(); }
        while (this.uniqueIDs.has(uniqueID));
        this.uniqueIDs.add(uniqueID);
        return uniqueID;

        function getRandomString(): string {
            return (+new Date).toString(36)
        }
    }

    /**
     * Checks whether the specified ID has been registered
     * @param id String ID to check
     */
    public static has(id: string): boolean {
        return this.uniqueIDs.has(id);
    }

    /**
     * Remove the provided ID from the records.  
     * Make sure that the corresponding element has also been removed, to avoid possible collisions
     * @param id String ID to remove
     * @returns true if the ID existed, false otherwise
     */
    public static remove(id: string): boolean {
        if (!this.has(id)) return false;
        this.uniqueIDs.delete(id);
        return true;
    }

}