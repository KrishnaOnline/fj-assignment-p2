let props = ['T', 'P', 'C'];
let buildTimes = [5, 4, 10];
let earnings = [1500, 1000, 3000];
let len = props.length;

// 1) RECURSIVE APPROACH...
const solve1 = (time, ans) => {
    if(time<=0) return 0;
    let maxProfit = 0;
    let bestAns = Array(len).fill(0);
    for(let i=0; i<buildTimes.length; i++) {
        if(time>=buildTimes[i]) {
            let profit = earnings[i]*(time-buildTimes[i]);
            let temp = [...ans];
            let currProfit = profit + solve1(time-buildTimes[i], temp);
            if(currProfit>maxProfit) {
                maxProfit = currProfit;
                temp[i]++;
                bestAns = [...temp];
            }
        }
    }
    for(let i=0; i<ans.length; i++) {
        ans[i] = bestAns[i];
    }
    return maxProfit;
}
const maxProfit1 = (time) => {
    let ans = Array(len).fill(0);
    let maxi = solve1(time, ans);
    console.log("Maximum Profit(Recursive): $"+maxi);
    console.log("T:"+ans[0]+" P:"+ans[1]+" C:"+ans[2]);
}



// 2) DP - TOP DOWN APPROACH...
const solve2 = (time, ans, dp, ansDP) => {
    if(time<=0) return 0;
    if(dp[time]!==-1) {
        ans = [...ansDP[time]];
        return dp[time];
    }
    let maxProfit = 0;
    for(let i=0; i<buildTimes.length; i++) {
        if(time>=buildTimes[i]) {
            let profit = earnings[i]*(time-buildTimes[i]);
            let currAns = [...ans];
            currAns[i]++;
            let currProfit = profit + solve2(time-buildTimes[i], currAns, dp, ansDP);
            if(currProfit>maxProfit) {
                maxProfit = currProfit;
                for(let j=0; j<ans.length; j++) {
                    ans[j] = currAns[j];
                }
            }
        }
    }
    dp[time] = maxProfit;
    ansDP[time] = [...ans];
    return maxProfit;
}
const maxProfit2 = (time) => {
    let ans = Array(len).fill(0);
    let dp = Array(time+1).fill(-1);
    let ansDP = Array(time+1).fill(null).map(() => Array(len).fill(0));
    let maxi = solve2(time, ans, dp, ansDP);
    console.log("Maximum Profit(Top Down): $"+maxi);
    console.log("T:"+ans[0]+" P:"+ans[1]+" C:"+ans[2]);
}



// 3) DP - BOTTOM UP APPROACH...
const maxProfit3 = (time) => {
    let dp = Array(time+1).fill(0);
    let ansDP = Array(time+1).fill(0).map(() => Array(len).fill(0));
    for(let t=1; t<=time; t++) {
        for(let i=0; i<buildTimes.length; i++) {
            if(t>=buildTimes[i]) {
                let profit = dp[t-buildTimes[i]]+earnings[i]*(t-buildTimes[i]);
                if(profit>dp[t]) {
                    dp[t] = profit;
                    ansDP[t] = [...ansDP[t-buildTimes[i]]];
                    ansDP[t][i]++;
                }
            }
        }
    }
    // let ans = ansDP[time];
    console.log("Maximum Profit(Bottom Up): $"+dp[time]);
    console.log("T:"+ansDP[time][0]+" P:"+ansDP[time][1]+" C:"+ansDP[time][2]);
    return dp[time];
}



let time = 13;

maxProfit1(time);
console.log();

maxProfit2(time);
console.log();

maxProfit3(time);