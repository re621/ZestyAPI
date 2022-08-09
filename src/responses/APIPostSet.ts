import APIPostGroup from "./APIPostGroup";

export default interface APIPostSet extends APIPostGroup {
    id: number;

    shortname: string;
    is_public: boolean;
    transfer_on_delete: boolean;
}