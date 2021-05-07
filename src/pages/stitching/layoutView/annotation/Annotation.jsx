import React, { useEffect, useState } from "react"
import ReactImageAnnotate from "react-image-annotate";
// import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import img from '../../../../Assets/images/viewdetails.png';
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';
import { LayoutStore } from '../LayoutStore';
import { withRouter } from "react-router";
import { Spinner } from '../spinner';

export const AnnotationPage = observer((props) => {
    const history = useHistory();
    const coordinates = (data, width, height) => {
        const array = []
        data.map(obj => {
            if (obj.type === 'box') {
                array.push({
                    "x": Math.floor(obj.x * width),
                    "y": Math.floor(obj.y * height),
                    "w": Math.floor(obj.w * width),
                    "h": Math.floor(obj.h * height),
                    "feedId": obj.tags ? obj.tags[0] : "",
                    "type": obj.type,
                    "designatedAreaId": obj.cls
                })
            } else {
                const pointvalue = [];
                obj.points.map(point => {
                    pointvalue.push(
                        Math.floor(point[0]*width),
                        Math.floor(point[1]*height)
                    )
                })
                array.push({
                    "x":pointvalue[0], 
                    "y":pointvalue[1],
                    "w": Math.floor(0 * width),
                    "h": Math.floor(0 * height),
                    "points": {
                        ...pointvalue,
                    },
                    "type": obj.type,
                    "feedId": obj.tags ? obj.tags[0] : "",
                    "designatedAreaId": obj.cls
                })
            }
        })
        const body = {
            'data': array
        }
        console.log(body)
        // props.store.saveAnnotation(body, history)
    }
    console.log(localStorage.getItem('anImage'))
    return (
        <div>
            <ReactImageAnnotate
                enabledTools={["create-box", "create-polygon"]}
                labelImages
                regionClsList={JSON.parse(localStorage.getItem("DesignatedTag"))}
                regionTagList={JSON.parse(localStorage.getItem("feedTag"))}
                images={[
                    {
                        src: localStorage.getItem('anImage'),
                        name: props.id,
                        regions: []
                    }

                ]}
                onCommentInputClick={(value) => {
                    console.log(value)
                }}
                onExit={(value) => {
                    let widthValue = value.images[0].pixelSize.w
                    let heightValue = value.images[0].pixelSize.h
                    const values = []
                    // if (value.images[0].regions[0].type === 'polygon') {
                    //     // let multipleBox = value.images[0].regions[0].points;
                    //     // multipleBox.map((value, index) => {
                    //     //     let value1 = {
                    //     //         "x": Math.floor(value[0] * widthValue),
                    //     //         "y": Math.floor(value[1] * heightValue)
                    //     //     }
                    //     //     values.push(value1);
                    //     // })

                    // }
                    // else {
                    //     let multipleBox = value.images[0].regions
                    //     // multipleBox.map((value, index) => {
                    //     //     let value1 = {
                    //     //         "x": Math.floor(value.x * widthValue),
                    //     //         "y": Math.floor(value.y * heightValue),
                    //     //         "w": Math.floor(value.w * widthValue),
                    //     //         "h": Math.floor(value.h * heightValue),

                    //     //         "feedId": value.tags[0],
                    //     //         "designatedAreaId": value.cls
                    //     //     }
                    //     //     values.push(value1);
                    //     // })
                    // }
                    coordinates(value.images[0].regions, widthValue, heightValue);
                }
                }
            />
        </div>
    )
})

export class _Annotation extends React.Component {
    store;
    id
    constructor(props) {
        super(props)
        this.store = new LayoutStore()
        this.id = props.match.params.id;
    }

    async componentDidMount() {
        alert('anno')
        await this.store.getTags();
        await this.store.getCameraDetails();
        appState.cameraDetails?.find((camera, index) => {
            if (camera.cameraId === this.id) {
                appState.camearaValue = camera;
                localStorage.setItem('anImage', appState.camearaValue.image)
            }
        })
    }
    render() {
        return (
            <AnnotationPage store={this.store} id={this.id} />
        )
    }

}

export const Annotation = withRouter(_Annotation);