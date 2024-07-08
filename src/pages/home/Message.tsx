import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { drawerWidth } from "layouts/main-layout";
import { postNotification } from "apis/admin";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["전체 회원", "챌린지 참여중인 회원"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">알림 대상</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="알림 대상" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const Message = () => {
  const [messageContent, setMessageContent] = useState("");
  const [messageTitle, setMessageTitle] = useState("");

  const handleMessageChange = (event) => {
    setMessageContent(event.target.value);
  };
  const handleMessageTitleChange = (event) => {
    setMessageTitle(event.target.value);
  };
  const handleSendClick = async () => {
    try {
      console.log("Message content:", messageContent, messageTitle);
      postNotification({ title: messageTitle, message: messageContent });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      component="main"
      columns={12}
      spacing={3.75}
      flexGrow={1}
      pt={4.375}
      pr={1.875}
      pb={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0 },
      }}
      style={{ alignSelf: "baseLine" }}
    >
      <Grid xs={12} lg={12}>
        <Stack
          bgcolor="background.paper"
          borderRadius={5}
          width={1}
          boxShadow={(theme) => theme.shadows[4]}
          height={1}
        >
          <Stack
            direction={{ sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            padding={3.75}
            gap={3.75}
          >
            <Typography variant="h5" color="text.primary">
              알림 보내기
            </Typography>
          </Stack>
          <Divider />
          <Stack height={1} style={{ padding: 20 }}>
            <MultipleSelect />
            <div style={{ color: "#686868", marginLeft: 10 }}>
              개별회원에게 보내고싶은 경우,{" "}
              <span style={{ color: "blue" }}>사용자 목록</span>에서 사용자를
              선택해주세요
            </div>
            <TextField
              id="standard-helperText"
              label="상세알림 타이틀"
              defaultValue="Default Value"
              variant="standard"
              value={messageTitle}
              onChange={handleMessageTitleChange}
              style={{ marginTop: 20 }}
            />
            <TextField
              id="outlined-multiline-static"
              label="상세알림 내용"
              multiline
              rows={4}
              placeholder="내용을 작성해주세요"
              value={messageContent}
              onChange={handleMessageChange}
              style={{ marginTop: 20 }}
            />
            <Button
              variant="contained"
              style={{ width: 200, marginTop: 20, alignSelf: "end" }}
              onClick={handleSendClick}
            >
              보내기
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={12} lg={12}>
        {/* <ChallengeSuccessRate /> */}
      </Grid>
    </Grid>
  );
};

export default Message;
