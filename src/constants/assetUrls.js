const cloudinaryImageBaseUrl = import.meta.env.VITE_CLOUDINARY_IMAGE_BASEURL;

const cloudinaryImage = (path, transformations) =>
  [cloudinaryImageBaseUrl, transformations, path].filter(Boolean).join("/");

const largeImageTransformations = "f_auto,q_auto,w_1920";

export const homeBg = cloudinaryImage(
  "v1779552313/home-bg_kibdgj.jpg",
  largeImageTransformations
);

export const bgimg = cloudinaryImage(
  "v1779552306/bgimg_f5k0vu.jpg",
  largeImageTransformations
);

export const imgGrid = cloudinaryImage(
  "v1779552309/img_grid_izxxch.png",
  largeImageTransformations
);

export const listImg1 = cloudinaryImage(
  "v1779552309/listImg1_vsupmu.png",
  largeImageTransformations
);

export const listImg2 = cloudinaryImage(
  "v1779552303/listImg2_zxiwpq.png",
  largeImageTransformations
);

export const logo = cloudinaryImage("v1779552303/logo_axlfmj.png");
