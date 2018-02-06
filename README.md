# devbet_0

Hi,

Nowadays everyone talks about cryptocurrencies. There were many cases when people sold bitcoins at an extremely low price (one guy bought 2 pizzas for 10000 btc - currently worth about $100.000.000). Even I was thinking about buying 150 btc for about $15...

But what if we had a time machine able to transmit commands to cryptocurrency broker in the past? First of all, our global financial system would have crashed. Anyway, let’s imagine that we have one - or it is close to be created. We would like you, dirty hungry freelancer working for food, to create us an algorithm that would generate commands for our own broker client (that we had set up a year ago exactly to be used in future).

You may use python or javascript. Please test your solution with the attached test runner. The one who earns more money at the end of testing period would be selected to write bot for the real runner.

API specification v0.0.18

Task runner should be a pure function, that receives two arguments:

prices => [{"btc": 1000}, ...]. Day by day currency price in usd
initialSum => 100000. Initial usd balance And returns an array of commands. Commands are called one per day (so for 14 days we would have exactly 14 commands). Example: [{"op":"buy","amount":1},{"op":"sell","amount":1}]
Commands:

"buy" additional attributes: amount [float] Buys BTC using current USD account

"sell" additional attributes: amount [float] Sells BTC using current USD account

"pass" Simply skips current day

## Examples
JavaScript:
```javascript
const trader = async (prices, initialSum) => {
    return [
        {
            op: 'buy',
            amount: 500,
        }, 
    ];
};
```

Python:
```python
def trader(prices, initialSum):
    cmd = []
    cmd.append(
        {
            'op': 'buy',
            'amount': 500,
        })

    return cmd
```
