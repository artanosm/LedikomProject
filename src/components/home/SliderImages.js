import { Carousel } from "react-carousel-minimal";
import classes from "./SliderImages.module.css";
const images = [
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/1/1663416099-1-1920x800.jpg?v=1",
  },
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/9/1675495571-9-1920x800.jpg?v=1",
  },
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/9/1665413528-9-1920x800.jpg?v=1",
  },
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/3/1648652568-3-1920x800.jpg?v=1",
  },
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/2/1664010366-2-1920x800.jpg?v=1",
  },
  {
    image:
      "https://admin.ledikom.mk/uploads/banners/3/1664010548-3-1920x800.jpg?v=1",
  },
];
const SliderImages = () => {


  return (
    <div className={classes.sliderContainer}>
      <Carousel
        data={images}
        time={3000}
        width="100%"
        height="100%"
        radius="0px"
        automatic={true}
        dots={true}
        slideBackgroundColor="black"
        slideImageFit="contain"
        style={{
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "0",
          padding: "0",
        }}
      />
    </div>
  );
};

export default SliderImages;
