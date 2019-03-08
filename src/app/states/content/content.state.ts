import { State, Action, StateContext, Selector, UpdateState } from "@ngxs/store";
import { HostInfo } from "app/models/host-info.model";
import { Content } from "app/models/content";
import { updateHostInfo, updateContent } from "./content.actions";

@State<Content> ({
    name: 'content',
    defaults: {
        name: '',
        tags: [],
        startDate: '',
        endDate: '',
        notice: '',
        desc: '',
        hostName: 'roomy',
        hostEmail: 'dd',
        hostTel: '213',
        siteUrl: '',
        videoUrl: '',
        placeName: '',
        images_1: new File([''], 'filename'),
        images_2: new File([''], 'filename'),
        images_3: new File([''], 'filename'),
        images_4: new File([''], 'filename'),
        images_5: new File([''], 'filename'),
        images_6: new File([''], 'filename')
    }
})
export class contentState {
    @Selector()
    static hostInfo(state: Content) {
        let info: Object = {
            hostName: state.hostName,
            hostEmail: state.hostEmail,
            hostTel: state.hostTel
        };

        return info;
    }

    @Action(updateContent)
    updateContent(context: StateContext<Content>, updateObj: updateContent) {
        context.setState(updateObj.load.content);
    }

    @Action(updateHostInfo)
    updateHostInfo(context: StateContext<HostInfo>, updateObj: updateHostInfo) {
      context.setState(updateObj.load.hostInfo);
    }
}
