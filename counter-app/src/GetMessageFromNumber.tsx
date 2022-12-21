export function getMessageFromNumber(count: number): string {
    return count === 0 ? "Click the button!" : `Clicked ${count} times`;
}
