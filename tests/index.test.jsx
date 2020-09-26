import { render, screen } from "@testing-library/react";
import App from "../pages/index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App data={[]} />);
    expect(
      screen.getAllByText("SpacEx Launch Programs")[0]
    ).toBeInTheDocument();
  });
  it("renders a card with the flight id", () => {
    render(
      <App
        data={[
          {
            flight_id: "FlightId",
            launch_success: true,
            year:"0000",
            land_success:false,
            links:{
                mission_atch_small:"",
            },
            mission_id:['mission_id'],
          },
        ]}
      />
    );
    expect(screen.getByText("mission_id")).toBeInTheDocument();
  });
});
