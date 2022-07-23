'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    reportReady: Fun([], Null),
    //Alice interface
  });
  const B = API('Bob', {
    //Bob (API users) interface
  });
  init();
  // The first one to publish deploys the contract
  A.only(() => {
    interact.reportReady();
  });
  A.publish();

  /*const LHS = 
    parallelReduce(CTR = 1);
    .invariant(balance == 0)
    .while(CTR < 5)
    .paySpec(0)
    .case()
    .api()
    .api()
    .timeout([], () =>
          );*/
  commit();
 
  // No publish allowed for API's?
  //B.only(() => {
  //});
  //B.publish();
  //commit();

  // write your program here
  exit();
});