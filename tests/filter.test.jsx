import { render, screen } from "@testing-library/react";
import {Filter} from "../components";

describe("App", () => {
  it("renders without crashing", () => {
    render(<Filter handleChangeFilterValue={()=>{}}/>);
    expect(
      screen.getAllByText("SpacEx Launch Programs")[0]
    ).toBeInTheDocument();
  });
 
});
