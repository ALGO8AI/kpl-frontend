import React, { useState, useEffect } from 'react'
import { Stage, Layer, Image, Rect, Label, Text, Tag } from 'react-konva';
import useImage from 'use-image';
import { useParams } from 'react-router-dom'
import img from '../../../../Assets/images/viewdetails.png'
import { LayoutStore } from '../LayoutStore';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../LayoutView.scss'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: '25px'
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        table: {
            minWidth: 0,
        },
        imgBox: {
            marginTop: '30px'
        }
    }),
);

export const ViewDetailsPage = observer((props) => {
    const [details, setdetails] = useState(null);

    let { cameraid } = useParams();

    const [url, seturl] = useState();

    const { store } = props;

    const classes = useStyles();

    useEffect(() => {
        appState.cameraDetails?.find(function (camera, index) {
            if (camera.cameraId === cameraid) {
                seturl(camera.image);
                setdetails(camera)
            }
        })
    }, [])

    const rows = [
        createData('camera ID:', 159, 6.0, 24, 4.0),
        createData('WingID :', details && details.wing),
        createData('LineID :', details && details.lineID),
        createData('FeedID', details && details.feedId),
        createData('MachineID', details && details.machineId),
    ];

    const renderFloor = () => {
        return (
            <TransformWrapper>
                <TransformComponent>
                    <Viewimage id={cameraid} store={store} />
                </TransformComponent>
            </TransformWrapper >
        )
    }

    const renderLiveList = () => {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <h1>Layout View</h1>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Paper className={classes.paper}> view</Paper>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Paper className={classes.paper}>Floor</Paper>
                    </Grid>
                    <Grid item xs={6} sm={1}>
                        <Paper className={classes.paper}>  <ArrowBackIosIcon className="arrow-icon" /></Paper>
                    </Grid>
                </Grid>
                <div className={classes.imgBox}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <div className="viewdetails-img">
                                {renderFloor()}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            {renderLiveList()}
                        </Grid>
                    </Grid>
                </div>
            </div>

        </>
    )

})

function createData(name, id) {
    return { name, id };
}

export const Viewimage = observer((props) => {

    const [details, setdetails] = useState(null);
    const [pos, setpos] = useState([]);
    const { store } = props;

    useEffect(() => {
        appState.cameraDetails?.find(function (camera) {
            if (camera.cameraId === props.id) {
                let posV = {
                    x: camera.x,
                    y: camera.y,
                    w: camera.w,
                    h: camera.h
                }
                setpos(old => [...old, posV]);
                setdetails(camera);
            }
        })
    }, [])

    const [image1, status] = useImage(details && details.image)


    return (
        <div className="imageContainer">
            {
                status === "loaded" &&
                <Stage
                    width={1050}
                    height={700}>
                    <Layer>
                        <Image
                            image={image1} />
                    </Layer>
                    <Layer>
                        {
                            pos.map((value, index) => (
                                <React.Fragment>
                                    <Label
                                        x={(value && value.x) - 10}
                                        y={(value && value.y) - 10}>
                                        <Tag fill="white"
                                            scaleX={1.2}
                                            scaleY={1.4}
                                            pointerDirection={'down'}
                                            pointerHeight={10}
                                            pointerWidth={10}
                                        />
                                        <Text
                                            text={details && details.machineId}
                                            fontSize={14}
                                            fill={"blue"}
                                            lineCap={"round"}
                                            offsetY={-3}
                                            offsetX={-7}
                                        />
                                    </Label>
                                    <Rect
                                        x={value && value.x}
                                        y={value && value.y}
                                        width={value && value.w}
                                        height={value && value.h}
                                        stroke="lightgreen"
                                    />
                                </React.Fragment>
                            ))
                        }

                    </Layer>

                    {/* {   line.map((lines,index)=>(
                            <Line
                            key={index}
                            points={lines.points}
                            stroke={"black"}
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            />
                        ))
                    } */}
                </Stage>
            }
        </div>
    )
})


export class ViewDetails extends React.Component {
    store;
    constructor() {
        super()
        this.store = new LayoutStore()
    }
    componentDidMount() {
        this.store.getCameraDetails();
    }
    render() {
        return (
            <ViewDetailsPage store={this.store} />
        )
    }

}