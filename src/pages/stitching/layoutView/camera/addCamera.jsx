import React from "react";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import '../LayoutView.scss'
import { observer } from 'mobx-react';
import { appState } from '../LayoutStore';

export const AddCamera = observer((props) => {
    const [open, setOpen] = React.useState(false);
    const [CamName, setCamName] = React.useState();
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const myChangeHandler = (event) => {
        setCamName(event.target.value)
    }

    const addCamPostion = (e) => {
        alert(e.target.elements)
        const camValue = {
            cameraId: CamName,
            x: Number(props.x && props.x[0]),
            y: Number(props.y && props.y[1])
        }
        props.store.addCam(camValue)
    }

    return (
        <div>
            <Button className="add-cam-btn" onClick={handleClick}>Add Camera</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
                action={
                    <React.Fragment>
                        <form >
                            <h3 class="heading">Add Camera</h3><br />
                            <Grid container spacing={1} xs={12}>
                                <Grid item xs={12}>
                                    <div class="form-group">
                                        <label >Camera Name:</label>
                                        <input type="text" className="form-control" name="id" id="id" onChange={myChangeHandler} />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div class="form-group">
                                        <label htmlFor="place">Camera Position:</label>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div class="form-group">
                                        <label htmlFor="place">X:</label>
                                        <input type="text" className="form-control" name="x" value={props.x && props.x[0]} />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div class="form-group">
                                        <label htmlFor="place">Y:</label>
                                        <input type="text" name="y" className="form-control" value={props.y && props.y[1]} />
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                            <Button color="primary" variant="contained" className="mt-5" onClick={addCamPostion}>Add</Button>
                        <IconButton size="small" aria-label="close" color="inherit" className="close" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
})
