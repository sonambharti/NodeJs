console.log('Start');

process.nextTick(() => {
  console.log('Next Tick callback');
});

console.log('End');



