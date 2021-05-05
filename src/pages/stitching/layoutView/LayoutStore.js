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
        console.log(response)
        if (response) {
            appState.cameraPosition = response.data
        }
    };

    addCam = async (camValue) => {
        const response = await this.api.Post(`routes/cameraDetail/addCamPosition`, camValue);
        if (response) {
            appState.cameraPosition = response
        }
    }

    getCameraDetails = async () => {
        const response = await this.api.Get(`routes/annotation/stitching/cameraDetails`);
        console.log(response)
        if (response) {
            appState.cameraDetails = response.FeedCords;
        }
    }

    getTags = async () => {
        const response = await this.api.Get(`routes/annotation/stitching/allTags`);
        console.log(response)
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
            console.log(appState.FeedTags)
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
            history.push("/stitching/layoutView");
        }
    }
}
