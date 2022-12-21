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
            <OverlayInner>{getMessageFromNumber(count)}</OverlayInner>
        </OverlayWrapper>
    );
}
