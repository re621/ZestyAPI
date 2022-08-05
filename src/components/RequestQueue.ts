import crossFetch, { Request as CrossRequest } from "cross-fetch";
import Logger from "./Logger";
import Util from "./Util";

const wfFetch = Util.isBrowser ? fetch : crossFetch;
const wfRequest = Util.isBrowser ? Request : CrossRequest;

export default class RequestQueue {
    
    private static queue: QueueItem[] = [];
    private static running = false;
    
    /**
     * Add a request to the queue. Requests are processed automatically, in the order they were added
     * @param requestInfo Target URL
     * @param requestInit Additional request data
     * @param timeout Timeout before the next request
     * @returns 
     */
    public static add(requestInfo: RequestInfo, requestInit?: RequestInit, timeout = 500): Promise<any> {
        if(timeout < 500) timeout = 500;
        
        return new Promise((resolve, reject) => {
            this.queue.push({
                request: new wfRequest(requestInfo, requestInit),
                success: resolve,
                failure: reject,
                timeout: timeout,
            });
           this.run();
        });
    }
    
    private static async run(): Promise<void> {
        if(this.running) return;
        this.running = true;
        
        let currentTask: QueueItem;
        while(currentTask = this.queue.shift()) {
            try {
                Logger.connect(currentTask.request.url);
                const response = await wfFetch(currentTask.request);
                const data = await response.json();
                currentTask.success(data);
            } catch(error) { currentTask.failure(error); }
            await Util.sleep(currentTask.timeout);
        }
        
        this.running = false;
    }
}

interface QueueItem {
    request: Request
    success: Function,
    failure: Function,
    timeout: number,
}
