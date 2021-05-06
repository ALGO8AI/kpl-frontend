import { observable} from "mobx";
import { ApiService } from '../../../services/apiService'
import { BaseStore } from '../../../components/common/BaseStore';
import { showActionModalComponent } from '../../../components/common/snackbar/SnackbarContent';

export const appState = observable({
    cameraPosition: [],
    cameraDetails: [],
    FeedTags: [],
    DesignatedTag: [],
    camearaValue: {},
    camearaPositions: []
})

export class LayoutStore extends BaseStore {
    api;
    constructor() {
        super()
        this.api = new ApiService()
    }

    Role() {
        return localStorage.getItem('ROLE')
    }

    getCamera = async () => {
        const response = await this.api.Get(`routes/cameraDetail/getCamPosition`);
        if (response) {
            appState.cameraPosition = response.data
        }
    };

    addCam = async (camValue) => {
        const response = await this.api.Post(`routes/cameraDetail/addCamPosition`, camValue);
        if (response) {
            this.getCamera();
        }
    }

    getCameraDetails = async () => {
        const response = await this.api.Get(`routes/annotation/stitching/cameraDetails`);
        if (response) {
            appState.cameraDetails = response.FeedCords;
        }
    }

    getTags = async () => {
        const response = await this.api.Get(`routes/annotation/stitching/allTags`);
        if (response) {
            response.FeedTags.map(id => {
                appState.FeedTags.push(id.feedId)
            });
            response.DesignatedTags.map(id => {
                appState.DesignatedTag.push(id.designatedAreaId)
            });;
            // showActionModalComponent({
            //     message: 'Save Success',
            //     color: "success"
            // })
        }
    }

    saveAnnotation = async (body, history) => {
        const response = await this.api.Post(`routes/annotation/stitching/addAnnotation`, body);
        if (response) {
            appState.cameraPosition = response;
            showActionModalComponent({
                message: 'Save Success',
                color: "success"
            })
           history.push("/stitching/setting");
        }
    }
}
