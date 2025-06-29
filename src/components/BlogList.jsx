import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import holdercloudbottom from "../assets/holdercloudbottom.svg";
import { Box, Container, Grid, Stack } from "@mui/material";
import PostCard from "./PostCard";
import axios from "axios";
import Home from "./Home";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";


const BlogList = ({ theme }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [posts]);

  const handleShare = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${id}`
      );
      toast.success("Link copied to clipboard", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        style: {
          background: "#a0d4ee",
          color: "#fff",
        },
        draggable: true,
      });
    } catch (err) {
      toast.error("Failed to copy link", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        draggable: true,
      });
    }
  };

  const handleEdit = (id, userId) => {
    if (localStorage.getItem("userId") === userId) {
      navigate(`/addpost/edit/${id}`);
    } else {
      toast.error("Please login to edit post", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        style: {
          background: "#ff0000",
          color: "#fff",
        },
        draggable: true,
      });
    }
  };

  const handleDelete = async (id, userId) => {
    if (localStorage.getItem("userId") === userId) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`, {});

        toast.success("Post deleted successfully", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
          style: {
            background: "#a0d4ee",
            color: "#fff",
          },
          draggable: true,
        });
        navigate("/");
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      toast.error("Please login to delete post", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        style: {
          background: "#ff0000",
          color: "#fff",
        },
        draggable: true,
      });
    }
  };

  if (posts.length === 0) return (
    <Loading/>
  );

  return (
    <>
      <Home />

      <List
        sx={{
          backgroundColor: "white",
          width: "100%",
          marginTop: "64px",
          marginBottom: "0",
          paddingBottom: "0",
        }}
      >
        <Header />
        <Container>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            {[...posts].reverse().map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                summary={post.summary}
                author={post.author}
                image={post.image}
                content={
                  post.content.length > 80
                    ? post.content.substring(0, 80) + "..."
                    : post.content
                }
                id={post.id}
                userId={post.userId}
                onShare={handleShare}
                onEdit={handleEdit}
                onDelete={handleDelete}
                theme={theme}
              />
            ))}
          </Grid>
        </Container>
        <Box
          component="img"
          sx={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            backgroundColor: "#a0d4ee",

            borderBottom: "none",
            display: "block",
            m: 0,
            p: 0,
          }}
          alt="wave"
          src={holdercloudbottom}
        />
      </List>
    </>
  );
};

export default BlogList;
