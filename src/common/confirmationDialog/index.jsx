import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box
} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';

const ConfirmationDialog = ({ open, title, message, onConfirm, onClose, dialogType }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{sx:{
      width:"450px", maxWidth:"900px", border:"none"
    }}}>
      <DialogTitle style={{backgroundColor:"#cbd4cf", padding:"10px 15px"}}>
        <Box display="flex" alignItems="center" gap={1} sx={{height:"25px"}}>
          {dialogType === "Cancel" && (
            <ReportIcon sx={{ color: "red" }} style={{fontSize:"30px"}}/>
          )}
          <Typography variant="h6" style={{fontWeight:"bold"}}>{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent style={{padding:"20px 28px"}}>
        <DialogContentText style={{color:"black"}}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm} style={{backgroundColor:"#27496d", border:"1px solid #27496d", padding:"5px 30px", fontWeight:"bold"}}>
          Yes
        </Button>
        <Button onClick={onClose} style={{backgroundColor:"#cbd4cf", color:"white", border:"1px solid #27496d", padding:"5px 30px", fontWeight:"bold"}}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;