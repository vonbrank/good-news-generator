import React, { useRef, useState } from "react";
import {
  Container,
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  alpha,
  Divider,
  Paper,
} from "@mui/material";
import goodNewsUrl from "../../assets/good_news.jpg";
import badNewsUrl from "../../assets/bad_news.jpg";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import html2canvas from "html2canvas";

const Home = () => {
  const [contentText, setContentText] = useState("");

  const [newsType, setNewsType] = useState("good-news-type");

  const imageElementRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = async () => {
    const current = imageElementRef.current;
    if (current === null) return;

    const canvas = await html2canvas(current);
    const imageUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "good-news.png";
    link.href = imageUrl;
    link.click();
  };

  return (
    <Container>
      <Stack sx={{ height: "100vh", padding: "6.4rem" }}>
        <Typography variant="h3" textAlign={"center"} marginBottom={"3.2rem"}>
          喜报生成器 Pro
        </Typography>
        <Paper
          sx={{
            width: "100%",
            flex: 3,
            height: 0,
            overflow: "hidden",
          }}
          elevation={6}
        >
          <Stack direction={"row"} height="100%">
            <Stack
              sx={{
                flex: 5,
                width: 0,
                "& img": {
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                },
              }}
              justifyContent={"start"}
              alignItems={"center"}
              padding={"1.6rem"}
            >
              <Stack
                ref={imageElementRef}
                height={"auto"}
                width="100%"
                maxHeight={"100%"}
                sx={{ position: "relative" }}
              >
                <img
                  src={newsType === "good-news-type" ? goodNewsUrl : badNewsUrl}
                  alt="good news"
                />
                <Stack
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    "& .MuiTypography-root": {
                      color: "#dc3023",
                      fontSize: "3.2rem",
                      fontWeight: 600,
                    },
                    "& br": {
                      height: "calc(3.2rem * 1.5)",
                    },
                  }}
                >
                  <Stack
                    paddingTop={"8.4rem"}
                    paddingBottom={"4.8em"}
                    sx={{ width: "100%", height: "100%" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    {contentText.split("\n").map((line) => (
                      <>
                        {line !== "" ? (
                          <Typography>{line}</Typography>
                        ) : (
                          <br></br>
                        )}
                      </>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Divider orientation="vertical" />
            <Stack
              sx={{ flex: 3, overflowY: "auto", position: "relative" }}
              spacing="3.2rem"
              justifyContent={"space-between"}
            >
              <Stack spacing="3.2rem" padding={"1.6rem"}>
                <TextField
                  label="内容"
                  value={contentText}
                  onChange={(event) => setContentText(event.target.value)}
                  multiline
                  rows={5}
                  sx={{ flex: 1 }}
                  fullWidth
                />
                <Stack
                  sx={{ flex: 1 }}
                  justifyContent={"space-between"}
                  spacing={"1.6rem"}
                >
                  <SideItemBlock label="类型">
                    <ToggleButtonGroup
                      exclusive
                      size="small"
                      value={newsType}
                      onChange={(_, newNewsType) => setNewsType(newNewsType)}
                    >
                      <ToggleButton
                        value="good-news-type"
                        aria-label="good news type"
                      >
                        <Typography>喜报</Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="bad-news-type"
                        aria-label="bad news type"
                      >
                        <Typography>悲报</Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>

                  <SideItemBlock label="对齐方式">
                    <ToggleButtonGroup exclusive size="small">
                      <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                      </ToggleButton>
                      <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                      </ToggleButton>
                      <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                      </ToggleButton>
                      <ToggleButton value="justify" aria-label="justified">
                        <FormatAlignJustifyIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </SideItemBlock>

                  <SideItemBlock label="字体大小">
                    <TextField select fullWidth size="small">
                      {["5pt", "5.5pt", "6.5pt"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </SideItemBlock>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: (theme) => theme.palette.common.white,
                  boxShadow: (theme) =>
                    `0 1.2rem 2.4rem ${alpha(theme.palette.common.black, 1)}`,
                }}
                padding={"1.2rem"}
              >
                <Button variant="outlined" onClick={handleDownloadImage}>
                  下载
                </Button>
                <Button variant="outlined">复制到剪贴板</Button>
                <Button variant="outlined">重置</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

interface SideItemBlockProps {
  label?: string;
  children?: React.ReactNode;
}

const SideItemBlock = (props: SideItemBlockProps) => {
  const { label = "", children = <></> } = props;
  return (
    <Stack direction={"row"} alignItems={"center"} spacing="1.6rem">
      <Box sx={{ width: "8.4rem" }}>
        <Typography sx={{ fontSize: "1.8rem" }}>{label}</Typography>
      </Box>
      <Box sx={{ flex: 1, width: 0 }}>{children}</Box>
    </Stack>
  );
};

export default Home;
