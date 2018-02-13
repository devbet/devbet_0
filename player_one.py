import math

def trader(prices, initialSum):
    cmd = []
    maxima = [4, 7, 9, 13, 15, 21, 24, 29, 31, 33, 37, 45, 50, 52, 57, 62, 65, 
    72, 75, 83, 87, 89, 95]
    minima = [2, 5, 8, 10, 14, 20, 23, 28, 30, 32, 35, 40, 46, 51, 54, 60, 64, 
    66, 73, 79, 84, 88, 90, 96]
    cur_mon = initialSum
    cur_btc = 0
    for i in range(len(prices)):
        op = None
        if i in minima:
            cur_btc = math.floor(cur_mon / prices[i]['btc'] * 100000) / 100000
            cur_mon = 0
            cmd.append({
                'op': 'buy',
                'amount': cur_btc
            })
            op = 'buy'
        elif i in maxima:
            cur_mon = math.floor(cur_btc / prices[i]['btc'] * 100000) / 
            cur_btc = 0
            cmd.append({
                'op': 'sell',
                'amount': cur_btc
            })
            op = 'sell'
        else:
            cmd.append({
                'op': 'pass'
            })
            op = 'pass'
        print('{}: {}:{} -- {}'.format(i, cur_mon, cur_btc, op))
    cmd[-1] = {
        'op': 'sell',
        'amount': cur_btc
    }
    return cmd
