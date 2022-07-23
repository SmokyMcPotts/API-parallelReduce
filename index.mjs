import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

console.log(`It's alive!!!`);

const iBal = stdlib.parseCurrency(1000);
const accAlice = await stdlib.newTestAccount(iBal);

console.log(`Alice's account created`);

const ctcAlice = accAlice.contract(backend);

console.log('Starting backend...');

const users = [];

const clone = async () => {
  const cloneBob = async (who) => {
    const acc = await stdlib.newTestAccount(iBal);
    const ctc = acc.contract(backend, ctcAlice.getInfo());
    //users.push(ctc.getInfo());
    console.log(`${who} account created. ${ctr} accounts have now been created.`);
    if (users.length < 5) {
      users.push(acc.getAddress());
      console.log('Account added to list.')
    } else {
      console.log(`${who} could not be added to the list.`);
    };
  };

  let ctr = 1;
  for (let i = 0; i < 10; i++) {
    await cloneBob(`Bob${ctr}`);
    ctr += 1;
    console.log(`The list ${(ctr > 6) ? 'already ' : ''}contains ${users.length} addresses.`);
    if (ctr == 6) { 
      console.log('List is now full.')
    };
  };
 
  console.log(`${ctr - 1} accounts have been created. The list contains these ${users.length} addresses`);
  console.log(users);
}

console.log('Pouring gasoline...');
await ctcAlice.p.Alice({
    reportReady: async () => {
      console.log(`Users may now attach to Alice's contract.`);
      await clone();
    },  
    // future Alice interact object
  });

console.log(`I'll burn the evidence.`);
//console.log(users);
process.exit();