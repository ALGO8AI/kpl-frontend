import React, { useState, useEffect } from "react"
import pointDistancePrecision from 'react-image-annotate'
import ReactImageAnnotate from "react-image-annotate";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';
import { LayoutStore } from '../LayoutStore';

export const AnnotationPage = observer((props) => {
    var tags = [];
    const history = useHistory();

    const [tag, settagName] = useState("")

    let { cameraid } = useParams();

    const [details, setDetails] = useState();
    const [desgID, setdesgID] = useState();

    useEffect(() => {
        let result = appState.FeedTags?.map(value => value.feedId)
        let designatedId = appState.DesignatedTag.map(value => value.designatedAreaId)
        setDetails(result);
        setdesgID(designatedId);
    }, [])

    const coordinates = (data) => {
        const form = new FormData();
        const obj = { data }
        form.append(data, obj);
        props.store.saveAnnotation(obj, history)
    }

    console.log(appState.FeedTags)
    return (
        <div>
            <ReactImageAnnotate
                enabledTools={["create-box", "create-polygon"]}
                labelImages
                regionClsList={desgID}
                regionTagList={tags.concat(details)}
                images={[
                    {
                        src: appState.camearaValue.image,
                        name: 'FG2-S1',
                        regions: []
                    }

                ]}
                onExit={(value) => {
                    let widthValue = value.images[0].pixelSize.w
                    let heightValue = value.images[0].pixelSize.h
                    const values = []
                    console.log(value);
                    if (value.images[0].regions[0].type === 'polygon') {
                        let multipleBox = value.images[0].regions[0].points;
                        let dataCollection = multipleBox.map(function (value, index) {
                            let value1 = {
                                "x": Math.floor(value[0] * widthValue),
                                "y": Math.floor(value[1] * heightValue)
                            }
                            values.push(value1);
                        })

                    }
                    else {
                        let multipleBox = value.images[0].regions
                        let dataCollection = multipleBox.map(function (value, index) {
                            let value1 = {
                                "x": Math.floor(value.x * widthValue),
                                "y": Math.floor(value.y * heightValue),
                                "w": Math.floor(value.w * widthValue),
                                "h": Math.floor(value.h * heightValue),
                                "feedId": value.tags[0],
                                "designatedAreaId": value.cls
                            }
                            values.push(value1);
                        })
                    }
                    console.log(values);
                    coordinates(values);
                }
                }
            />
        </div>
    )
})

export class Annotation extends React.Component {
    store;
    constructor() {
        super()
        this.store = new LayoutStore()
    }
    async componentDidMount() {
        await this.store.getTags();
        await this.store.getCameraDetails();
        appState.cameraDetails?.find(function (camera, index) {
            if (camera.cameraId === 'FG2-S1') {
                appState.camearaValue = camera;
            }
        })
    }
    render() {
        return (
            <div>
                <h1>hai</h1>
                <AnnotationPage store={this.store} />
            </div>
        )
    }

}