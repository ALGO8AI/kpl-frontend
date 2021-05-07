import React,{useState} from 'react'
import { Stage, Layer, Image, Rect, Line, Label, Text, Tag } from 'react-konva';
import useImage from 'use-image';
import { useParams } from 'react-router-dom'
// import img from '../../../../Assets/images/viewdetails.png';
import { LayoutStore } from '../LayoutStore';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../LayoutView.scss';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';
import { Spinner } from '../spinner';
import { withRouter } from "react-router";

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

    const { store } = props;

    const classes = useStyles();
    
    const rows = [
        createData('camera ID:', appState.camearaValue.cameraId),
        createData('WingID :', appState.camearaValue.wing),
        createData('LineID :', appState.camearaValue.lineID),
        createData('FeedID', appState.camearaValue.feedId),
        createData('MachineID', appState.camearaValue.machineId),
    ];

    const renderFloor = () => {
        return (
            <TransformWrapper>
                <TransformComponent>
                    <Viewimage id={props.id} store={store} />
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
                {
                    appState.camearaPositions.length == 0 ? <div className="layput-spinner">
                        <Spinner /></div> :

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
                        </div>}
            </div>

        </>
    )

})

function createData(name, id) {
    return { name, id };
}

export const Viewimage = observer((props) => {
    const [image1] = useImage(appState.camearaValue.image)
    const [pointArr, setpointArr] = useState([347,519,727,648,573,479,142,347]);
    const renderBox = () => {
        return appState.cameraDetails?.map(obj => {
            if (obj.cameraId === props.id) {
                return (
                    <>
                        <Label
                            x={(obj && obj.x) - 10}
                            y={(obj && obj.y) - 10}>
                            <Tag fill="white"
                                scaleX={1.2}
                                scaleY={1.4}
                                pointerDirection={'down'}
                                pointerHeight={10}
                                pointerWidth={10}
                            />
                            <Text
                                text={obj.machineId + " ," + obj.feedId}
                                fontSize={14}
                                fill={"blue"}
                                lineCap={"round"}
                                offsetY={-3}
                                offsetX={-7}
                            />
                        </Label>
                        <Rect
                            x={obj && obj.x}
                            y={obj && obj.y}
                            width={obj && obj.w}
                            height={obj && obj.h}
                            stroke="lightgreen"
                        />
                        <Line
                            points={obj.points}
                            stroke={"lightblue"}
                            strokeWidth={3}
                            closed={true}
                            />
                    </>
                )
            }
        })
    }

    const renderworker = () => {
        return appState.cameraWorkerUnavCords?.map(obj => {
            if (obj.cameraId === props.id) {
                return (
                    <>
                        <Label
                            x={(obj && obj.x) - 10}
                            y={(obj && obj.y) - 10}>
                            <Tag fill="white"
                                scaleX={1.2}
                                scaleY={1.4}
                                pointerDirection={'down'}
                                pointerHeight={10}
                                pointerWidth={10}
                            />
                            <Text
                                text={obj.machineId + " ," + obj.designatedAreaId}
                                fontSize={14}
                                fill={"blue"}
                                lineCap={"round"}
                                offsetY={-3}
                                offsetX={-7}
                            />
                        </Label>
                        <Rect
                            x={obj && obj.x}
                            y={obj && obj.y}
                            width={obj && obj.w}
                            height={obj && obj.h}
                            stroke="lightgreen"
                        />
                        <Line
                            points={obj.points}
                            stroke={"lightblue"}
                            strokeWidth={3}
                            closed={true}
                         />
                    </>
                )
            }
        })
    }

    return (
        <div>
            { image1 == undefined ? <div >
                <Spinner /></div> :

                <Stage
                    width={1050}
                    height={700}>
                    <Layer>
                        <Image
                            image={image1} />
                    </Layer>
                    <Layer>
                        {renderBox()}
                        {renderworker()}
                    </Layer>
                </Stage>}
        </div>
    )
})


export class _ViewDetails extends React.Component {
    store;
    id
    constructor(props) {
        super(props)
        this.store = new LayoutStore()
        this.id = props.match.params.id;
    }
    async componentDidMount() {
        await this.store.getCameraDetails();
        appState.cameraDetails?.find((camera, index) => {
            if (camera.cameraId === this.id) {
                appState.camearaValue = camera;
                console.log(camera)
                let posV = {
                    x: camera.x,
                    y: camera.y,
                    w: camera.w,
                    h: camera.h
                }
                appState.camearaPositions.push(posV);

            }
        })
    }
    render() {
        return (
            <ViewDetailsPage store={this.store} id={this.id} />
        )
    }

}

export const ViewDetails = withRouter(_ViewDetails)