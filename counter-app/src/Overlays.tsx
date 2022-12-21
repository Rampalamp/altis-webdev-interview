import { OverlayWrapper, OverlayInner } from "./StyledComponents";
import { getMessageFromNumber } from "./GetMessageFromNumber";

interface OverlayProps {
    count: number;
}

export function Overlay({ count }: OverlayProps): JSX.Element {
    //silly math
    //const displayNumber = doImportantMath(count);
    return (
        <OverlayWrapper>
            <div
                style={{
                    padding: "24px",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    borderRadius: "12px",
                }}
            >
                {getMessageFromNumber(count)}
            </div>
        </OverlayWrapper>
    );
}
