import { delayCalculator, Stage, delayCalculatorDynamic } from '../src/BetCountdown'

describe('Create', () => {
  test('Should use BetCountdown to calculate delay correctly', () => {
    // This is a template outcome we will be testing against
    const outcome = {
      eventStage: Stage.UPCOMING,

      offerTicketDelayLive: 4,
      offerTicketDelayUpcoming: 1,

      eventTicketDelayLive: 5,
      eventTicketDelayUpcoming: 2,

      sportTicketDelayLive: 6,
      sportTicketDelayUpcoming: 3,
    };

    //---------------------------------------------> TEST 1 <---------------------------------------------
    const upcomingOutcome = { ...outcome, eventStage: Stage.UPCOMING };
    const liveOutcome = { ...outcome, eventStage: Stage.LIVE };

    const upcomingDelay = delayCalculator([upcomingOutcome]);
    const upcomingDelay2 = delayCalculator([{ ...upcomingOutcome, sportTicketDelayUpcoming: 2 }]);

    const liveDelay = delayCalculator([liveOutcome]);
    const liveAndUpcomingDelay = delayCalculator([liveOutcome, upcomingOutcome]);
    const liveAndUpcomingDelayIgnoreUpcoming = delayCalculator([liveOutcome, { ...upcomingOutcome, sportTicketDelayLive: 7 }]);
    const liveAndUpcomingDelayIgnoreLive = delayCalculator([liveOutcome, { ...upcomingOutcome, sportTicketDelayUpcoming: 7 }]);
    // Assert
    expect(upcomingDelay).toEqual(3);
    expect(upcomingDelay2).toEqual(2);
    expect(liveDelay).toEqual(6);
    expect(liveAndUpcomingDelay).toEqual(6); // 'should always take the max of the outcomes delays'
    expect(liveAndUpcomingDelayIgnoreUpcoming).toEqual(6); // 'live delays of upcoming events should be ignored'
    expect(liveAndUpcomingDelayIgnoreLive).toEqual(7); // 'upcoming delays may be larger than live delays'


    //---------------------------------------------> TEST 2 WITH DYNAMIC KEYS DELAY CALCULATOR <---------------------------------------------
    const upcomingDelay_2 = delayCalculatorDynamic([upcomingOutcome]);
    const upcomingDelay2_2 = delayCalculatorDynamic([{ ...upcomingOutcome, sportTicketDelayUpcoming: 2 }]);

    const liveDelay_2 = delayCalculatorDynamic([liveOutcome]);
    const liveAndUpcomingDelay_2 = delayCalculatorDynamic([liveOutcome, upcomingOutcome]);
    const liveAndUpcomingDelayIgnoreUpcoming_2 = delayCalculatorDynamic([liveOutcome, { ...upcomingOutcome, sportTicketDelayLive: 7 }]);
    const liveAndUpcomingDelayIgnoreLive_2 = delayCalculatorDynamic([liveOutcome, { ...upcomingOutcome, sportTicketDelayUpcoming: 7 }]);
    // Assert
    expect(upcomingDelay_2).toEqual(3);
    expect(upcomingDelay2_2).toEqual(2);
    expect(liveDelay_2).toEqual(6);
    expect(liveAndUpcomingDelay_2).toEqual(6); // 'should always take the max of the outcomes delays'
    expect(liveAndUpcomingDelayIgnoreUpcoming_2).toEqual(6); // 'live delays of upcoming events should be ignored'
    expect(liveAndUpcomingDelayIgnoreLive_2).toEqual(7); // 'upcoming delays may be larger than live delays'
  });
});
