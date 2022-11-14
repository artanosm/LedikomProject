import React, { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import InputMui from "../signForms/InputMui";
import { Box } from "@mui/system";
import { Button, IconButton, Stack, Avatar } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { v4 } from "uuid";

import { db } from "../firebase";
import { updateDoc, doc, collection } from "firebase/firestore";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";

const ProfileForm = ({ setEdit }) => {
  const authCtx = useContext(AuthContext);
  const enteredNameRef = useRef("");
  const enteredAddressRef = useRef("");
  const enteredCityRef = useRef("");
  const enteredPhoneNumberRef = useRef("");

  const userDataRef = collection(db, "users");
  const photoProfileRef = ref(storage, `/${authCtx.user.uid}/profilePicture`);

  //   useEffect(() => {
  //     list(photoProfileRef).then((res) => {
  //         console.log(res.items[0].fullPath);
  //       getDownloadURL(res?.items[0]).then((url) => setProfilePic(url));
  //     });
  //   }, []);

  const uploadImage = (image) => {
    if (image == null) return;
    list(photoProfileRef).then((res) => {
      const existing = res.items[0].fullPath;
      const deleteProfilePic = ref(storage, existing);

      deleteObject(deleteProfilePic).then(console.log("Old profile picture deleted"));
    });
    const photoToUpload = ref(
      storage,
      `${authCtx.user.uid}/profilePicture/${image.name + v4()}`
    );
    uploadBytes(photoToUpload, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateDoc(doc(userDataRef, authCtx.user.uid), {
          photoProfile: url,
        }).then(console.log('New profile picture uploaded'));
      });
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredName = enteredNameRef.current.value;
    const enteredAddress = enteredAddressRef.current.value;
    const enteredCity = enteredCityRef.current.value;
    const enteredPhoneNumber = enteredPhoneNumberRef.current.value;

    await updateDoc(doc(userDataRef, authCtx.user.uid), {
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      phoneNumber: enteredPhoneNumber,
    });

    setEdit(false);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar src={authCtx.user?.photoURL} /> */}
          <Avatar src={authCtx.userData?.photoProfile} />
          <IconButton
            size="small"
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                uploadImage(e.target.files[0]);
              }}
            />
            <PhotoCamera />
          </IconButton>
        </Stack>
        <InputMui
          ref={enteredNameRef}
          label={"Name"}
          type={"text"}
          id={"name"}
          defaultValue={authCtx.userData?.name}
        />
        <InputMui
          ref={enteredAddressRef}
          label={"Address"}
          type={"text"}
          id={"address"}
          defaultValue={authCtx.userData?.address}
        />

        <InputMui
          ref={enteredCityRef}
          label={"City"}
          type={"text"}
          id={"City"}
          defaultValue={authCtx.userData?.city}
        />
        <InputMui
          ref={enteredPhoneNumberRef}
          label={"Phone Number"}
          type={"text"}
          id={"phone-number"}
          defaultValue={
            authCtx.userData?.phoneNumber
              ? authCtx.userData?.phoneNumber
              : "+389"
          }
        />
      </Box>
      <Button type="submit">Save Changes</Button>
      <Button color="error" onClick={() => setEdit(false)}>
        Cancel
      </Button>
    </form>
  );
};

export default ProfileForm;
