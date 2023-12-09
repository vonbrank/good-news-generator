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
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import goodNewsUrl from "../../assets/good_news.jpg";
import badNewsUrl from "../../assets/bad_news.jpg";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import html2canvas from "html2canvas";
import { useAppDispatch } from "../../store/hooks";
import { showTemporaryToastText } from "../../store/reducers/toast";
import GitHubIcon from "@mui/icons-material/GitHub";

const fontFamilyDefault = `"Roboto","Helvetica","Arial",sans-serif`;
const fontFamilySongTi = `"NSimSun","FangSong",sans`;
const fontFamilyHeiti = `"Source Han Sans CN","Microsoft Yahei","Arial",sans-serif`;
const fontFamilyKaiti = `"STKaiti","KaiTi",sans`;

interface Fonts {
  default: string;
  songTi: string;
  heiTi: string;
  kaiTi: string;
}

const fonts: Fonts = {
  default: fontFamilyDefault,
  songTi: fontFamilySongTi,
  heiTi: fontFamilyHeiti,
  kaiTi: fontFamilyKaiti,
};

const Home = () => {
  const [contentText, setContentText] = useState("");

  const [newsType, setNewsType] = useState("good-news-type");

  const imageElementRef = useRef<HTMLDivElement | null>(null);

  const getCurrentImageCanvas = async () => {
    const current = imageElementRef.current;
    if (current === null) return null;

    const canvas = await html2canvas(current);
    return canvas;
  };

  const handleDownloadImage = async () => {
    const canvas = await getCurrentImageCanvas();
    if (canvas === null) return;
    const imageUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "good-news.png";
    link.href = imageUrl;
    link.click();
  };

  const dispatch = useAppDispatch();

  const handleCopyToClipBoard = async () => {
    const canvas = await getCurrentImageCanvas();
    if (canvas === null) return;
    canvas.toBlob((blob) => {
      if (blob === null) {
        dispatch(
          showTemporaryToastText({
            severity: "error",
            message: "图片渲染失败，请重试",
          })
        );
        return;
      }
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
      dispatch(
        showTemporaryToastText({
          severity: "info",
          message: "图片已复制到剪贴板",
        })
      );
    });
  };

  const [textSizePt, setTextSizePt] = useState(24);
  const textSizePx = (textSizePt * 4) / 3;
  const textSizeRem = `${textSizePx / 10}rem`;
  const textColor = newsType === "good-news-type" ? "#dc3023" : "#5a5a5a";

  const [textAlignType, setTextAignType] = useState("center");
  const [fontFamily, setFontFamily] = useState<keyof Fonts>("default");

  const handleReset = () => {
    setNewsType("good-news-type");
    setTextAignType("center");
    setFontFamily("default");
    setContentText("");
    setTextSizePt(24);
  };

  const theme = useTheme();
  const breakpointDownSm = useMediaQuery(theme.breakpoints.down("md"));

  const buttonGroup = (
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
      <Button variant="outlined" onClick={handleCopyToClipBoard}>
        复制到剪贴板
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        重置
      </Button>
    </Stack>
  );

  return (
    <Container>
      <Stack sx={{ height: "100vh", padding: "6.4rem" }}>
        <Typography variant="h3" textAlign={"center"} marginBottom={"3.2rem"}>
          喜报生成器 Pro
        </Typography>
        <Paper
          sx={{
            width: "100%",
            flex: 1,
            height: 0,
          }}
          elevation={6}
        >
          <Stack
            direction={breakpointDownSm ? "column" : "row"}
            height="100%"
            sx={{
              overflowX: "hidden",
              overflow: breakpointDownSm ? "auto" : "hidden",
            }}
          >
            <Stack
              sx={{
                flex: breakpointDownSm ? "0 1 auto" : 5,
                width: breakpointDownSm ? "100%" : 0,
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
                sx={{ position: "relative", overflow: "hidden" }}
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
                      color: textColor,
                      fontSize: textSizeRem,
                      fontWeight: 600,
                      textAlign: textAlignType,
                      fontFamily: fonts[fontFamily],
                      "&.empty-line::after": {
                        content: `''`,
                        display: "inline-block",
                        width: "100%",
                      },
                    },
                  }}
                >
                  <Stack
                    paddingTop={"8.4rem"}
                    paddingBottom={"4.8em"}
                    paddingX={"6.4rem"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent={"center"}
                  >
                    {contentText.split("\n").map((line) => (
                      <>
                        {line !== "" ? (
                          <>
                            {textAlignType !== "justify" ? (
                              <Typography>{line}</Typography>
                            ) : (
                              <Typography
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {line.split("").map((char, index) => (
                                  <span key={index}>{char}</span>
                                ))}
                              </Typography>
                            )}
                          </>
                        ) : (
                          <Typography className="empty-line"> </Typography>
                        )}
                      </>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Divider
              orientation={breakpointDownSm ? "horizontal" : "vertical"}
            />
            <Stack
              sx={{
                flex: breakpointDownSm ? "0 1 auto" : 3,
                overflowY: breakpointDownSm ? "visible" : "auto",
                position: "relative",
              }}
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
                    <ToggleButtonGroup
                      value={textAlignType}
                      exclusive
                      size="small"
                      onChange={(_, newTextAlignType) =>
                        setTextAignType(newTextAlignType)
                      }
                    >
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
                  <SideItemBlock label="字号 (pt)">
                    <TextField
                      value={textSizePt}
                      type="number"
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (!isNaN(newValue) && newValue > 0) {
                          setTextSizePt(newValue);
                        }
                      }}
                    />
                  </SideItemBlock>
                  <SideItemBlock label="字体">
                    <TextField
                      value={fontFamily}
                      select
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        setFontFamily(e.target.value as keyof Fonts);
                      }}
                    >
                      <MenuItem value="default">默认</MenuItem>
                      <MenuItem value="songTi">宋体</MenuItem>
                      <MenuItem value="heiTi">黑体</MenuItem>
                      <MenuItem value="kaiTi">楷体</MenuItem>
                    </TextField>
                  </SideItemBlock>
                </Stack>
              </Stack>
              {!breakpointDownSm && buttonGroup}
            </Stack>
            {breakpointDownSm && (
              <Stack justifyContent={"flex-end"} sx={{ flex: 1 }}>
                {buttonGroup}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
      <Box
        width="6.4rem"
        height="6.4rem"
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <Link
          href="https://github.com/vonbrank/good-news-generator"
          target="_blank"
        >
          <Stack
            width="12.8rem"
            height="12.8rem"
            sx={{
              backgroundColor: (theme) => theme.palette.common.black,
              color: (theme) => theme.palette.common.white,
              position: "absolute",
              top: "-125%",
              right: "-125%",
              transform: "rotate(45deg)",
              "&:hover .MuiSvgIcon-root": {
                width: "3.6rem",
                height: "3.6rem",
              },
            }}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <GitHubIcon
              color="inherit"
              sx={{
                width: "3.2rem",
                height: "3.2rem",
                transition: "all 0.3s",
              }}
            />
          </Stack>
        </Link>
      </Box>
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
