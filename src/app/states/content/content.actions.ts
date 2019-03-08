import { HostInfo } from "app/models/host-info.model";
import { Content } from "app/models/content";

export class updateHostInfo {
    static readonly type = 'updateHostInfo';

    constructor(
        public load: { hostInfo: HostInfo }
    ) { }
}

export class updateContent {
    static readonly type = 'updateContent';

    constructor(
        public load: { content: Content }
    ) { }
}