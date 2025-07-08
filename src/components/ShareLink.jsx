import { Box } from "@mui/material";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const ShareLink = ({ id }) => {
  const baseURL = import.meta.env.VITE_BASEURL;
  const shareURL = `${baseURL}/single-product/${id}`
  const title = "Checkout This Product."
  return (
    <>
    <Box display="flex" columnGap={2}>
      <FacebookShareButton
        url={shareURL}
        title={title}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={shareURL}
        title={title}
      >
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
      <RedditShareButton
        url={shareURL}
        title={title}
      >
        <RedditIcon size={40} round={true} />
      </RedditShareButton>
      <TelegramShareButton
        url={shareURL}
        title={title}
      >
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>
    </Box>
    </>
  );
};

export default ShareLink;
