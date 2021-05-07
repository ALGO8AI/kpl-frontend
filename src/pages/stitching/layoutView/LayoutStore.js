import { observable } from "mobx";
import { ApiService } from '../../../services/apiService'
import { BaseStore } from '../../../components/common/BaseStore';
import { showActionModalComponent } from '../../../components/common/snackbar/SnackbarContent';

export const appState = observable({
    cameraPosition: [],
    cameraDetails: [],
    cameraWorkerUnavCords: [],
    FeedTags: [],
    DesignatedTag: [],
    camearaValue: {},
    camearaPositions: []
})

export class LayoutStore extends BaseStore {
    api;
    constructor() {
        super()
        this.api = new ApiService();
        this.getCamera();
        this.getCameraDetails();
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
            showActionModalComponent({
                message: 'Add camera Success',
                color: "success"
            })
            this.getCamera();
        }
    }

    getCameraDetails = async () => {
        const response = await this.api.Get(`routes/annotation/stitching/cameraDetails`);
        if (response) {
            appState.cameraDetails = response.FeedCords;
            appState.cameraWorkerUnavCords = response.WorkerUnavCords;
        }
    }

    getTags = async () => {
        localStorage.removeItem('feedTag');
        localStorage.removeItem('DesignatedTag')
        const response = await this.api.Get(`routes/annotation/stitching/allTags`);
        if (response) {
            response.FeedTags.map(id => {
                appState.FeedTags.push(id.feedId)
                localStorage.setItem("feedTag", JSON.stringify(appState.FeedTags));
            });
            response.DesignatedTags.map(id => {
                appState.DesignatedTag.push(id.designatedAreaId);
                localStorage.setItem("DesignatedTag", JSON.stringify(appState.DesignatedTag));
            });;
        }
    }

    saveAnnotation = async (body, history) => {
        const response = await this.api.Post(`routes/annotation/stitching/addAnnotation`, body);
        if (response) {
            showActionModalComponent({
                message: 'Save Success',
                color: "success"
            })
           history.push("/stitching/setting");
        }
    }
}
