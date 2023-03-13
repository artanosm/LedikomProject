
const MapComponent = () => {
  return (
    <iframe
      title="Address"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.6264516705487!2d21.441342715443742!3d42.008291765235676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13541509df5bf5af%3A0xfe0e776dc1a10e8e!2sLedikom%20Mobile%20Store!5e0!3m2!1sen!2smk!4v1675710021588!5m2!1sen!2smk"
      style={{
        border: 0,
        width: "100%",
        height: "600px",
        paddingBottom: "2rem",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default MapComponent;
