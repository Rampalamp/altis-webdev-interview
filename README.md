# After thoughts / notes

I have done a quick refactor to show how much code is either redundant or simply unnecessary.

Moved the getMessage function to its own file since it's used in multiple spots.

Moved all the styled-components into its own file.

There seems to be no style/coding standards. Inconsistent use of paranthesis and semicolons

1. New files
    1. StyledComponents.tsx
    2. GetMessageFromNumber.tsx
2. Altered files
    1. App.tsx
    2. Overlays.tsx

Given the complexity/size of the application, there is no need for such frivolous component abstraction.

## App.tsx

1. Inconsistent semicolon, the C# in me means I lean towards using semicolons, but if you want to really enforce semicolons or not, I would install/add a .prettierrc

2. Again this is just a preference, not sure if its considered best practice, but I try my best to not pass in a bunch of variables to my components. It can get disorganized real fast, likely prone to more bugs and also slower debugging. Also if you are passing in setCount to Contents, why not just handle all the reset logic within the Contents component.

3. The general setup for this app means that every single component is going to re-render when the count changes (at least I believe thats how it works, don't quote me...), which may not seem like a big issue with such a small scale counting app but as the project grows it can only get worse for performance.

4. Due to the simplicity of this app, I would probably end up pulling the code out of the Contents component. It makes more sense to me given the goal of the application.

```
import React, {useState} from 'react';
import styled from 'styled-components';
import {Contents} from "./Contents";
import {Overlay} from "./Overlays";

const Page = styled.div`
  height: 100vh;
`

export function App(): JSX.Element {
    const [count, setCount] = useState<number>(0)

    const handleReset = () => {
        setCount(0)
    }

    return (
        <Page>
            <Overlay count={count}/>
            <Contents count={count} setCount={setCount} onReset={handleReset}/>
        </Page>
    );
}
```

## Overlays.tsx

1. Card imported but never used. eslint be yellin at me.

2. We have a styled.div but then in the return statement there is another div but with inline css, just not ideal to do something a different way for no particular reason. We need some code standards/guidelines up in here.

3. Semicolons inconsistent

4. ### doImportantMath()

    1. Not sure why this function exists, it's only purpose seems to be to cause misinformation, we have enough of that in our lives I reckon.

5. ### getMessage()

    1. This method is vague and does not embrace why we would use typescript in the first place.
    2. I would likely rename it getMessageFromNumber()
    3. Add a type to the parameter of 'number', and a return type of 'string'
    4. Redundant logic here can probably clean it up into one line

    ```
        return count === 0 ? "Click the button!" : `Clicked ${count} times`;

    ```

6. Another preference of mine, but I like to make my export the last statement, so I would probably swap the functions to be above the export.

```
import styled from "styled-components";
import {Card} from "./Card";

const Wrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0px;
`

interface OverlayProps {
    count: number;
}

export function Overlay({count}: OverlayProps): JSX.Element {
    const displayNumber = doImportantMath(count);

    const message = getMessage(displayNumber)

    return <Wrapper>
        <div style={{
            padding: "24px",
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            borderRadius: "12px"
        }}>
            {message}
        </div>
    </Wrapper>
}

function doImportantMath(count: number): number {
    return count + 3 * Math.pow(count, 2);
}

function getMessage(count: any): any {
    if (count === 0) {
        return "Click the button!";
    } else if (count === 1) {
        return `Clicked ${count} times`
    } else {
        return `Clicked ${count} times`
    }
}
```

## Contents.tsx

1. useState not being used, don't think you need the React either, so can probably just get rid of that import line entirely.

2. styled.div Wrapper has some formatting issues when used in the return statement.

3. The return statement is missing the paranthesis,but other components adhere to the return(codeHere); standard, so just some code inconsistencies, like the semicolons

4. Again, move the function above the export statement

5. ### getMessage()

    1. Same as Overlay.tsx, redundant logic checks, and poor typing.

6. ### handleButtonClicked / handleResetClicked

    1. These aren't necessary I don't think, just creating more spaghetti code that is more prone to bugs. If you are set on passing them into the Buttons component, why not just pass in the count/setCount directly.
    2. As mentioned in the App.tsx the onReset is not necessary, why not just do setCount(0);

7. If I were set on using this Contents component, I would probably want to scrap the Buttons component, they do not justify the making of a brand new component + passing variables further down the pipeline.

```
import styled from "styled-components";
import React, {useState} from "react";
import {Buttons} from "./Buttons";
import {Card} from "./Card";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: gray;
`

interface ContentsProps {
    count: number;
    setCount: (count: number) => void;
    onReset: () => void;
}

export function Contents({count, setCount, onReset}: ContentsProps): JSX.Element {
    const handleButtonClicked = () => {
        setCount(count + 1)
    }

    const handleResetClicked = () => {
        onReset()
    }

    const message = getMessage(count);

    return <
        Wrapper>
        <Card>
            {message}
            <Buttons onReset={handleResetClicked} onClicked={handleButtonClicked} count={count}/>
        </Card>
    </Wrapper>
}


function getMessage(count: any): any {
    if (count === 0) {
        return "Click the button!";
    } else if (count === 1) {
        return `Clicked ${count} times`
    } else {
        return `Clicked ${count} times`
    }
}
```

## Card.jsx

1. I'd probably just move this styled.div directly into the Contents component, definitely not worth making it it's own file.

2. Probably would want to rename the extension to .tsx as opposed to .jsx unless the developer has a good argument to be different.

```
import styled from "styled-components";

export const Card = styled.div`
  padding: 24px 24px 24px 24px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px
  border-radius: 12px;
`
```

## Buttons.tsx

1. This component receives the setCount function, but is never used.

2. The commented out get from server code, this is probably a good time to use a .env file, so you dont have the server address in plain text on the repo.

3. return statement missing paranthesis

4. ### handleButtonClicked / handleResetClicked
    1. Again, these are basically redundant. Functions are being passed in, why wrap them in another function and not just place them inline with the Button component
    ```
    <Button onClick={onClick}>Click me</Button>
    ```
5. I would suggest making the Reset button fixed, instead of hiding if the count is 0. A UI that shifts unexpectedly when being interacted with, unless its a mini game, is no bueno.

6. The 'const a' is very poorly named, at least call it resetButton, just anything other than a single character. Can also just do this inline making the declaration of a const variable unnecessary.

```
import React from "react";
import styled from "styled-components";
// import axios from "axios"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  min-width: 200px;
`;

const Button = styled.button`
  border: 0;
  border-radius: 6px;
  padding: 6px;
  width: 72px;
  background: lightseagreen;
  color: white;
  cursor: pointer;
`;

interface ButtonsProps {
    onClicked: () => void;
    onReset: () => void;
    count: number;
    setCount?: (count: number) => void;
}

export function Buttons({onClicked, onReset, count, setCount}: ButtonsProps): JSX.Element {
    const handleButtonClicked = () => {
        onClicked()
    }

    const handleResetClicked = async () => {
        onReset()

        // console.log("Grab from server")
        // const result = await axios.get('https://altislabs.com')
    }

    const a = count ? <Button onClick={handleResetClicked}>Reset</Button> : null;

    return <Wrapper>
        <Button onClick={handleButtonClicked}>Click me</Button>
        {a}
    </Wrapper>
}
```

## Widget.tsx

1. Seems pretty useless, not referenced anywhere that I can see, remove from src files to make things cleaner.

```
export function Widget() {
    return <></>
}
```

## Dockerfile

My experience with docker is minimal, but the only thing that jumps out to me is there is no 'CMD ["npm","start"]' so I am skeptical if this Dockerfile will run the container after all of the setup.

Again, I could be totally wrong about that.

```
FROM node:alpine AS build

WORKDIR /app

COPY ./counter-app/package.json /app/

RUN npm install

COPY ./counter-app /app/

RUN npm run build

FROM nginx:alpine


COPY --from=build /app/build/ /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN ls -la /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
```
