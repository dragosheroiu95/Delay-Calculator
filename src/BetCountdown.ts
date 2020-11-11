export interface Outcome {
    eventStage: Stage;

    offerTicketDelayLive: number;
    offerTicketDelayUpcoming: number;

    eventTicketDelayLive: number;
    eventTicketDelayUpcoming: number;

    sportTicketDelayLive: number;
    sportTicketDelayUpcoming: number;
};

export enum Stage {
    UPCOMING = 1,
    LIVE = 2,
}

// TO DO add key mapping solution and rename delayCalculator with dynamic
const DELAY_KEY_MAPPING = {
    [Stage.UPCOMING]: ['offerTicketDelayUpcoming', 'eventTicketDelayUpcoming', 'sportTicketDelayUpcoming'],
    [Stage.LIVE]: ['offerTicketDelayLive', 'eventTicketDelayLive', 'sportTicketDelayLive'],
}

// The delayCalculator function must 
// - receive an input of type Outcome Array
// - return an output of type number
export type DelayCalculator = (input: Outcome[]) => number;



/**
 * Delay calculator with dynamic outcome keys
 * @param outcomes 
 */
export const delayCalculatorDynamic: DelayCalculator = (outcomes) => {

    // We consider that we will always have at least one element, otherwise an `if` statement will be required
    const firstOutcome = outcomes[0];

    // If any new property will be added these keys will make sure it will be included for calculating the delay
    const LIVE = 'live';
    const UPCOMING = 'upcoming';

    // We take the keys only once, because they are the same for each outcome
    const upcomingKeys = Object.keys(firstOutcome).filter(key => key.toLowerCase().includes(UPCOMING))
    const liveKeys = Object.keys(firstOutcome).filter(key => key.toLowerCase().includes(LIVE))

    // Get maximum delay for one outcome
    const getMaxDelay = (outcome: any) => {
        const keysForDelay = (outcome.eventStage === Stage.UPCOMING ? upcomingKeys : liveKeys);
        return Math.max(...keysForDelay.map(key => outcome[key]))
    }
    return Math.max(...outcomes.map(outcome => getMaxDelay(outcome)))
};

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
    obj[key];

/**
 * Delay calculator with known keys ---> this requires `DELAY_KEY_MAPPING` to be maintained
 * @param outcomes 
 */
export const delayCalculator: DelayCalculator = (outcomes) => {

    // Get maximum delay for one outcome
    const getMaxDelay = (outcome: Outcome) => {
        return Math.max(...DELAY_KEY_MAPPING[outcome.eventStage].map((key) => getKeyValue(outcome)(key as keyof Outcome)))
    }
    return Math.max(...outcomes.map(outcome => getMaxDelay(outcome)))
};