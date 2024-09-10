let props = ['T', 'P', 'C'];
let buildTimes = [5, 4, 10];
let earnings = [1500, 1000, 3000];
let len = props.length;

const maxProfit = (time) => {
    let dp = Array(time+1).fill(0);
    let ansDP = Array(time+1).fill(0).map(() => Array(props.length).fill(0));
    for(let t=1; t<=time; t++) {
        for(let i=0; i<buildTimes.length; i++) {
            if(t>=buildTimes[i]) {
                let profit = earnings[i]*(t-buildTimes[i]) + dp[t-buildTimes[i]];
                if(profit>dp[t]) {
                    dp[t] = profit;
                    ansDP[t] = [...ansDP[t-buildTimes[i]]];
                    ansDP[t][i]++;
                }
            }
        }
    }
    let ans = ansDP[time];
    console.log("Maximum Profit: $"+dp[time]);
    let output = "";
    for(let i=0; i<ans.length; i++) {
        output += props[i]+":"+ans[i]+" ";
    }
    console.log(output+"\n");
    return dp[time];
}

// All 3 test cases:
console.log("Test Case: 1");
maxProfit(7);

console.log("Test Case: 2");
maxProfit(8);

console.log("Test Case: 3");
maxProfit(13);