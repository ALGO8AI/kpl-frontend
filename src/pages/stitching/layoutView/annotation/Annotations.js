import pointDistancePrecision from 'react-image-annotate'
import ReactImageAnnotate from "react-image-annotate";
import { useState, useEffect } from 'react'
// import annotateStyle from './annotation.css'
import axios from 'axios'
import { useParams } from "react-router";
import {
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
import { withRouter } from "react-router";

function _Annotation(props) {
    var tags = [];
    const history = useHistory();
    const [tag, settagName] = useState("")
    let { cameraid } = useParams();
    const [details, setDetails] = useState();
    const [desgID, setdesgID] = useState();
    const [url, seturl] = useState()
    useEffect(() => {
        console.log(props.match.params.id)
        axios.get(`http://3.23.114.42:3000/routes/annotation/stitching/allTags`).
            then(res => {
                let feedtag = res.data.FeedTags;
                let DesignatedTag = res.data.DesignatedTags;
                let result = feedtag.map(value => value.feedId)
                let designatedId = DesignatedTag.map(value => value.designatedAreaId)
                setDetails(result);
                setdesgID(designatedId);
            })

        axios.get(`http://3.23.114.42:3000/routes/annotation/stitching/cameraDetails`)
            .then(res => {
                let values = res.data.FeedCords
                const findCam = values.find((camera, index) => {
                    if (camera.cameraId === props.match.params.id) {
                        seturl(camera.image);
                    }
                })
            })

    }, [])

    console.log(url)
    const coordinates = (data) => {
        const form = new FormData();
        const obj = { data }
        form.append(data, obj);
        console.log(obj);
        axios.post(`http://3.23.114.42:3000/routes/annotation/stitching/addAnnotation`, obj,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => {
            alert("Updated Succesfully");
            history.push("/stitching/layoutView");
            console.log(res);
        }).catch(e => {
            alert("Error Occured");
        })
    }

    function getValue(e) {
        settagName(e.target.value);
    }

    function createTag() {
        setDetails(details.concat(tag));
        console.log(details)

    }
    console.log(url)
    return (
        <div>
            <h1>hai</h1>
            <div className="maingrid">
                <div className="annotatebox">
                    {
                        console.log(details)
                    }
                    {

                        <ReactImageAnnotate
                            enabledTools={["create-box", "create-polygon"]}
                            labelImages
                            regionClsList={desgID}
                            regionTagList={tags.concat(details)}
                            images={[
                                {
                                    src: url,
                                    name: details?.cameraId,
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
                    }


                </div>
            </div>
        </div>

    )

}

export const Annotation = withRouter(_Annotation);