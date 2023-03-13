import { Skeleton, Box } from "@mui/material";

const boxesVariant = {
  width: { xs: "90%", md: "6rem" },
  height: { xs: "3rem", md: "4rem" },
  borderRadius: "10px",
};

const textVariant = {
  marginBottom: "1rem",
  marginTop: "2rem",
  width: "20%",
  height: "2rem",
};

const PhoneDetailsSkeleton = () => {
  return (
    <Box
      flexDirection={{ xs: "column", md: "row" }}
      display="flex"
      justifyContent={"center"}
      alignItems={{xs:'center'}}
      gap={{ xs: "1rem", md: "4rem" }}
      sx={{ p: 2 }}
    >
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          marginTop: "1.5rem",
          width: { xs: "90%", sm: "50%", md: "40%" },
          height: { xs: "300px", md: "400px" },
        }}
      />
      <Box sx={{ width: { xs: "100%", md: "50%" }, padding: "0" }}>
        <Skeleton
          animation="wave"
          variant="text"

          sx={{width:{xs:'40%',md:'50%'}, height:{xs:'4rem',md:'7rem'}}}
          height={ "7rem" }
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={"50%"}
          height={"2rem"}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={"50%"}
          height={"2rem"}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={"50%"}
          height={"2rem"}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={"50%"}
          height={"2rem"}
        />
        <Skeleton animation="wave" sx={textVariant} variant="text" />

        <Box display="flex" gap="1rem">
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
        </Box>
        <Skeleton animation="wave" sx={textVariant} variant="text" />

        <Box display="flex" gap="1rem">
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
          <Skeleton animation="wave" variant="rounded" sx={boxesVariant} />
        </Box>
        <Skeleton
          animation="wave"
          variant="text"
          width="100px"
          height="30px"
          sx={{ marginTop: "2rem" }}
        />
      </Box>
    </Box>
  );
};

export default PhoneDetailsSkeleton;
