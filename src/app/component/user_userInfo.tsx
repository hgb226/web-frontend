"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";

function BirthdatePick() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker disabled value={value}
                  onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
  </Box>
);

export default function UserInfoCard() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h3">
          Your information
        </Typography>
        <div className={"flex flex-row gap-8 w-full"}>
          <div className={"flex flex-col gap-2 w-1/2"}>
            <Typography variant="h5" component="div">
              First name
            </Typography>
            <TextField
              disabled
              id="fist-name-textfield"
              defaultValue="Hello World"
            />
          </div>
          <div className={"flex flex-col gap-2 w-1/2"}>
            <Typography variant="h5" component="div">
              Last name
            </Typography>
            <TextField
              disabled
              id="last-name-textfield"
              defaultValue="Hello World"
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2"}>
          <Typography variant="h5" component="div">
            Email
          </Typography>
          <TextField
            disabled
            id="email-textfield"
            defaultValue="Hello World"
          />
        </div>
        <div className={"flex flex-col gap-2"}>
          <Typography variant="h5" component="div">
            Birthday
          </Typography>
          <BirthdatePick />
        </div>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" color="secondary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
