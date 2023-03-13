import { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import AuthContext from "../../store/auth-context";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SnackBar from "../../ui/SnackBar";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { db } from "../firebase";
import { doc, updateDoc, collection } from "firebase/firestore";

const RatingCom = ({ rating, phoneId }) => {
  const authCtx = useContext(AuthContext);
  const [alert, setAlert] = useState(false);
  const [review, setReview] = useState(false);
  const [reviewAlert, setReviewAlert] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const userDataRef = collection(db, "users");
  const docRef = doc(db, "products", phoneId);

  useEffect(() => {
    const seeIfReviewed = () => {
      if (authCtx?.user) {
        let ratedDevices = authCtx?.userData?.ratedDevices;
        for (const device of ratedDevices) {
          device === phoneId && setReview(true);
        }
      }
    };
    return seeIfReviewed();
  }, []);

  let ratingValue;
  if (rating.numRatings === 0) {
    ratingValue = 0;
  } else {
    ratingValue = Number(rating?.overall / rating?.numRatings).toFixed(1);
  }
  function ratingHandler(e) {
    if (review) {
      setReviewAlert(true);
      return;
    }
    if (!authCtx?.user?.uid) {
      setAlert(true);
    } else {
      let val = +e.target.value;
      const updateRating = {
        numRatings: rating.numRatings + 1,
        overall: +rating.overall + val,
      };
      updateDoc(docRef, {
        rating: { ...updateRating },
      }).then(() => {
        setReviewSent(true);
        let updateRated = [...authCtx?.userData?.ratedDevices, phoneId];
        updateDoc(doc(userDataRef, authCtx?.user?.uid), {
          ratedDevices: updateRated,
        }).then(() => {
          setReview(true);
        });
      });
    }
  }

  return (
    <Stack
      flexDirection={"row"}
      alignContent="center"
      justifyContent="center"
      alignItems="flex-end"
      spacing={1}
      gap="10px"
    >
      <SnackBar
        color={"rgba(251, 140, 0,.8)"}
        message="You already reviewed this item"
        handleClose={() => setReviewAlert(false)}
        alert={reviewAlert}
        icon={<PriorityHighIcon />}
      />
      <SnackBar
        color={"rgba(255, 0, 0, .8)"}
        message="Sign in to rate item"
        handleClose={() => setAlert(false)}
        alert={alert}
        icon={<CancelIcon />}
      />
      <SnackBar
        color={"rgba(75, 183, 75, .8)"}
        message="Review sent"
        handleClose={() => setReviewSent(false)}
        alert={reviewSent}
        icon={<CheckIcon />}
      />
      <Typography sx={{ color: "gray" }} component="legend">
        {ratingValue ? ratingValue : "No Rating"}
      </Typography>
      <Rating
        onChange={ratingHandler}
        name="half-rating"
        value={+ratingValue}
        precision={0.5}
      />
      <Typography
        sx={{ color: "gray" }}
      >{`(${rating.numRatings} reviews)`}</Typography>
    </Stack>
  );
};

export default RatingCom;
