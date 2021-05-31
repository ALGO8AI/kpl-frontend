import { observer } from 'mobx-react';
import * as React from 'react';
import { portals } from "mobx-portals";
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';

export const SuccessActionModalComponent = observer((props) => {
  const dismissModal = () => {
    props.unmount();

  };
  return (
    <div>
      <Dialog onClose={dismissModal} aria-labelledby="simple-dialog-title" open={true}>
        <Alert onClose={dismissModal} severity={props.color}>
          {props.message}
        </Alert>
      </Dialog>
    </div>
  );
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function showActionModalComponent(args) {
  const res = portals.render({
    id: 'success_component',
    component: <SuccessActionModalComponent {...args} />,
  });
  return res.waitForUnmount;
}
