/**
 * Generic response from the e621 API.  
 * Other responses should extend this for proper typecasting.  
 */
export default interface APIResponse {
    id: number;
}
