import React, { useEffect, useState } from "@rbxts/react";
import network from "../network";

export default function () {
	const [clicks, setClicks] = useState(0);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<textbutton
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={UDim2.fromOffset(100, 100)}
				Text={`Clicks: ${clicks}`}
				Event={{
					MouseButton1Click: () => {
						setClicks((e) => e + 1);
						network.clickEvent.fire();
					},
				}}
			/>
		</frame>
	);
}
