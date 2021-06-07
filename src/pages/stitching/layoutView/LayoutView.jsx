import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactCursorPosition from 'react-cursor-position';
import './LayoutView.scss'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { LayoutStore } from './LayoutStore';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { AddCamera } from './camera/addCamera';
import Button from '@material-ui/core/Button';
import { Camera } from './camera/camera'
import { observer } from 'mobx-react';
import { appState } from './LayoutStore';
import { Spinner } from './spinner';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: '25px',
            width: '98'
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        heading: {
            color: '#0e4a7b'
        },
    }),
);


export const LayoutViewPage = observer((props) => {
    const [value, setvalue] = useState(0);
    const [cood, setcood] = useState([])

    const { store } = props;
    const classes = useStyles();

    const getPos = (e) => {
        setcood([value.position.x, value.position.y])
    }

    const renderCamposition = () => {
        return appState.cameraPosition?.map((value) => {
            return (
                < div className="localDiv" style={{ transform: `translate(${value.x}px,${value.y}px)` }}>
                    <div className="contentBox" >
                        <Camera id={value.cameraId}
                            details={appState.cameraDetails}
                            role={store.Role()} />
                    </div>
                </div >
            )
        })
    }

    const renderFloor = () => {
        return (
            <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="tools">
                            <Button variant="contained" color="primary" onClick={zoomIn}> + </Button>
                            <Button variant="contained" color="primary" onClick={zoomOut}> - </Button>
                            <Button variant="contained" color="primary" onClick={resetTransform}> x </Button>
                        </div>
                        <TransformComponent>
                            <div className="nested">
                                <ReactCursorPosition {...
                                    {
                                        onPositionChanged: props => setvalue(props)
                                    }
                                }>
                                    <div className="main" onClick={getPos}>
                                        {
                                            renderCamposition()
                                        }
                                    </div>
                                </ReactCursorPosition>
                            </div>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        )
    }
    return (
        <div className="layout-main">
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <h1 className={classes.heading}>Layout View</h1>
                    </Grid>
                    {/* {store.Role() === 'admin' ?
                        <Grid item xs={12} sm={2}>
                            <Paper className={classes.paper}> <AddCamera x={cood} y={cood} store={store} /></Paper>
                        </Grid> : null
                    } */}

                    <Grid item xs={12} sm={1}>
                        <Paper className={classes.paper}>Floor</Paper>
                    </Grid>
                    <Grid item xs={6} sm={1}>
                        <Paper className={classes.paper}>  <ArrowBackIosIcon className="arrow-icon" /></Paper>
                    </Grid>
                </Grid>
            </div>


            {
                appState.cameraPosition.length == 0 ? <div className="layput-spinner">
                    <Spinner />
                </div> :

                    <div className="img-cntnr">
                        {renderFloor()}
                    </div>}
        </div>
    )
})


export class LayoutView extends React.Component {
    store;
    constructor() {
        super()
        this.store = new LayoutStore()
    }
    componentDidMount() {
        this.store.getCamera();
        this.store.getCameraDetails();
    }
    render() {
        return (
            <LayoutViewPage store={this.store} />
        )
    }

}
