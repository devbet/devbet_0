

function isNextDayRaise(prices, day) {
  if (!prices[day + 1]) {
    return false;
  }

  return prices[day].btc < prices[day + 1].btc;
}
function isNextDayFall(prices, day) {
  if (!prices[day + 1]) {
    return false;
  }

  return prices[day].btc > prices[day + 1].btc;
}

function getNextRaises(prices, day) {
  let isRaised = true;
  let i = day;
  while (isRaised) {
    isRaised = isNextDayRaise(prices, i);
    i++; 
  }

  return prices.slice(day + 1, i);
}

function getNextFalls(prices, day) {
  let isFelt = true;
  let i = day;
  while (isFelt) {
    isFelt = isNextDayFall(prices, i);
    i++; 
  }

  return prices.slice(day + 1, i);
}

function USD2BTC(usd, price) {
  return usd / price;
}

function miniaml(prices) {
  let mim = 1000000;
  let index = 0;

  prices.forEach((price, i) =>  {
    if (price.btc < min) {
      min = price.btc;
      index = i;
    }
  });

  return index;
}

function maximum(prices, from) {
  let max = 0;
  let index = 0;

  for (let i = from; i < prices.length; i++) {
    if (prices[i].btc > max) {
      max = prices[i].btc;
      index = i;
    }
  }

  return index;
}

const trader = async (prices, initialSum) => {
  const cmd = [];

  let BTC = 0;
  let USD = initialSum; 

  function buy(price) {
    if (!USD) {
      throw new Error('Can not buy BTC');
    }

    cmd.push({
      op: 'buy',
      amount: USD2BTC(USD, price),
    });

    BTC = USD / price;

    USD = 0;
  }

  function sell(price) {
    if (!BTC) {
      throw new Error('Can not sell BTC');
    }

    cmd.push({
      op: 'sell',
      amount: BTC,
    });

    USD = price * BTC;

    BTC = 0;
  }

  function skip() {
    cmd.push({
      op: 'pass',
    });
  }

  const minIndex = miniaml(prices);
  const maxIndex = maximum(prices, minIndex);

  let i = 0;
  for (i; i < minIndex -1; i++) {
    skip();
  }

  buy(prices[i].btc);

  for(i; i < maxIndex - 1; i++) {
    skip();
  }

  sell(prices[i].btc);

  console.log(cmd.length);

  return cmd;
} 


const __trader = async (prices, initialSum) => {
  const cmd = [];

  let rests = 0;
  let possibleOp = null;
  let BTC = 0;
  let USD = initialSum;

  function buy(price) {
    if (!USD) {
      throw new Error('Can not buy BTC');
    }

    cmd.push({
      op: 'buy',
      amount: USD2BTC(USD, price),
    });

    BTC = USD / price;

    USD = 0;
  }

  function sell(price) {
    if (!BTC) {
      throw new Error('Can not sell BTC');
    }

    cmd.push({
      op: 'sell',
      amount: BTC,
    });

    USD = price * BTC;

    BTC = 0;
  }

  function skip() {
    cmd.push({
      op: 'pass',
    });
  }

  for (let day = 0, size = prices.length; day < size; day++) {
    const { btc } = prices[day];
    const nextFalls = getNextFalls(prices, day);
    const nextRaises = getNextRaises(prices, day);

    if (nextFalls.length) {
      let willRaise = nextFalls.length + day !== prices.length;

      for (let i = 0; i < nextFalls.length; i++) {
        skip();
      }

      day += nextFalls.length;

      if (willRaise) {
        if (USD) {
          buy(prices[day].btc);
        } else {
          skip();
        }
      }
    }

    if (nextRaises.length) {
      let willFail = nextRaises.length + day !== prices.length;

      for (let i = 0; i < nextFalls.length; i++) {
        skip();
      }

      if (willFail) {
        if (BTC) {
          sell(prices[day].btc);
        } else {
          skip();
        }
      }  
    }

    if (!nextRaises.length && !nextFalls.length) {
      if (BTC) {
        sell(prices[day].btc);
      } else {
        skip();
      }
    }
  }

  return cmd;
} 
