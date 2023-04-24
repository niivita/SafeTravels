module.exports = function hourQuerySample(hour){
    hour = parseInt(hour.substring(11, 13)); 
    if (hour <= 0){
        hour = hour + 24;
      }
      let hour0 = hour - 0;
      let hour4 = hour - 4;
      let hour8 = hour - 8;
      let hour12 = hour - 12;
      let hour16 = hour - 16;
      let hour20 = hour - 20;
      let hour24 = hour - 24;
      
      function getSmallestPositive(hour0, hour4, hour8, hour12, hour16, hour20, hour24) {
        const hoursArray = [hour0, hour4, hour8, hour12, hour16, hour20, hour24];
        const positiveHours = hoursArray.filter(hour => hour > 0);
        console.log(Math.min(...positiveHours))
        return Math.min(...positiveHours);
      }
 
      let minhour = getSmallestPositive(hour0, hour4, hour8, hour12, hour16, hour20, hour24);
      return hour - minhour;
      
}