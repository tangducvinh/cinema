//PacmanLoader
import { useState, CSSProperties } from "react";
import {PacmanLoader} from 'react-spinners'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

const Loading = () => {
    return (
        <div className="w-screen h-screen inset-0 bg-gray-200 flex items-center absolute justify-center">
            <div className="flex flex-col items-center gap-3">
            <PacmanLoader
                color={"#E89E2C"}
                loading={true}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <p>Chờ xíu nhé...!</p>
            </div>
        </div>
    )
}

export default Loading