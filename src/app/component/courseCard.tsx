"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Rating } from "@mui/material";

export default function CourseCard() {
  return (
    <Card sx={{ maxWidth: 350, minWidth: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ maxHeight: 180 , minHeight: 180}}
          image="asdf"
          alt="course's thumbnail goes here"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={"flex justify-around"}>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}