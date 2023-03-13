import  { useContext,useState } from "react";
import AuthContext from "../../store/auth-context";
import InputMui from "../signForms/InputMui";
import CircularProgress from "@mui/material/CircularProgress";

import { Box } from "@mui/system";
import { Button, IconButton, Stack, Avatar } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { v4 } from "uuid";
import { Formik, Form } from "formik";
import { object, string, number } from "yup";

import { db } from "../firebase";
import { updateDoc, doc, collection } from "firebase/firestore";
import { storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,

  deleteObject,
  list,
} from "firebase/storage";

const ProfileForm = ({ setEdit }) => {
  const authCtx = useContext(AuthContext);
  const [photoProgress, setPhotoProgress] = useState(100);

  const userDataRef = collection(db, "users");
  const photoProfileRef = ref(storage, `users/${authCtx.user.uid}/profilePicture`);

  const uploadImage = (image, actions) => {
    if (image == null) {
      actions.setSubmitting(false);

      return;
    }
    console.log(photoProfileRef)
    list(photoProfileRef).then((res) => {
      const existing = res.items[0]?.fullPath;
      const deleteProfilePic = ref(storage, existing);

      deleteObject(deleteProfilePic).then(
        console.log("Old profile picture deleted")
      );
    });
    const photoToUpload = ref(
      storage,
      `users/${authCtx.user.uid}/profilePicture/${image.name + v4()}`
    );

    const uploadTask = uploadBytesResumable(photoToUpload, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPhotoProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("here");
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
          updateDoc(doc(userDataRef, authCtx.user.uid), {
            photoProfile: url,
          }).then(console.log("New profile picture uploaded"));
        });
      }
    );
  };

  const initialFormState = {
    name: authCtx.userData?.name,
    address: authCtx.userData?.address,
    city: authCtx.userData?.city,
    phoneNumber: authCtx.userData?.phoneNumber,
  };

  const validationSchema = object({
    name: string(),
    address: string(),
    city: string(),
    phoneNumber: number(),
  });

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    await updateDoc(doc(userDataRef, authCtx.user.uid), {
      name: values.name,
      address: values.address,
      city: values.city,
      phoneNumber: values.phoneNumber,
    });
    actions.setSubmitting(false);
    setEdit(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: { xs: "90%", sm: "60%", md: "30%" },
      }}
    >
      <Formik
        initialValues={initialFormState}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Stack pb={1} direction="row" alignItems="center" spacing={2}>
              {photoProgress === 100 ? (
                <Avatar src={authCtx.userData?.photoProfile} />
              ) : (
                <CircularProgress variant="determinate" value={photoProgress} />
              )}
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
                    uploadImage(e.target.files[0], formik);
                  }}
                />
                <PhotoCamera />
              </IconButton>
            </Stack>
            <InputMui name={"name"} label={"Name"} type={"text"} id={"name"} />
            <InputMui
              name={"address"}
              label={"Address"}
              type={"text"}
              id={"address"}
            />

            <InputMui name={"city"} label={"City"} type={"text"} id={"City"} />
            <InputMui
              name={"phoneNumber"}
              label={"Phone Number"}
              type={"text"}
              id={"phone-number"}
            />
            <Button sx={{ textTransform: "none" }} type="submit">
              Save Changes
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              color="error"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileForm;

// import React, { useContext } from "react";
// import AuthContext from "../../store/auth-context";
// import InputMui from "../signForms/InputMui";
// import { Box } from "@mui/system";
// import { Button, IconButton, Stack, Avatar } from "@mui/material";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import { v4 } from "uuid";
// import { Formik, Form } from "formik";
// import { object, string, number } from "yup";

// import { db } from "../firebase";
// import { updateDoc, doc, collection } from "firebase/firestore";
// import { storage } from "../firebase";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
//   list,
// } from "firebase/storage";

// const ProfileForm = ({ setEdit }) => {
//   const authCtx = useContext(AuthContext);

//   const userDataRef = collection(db, "users");
//   const photoProfileRef = ref(storage, `/${authCtx.user.uid}/profilePicture`);

//   const uploadImage = (image, actions) => {
//     if (image == null) {
//       actions.setSubmitting(false);

//       return;
//     }
//     list(photoProfileRef).then((res) => {
//       const existing = res.items[0]?.fullPath;
//       const deleteProfilePic = ref(storage, existing);

//       deleteObject(deleteProfilePic).then(
//         console.log("Old profile picture deleted")
//       );
//     });
//     const photoToUpload = ref(
//       storage,
//       `${authCtx.user.uid}/profilePicture/${image.name + v4()}`
//     );
//     uploadBytes(photoToUpload, image).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         updateDoc(doc(userDataRef, authCtx.user.uid), {
//           photoProfile: url,
//         }).then(console.log("New profile picture uploaded"));
//       });
//     });
//   };

//   const initialFormState = {
//     name: authCtx.userData?.name,
//     address: authCtx.userData?.address,
//     city: authCtx.userData?.city,
//     phoneNumber: authCtx.userData?.phoneNumber,
//   };

//   const validationSchema = object({
//     name: string(),
//     address: string(),
//     city: string(),
//     phoneNumber: number(),
//   });

//   const submitHandler = async (values, actions) => {
//     actions.setSubmitting(true);
//     await updateDoc(doc(userDataRef, authCtx.user.uid), {
//       name: values.name,
//       address: values.address,
//       city: values.city,
//       phoneNumber: values.phoneNumber,
//     });
//     actions.setSubmitting(false);
//     setEdit(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-end",
//         width: { xs: "90%", sm: "60%", md: "30%" },
//       }}
//     >
//       <Formik
//         initialValues={initialFormState}
//         onSubmit={submitHandler}
//         validationSchema={validationSchema}
//       >
//         {(formik) => (
//           <Form>
//             <Stack pb={1} direction="row" alignItems="center" spacing={2}>
//               <Avatar src={authCtx.userData?.photoProfile} />
//               <IconButton
//                 size="small"
//                 color="primary"
//                 aria-label="upload picture"
//                 component="label"
//               >
//                 <input
//                   hidden
//                   accept="image/*"
//                   type="file"
//                   onChange={(e) => {
//                     uploadImage(e.target.files[0], formik);
//                   }}
//                 />
//                 <PhotoCamera />
//               </IconButton>
//             </Stack>
//             <InputMui name={"name"} label={"Name"} type={"text"} id={"name"} />
//             <InputMui
//               name={"address"}
//               label={"Address"}
//               type={"text"}
//               id={"address"}
//             />

//             <InputMui name={"city"} label={"City"} type={"text"} id={"City"} />
//             <InputMui
//               name={"phoneNumber"}
//               label={"Phone Number"}
//               type={"text"}
//               id={"phone-number"}
//             />
//             <Button sx={{ textTransform: "none" }} type="submit">
//               Save Changes
//             </Button>
//             <Button
//               sx={{ textTransform: "none" }}
//               color="error"
//               onClick={() => setEdit(false)}
//             >
//               Cancel
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default ProfileForm;
