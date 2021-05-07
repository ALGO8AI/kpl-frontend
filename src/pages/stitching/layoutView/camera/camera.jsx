import React, { useState, useEffect, useRef } from 'react'
import cam from '../../../../Assets/images/cam.svg'
import { useHistory } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';
import { Spinner } from '../spinner';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',

        },
        cam: {
            boxShadow: '1px 1px 10px #170909',
            opacity: 0.7,
            "&:hover": {
                backgroundColor: 'white',
                opacity: 1,
            }
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        camtext: {
            fontSize: '12px'
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
    }),
);

export const Camera = observer((props) => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const { id, details, role } = props;

    const [videowall, setvideowall] = useState()
    const [camDetails, setcamDetails] = useState()

    const theme = useTheme();
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const onViewDetails = () => {
        const path = window.location.pathname == '/stitching/layoutView';
        if (role == 'admin' && !path) {
            history.push(`/stitching/annotation/${id}`);
        } else {
            history.push(`/stitching/viewdetails/${id}`);
        }
    }

    const prevOpen = React.useRef(open);
    useEffect(() => {
        details?.find((camera, index) => {
            console.log(camera.cameraId)
           // console.log(props.id)
            if (camera.cameraId === props.id) {
                setcamDetails(camera);
                const url = `http://3.23.114.42${camera.route}`
                setvideowall(url);
                console.log(camDetails)
            }
        })

        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div className={classes.cam}>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <img src={cam} alt="camera" />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <Card className={classes.root}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography variant="subtitle1" color="textSecondary" className={classes.camtext}>
                                                    <span>CameraID</span> : {camDetails && camDetails.cameraId} </Typography>
                                                <Typography variant="subtitle1" color="textSecondary" className={classes.camtext}>
                                                    <span>FeedID</span> : {camDetails && camDetails.feedId}</Typography>
                                                <Typography variant="subtitle1" color="textSecondary" className={classes.camtext}>
                                                    <span>Mechine ID</span> : {camDetails && camDetails.machineId} </Typography>
                                                <Typography variant="subtitle1" color="textSecondary" className={classes.camtext}>
                                                    <a> <span onClick={onViewDetails}>View Details</span></a></Typography>
                                            </CardContent>
                                        </div>
                                        <CardMedia
                                            className={classes.cover}
                                            image={videowall}
                                            title="live video"
                                        />
                                    </Card>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
})