# BetCountdown

When you place a bet on our system, we need to calculate a delay time, so that our system can perform
various checks.

A bet is placed against an `Outcome`, i.e. `Man-U to Win against Everton in the Premiership`

An outcome contains 3 components:
- A `market`, in this case `Man-U v. Everton , who will Win?`
- A event, in this case `Man-U v. Everton`
- A sport, in this case `Football` 

This delay varies based on 4 parameters:
- The `Stage` of the sporting event. There are 2 stages:
    -  `UPCOMING` (the event is about to start)
    -  `LIVE` (the event is in play)
- The delay assigned to the `offer` 
- The delay assiged to the `event`
- The delay assigned to the `sport`

## Singles
This is an example outcome object; please spend a moment to see how all the parameters are displayed:

```
const singleOutcome = {
      eventStage: Stage.UPCOMING,

      offerTicketDelayLive: 4,
      offerTicketDelayUpcoming: 1,

      eventTicketDelayLive: 5,
      eventTicketDelayUpcoming: 2,

      sportTicketDelayLive: 6,
      sportTicketDelayUpcoming: 3,
    };
```

### Business Rules
The business rules for calculating the delay for this outcome are as follows:

- Return the maximum upcoming delay, across all 3 parameters (offer, event, sport)
    - in this case, `3`, as it is the largest of `1,2,3` 
    - were the event to be `Stage.Live` then the result would be `6`, the largest of `4,5,6` 

## Accumalators

However, our platform also offers `betting accumalators`, a product where you can bet for multiple outcomes to win all together.

An example of an accumalator is `Man-U to Win against Everton in the Premiership` **AND** `England to win against Australia in the Ashes`.

In this case, there are 2 outcomes that are being bet on at the same time. 

```
const manuVeverton = {
      eventStage: Stage.LIVE,

      offerTicketDelayLive: 4,
      offerTicketDelayUpcoming: 1,

      eventTicketDelayLive: 5,
      eventTicketDelayUpcoming: 2,

      sportTicketDelayLive: 6,
      sportTicketDelayUpcoming: 3,
    };

const englandVaustralia = {
      eventStage: Stage.UPCOMING,

      offerTicketDelayLive: 5,
      offerTicketDelayUpcoming: 2,

      eventTicketDelayLive: 6,
      eventTicketDelayUpcoming: 3,

      sportTicketDelayLive: 7,
      sportTicketDelayUpcoming: 4,
    };
```

### Business Rules
- We need to calculate the delay for each outcome independantly, and take the maximum.
    - The delay for `manuVeverton` should be `6`
    - The delay for `englandVaustralia` should be `4`
    - So, we must return `6`
- There is no limit to the number of outcomes in an accumalator. We need calculations to work for `n` outcomes.

## Task
- Using the included Jest `.spec` file, fix `delayCalculator()` to make the test pass.

- Please include comments for any supporting considerations you have made relating to your solution, example:
    -  security, performancy or maintainability.

If you have any questions relating to this code challenge, please contact the team at [backend.dev@kwiff.com](mailto:backend.dev@kwiff.com)

Good Luck !
