import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';

const PostCard = (props) => {
  const {
    title,
    content,
    summary,
    image,
    id,
    author,
    userId,
    onShare,
    onEdit,
    onDelete,
  } = props;

  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id, userId);
    handleClose();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        minWidth: 550,
        margin: "20px auto",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {(!imageLoaded && !imageError) && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress color="black"/></Box>}
      <CardMedia
        component="img"
        height="200"
        image={imageError ? 'https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg' : image }
        alt="Blog post image"
        sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4, display: imageLoaded ? 'block' : 'none' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/post/${id}`}>
          <Button size="small" sx={{ color: "black", fontWeight: "bold" }}>
            Read More
          </Button>
        </Link>
        <Button
          size="small"
          sx={{ color: "black", fontWeight: "bold" }}
          onClick={() => onShare(id)}
        >
          Share
        </Button>
        {userId === localStorage.getItem("userId") && (
          <>
            <IconButton
              onClick={() => onEdit(id, userId)}
              sx={{ color: "black" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleClickOpen} sx={{ color: "black" }}>
              <DeleteIcon />
            </IconButton>
          </>
        )}

        <Typography variant="body2" color="black">
          <HistoryEduIcon />
          {author}
        </Typography>
      </CardActions>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f0f0f0",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textAlign: "center",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "black" }}
          >
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "red" }} onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PostCard;
