import { Skeleton, Box } from "@mui/material";

const PhoneItemSkeleton = () => {
  return (
    <Box 
    display='flex'
    flexDirection='column'
    justifyContent='flex-start'
    alignItems='center'
    alignContent='flex-start'
    p={1}
    m={0}
      sx={{
        width: { xs: "165px",sm:'200px', md: "250px" },
        height: { xs: "200px",sm:'230px', md: "290px" },
        // border:'1px solid black'
      }}
    >
      <Skeleton variant="rounded" width='90%' height='100%' sx={{borderRadius:'5px'}} />
      <Skeleton variant="text" width='90%' height='30px' />
      <Skeleton variant="text" width='90%' height='25px' />
    </Box>
  )
}

export default PhoneItemSkeleton