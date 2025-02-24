import React, { useEffect, useState } from "react";

import OfficerDashboard from "../components/officer/OfficerDashboard";
import { Container } from "react-bootstrap";

const OfficerPage = () => {

  // setAppointments(defaultAppointments)

  return (
    <Container>
      <OfficerDashboard/>
    </Container>
  );
};

export default OfficerPage;
