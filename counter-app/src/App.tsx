import { useState } from "react";
import { Contents } from "./Contents";
import { Overlay } from "./Overlays";
import { getMessageFromNumber } from "./GetMessageFromNumber";
import {
    Button,
    ButtonWrapper,
    Page,
    ContentsWrapper,
    Card,
} from "./StyledComponents";

export function App(): JSX.Element {
    const [count, setCount] = useState<number>(0);

    return (
        <Page>
            <Overlay count={count} />
            <ContentsWrapper>
                <Card>
                    {getMessageFromNumber(count)}
                    <ButtonWrapper>
                        <Button
                            onClick={() => {
                                setCount(count + 1);
                            }}
                        >
                            Click me
                        </Button>
                        <Button
                            onClick={() => {
                                setCount(0);
                            }}
                        >
                            Reset
                        </Button>
                    </ButtonWrapper>
                </Card>
            </ContentsWrapper>
        </Page>
    );
}
