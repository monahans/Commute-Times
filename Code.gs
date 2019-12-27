/**
* Silas Monahan and Dan Monahan 12/2019
* Get Distance or commute time driving or on transit between 2 different addresses.
* @param start_address Address as string Ex. "300 N LaSalles St, Chicago, IL"
* @param end_address Address as string Ex. "900 N LaSalles St, Chicago, IL"
* @param mode mode as string Ex. "drive time arriving" or "transit time departing" or "distance"
* @param time is the time associated with arriving or departing
* @customfunction
*/
 

function COMMUTE(start_address,end_address,mode,time) {
 
  /*
  start_address = "107 Burley Street, Danvers, MA 01923";
  end_address = "135 Berkshire Street, Cambridge, MA 02141";
  mode = "driving time arriving";
  time = "November 6, 2024 07:45:00 -0500";
  */
  Logger.log(time);
  var minutes = time.substring(20,22);
  //Logger.log(minutes);
  var hour = time.substring(18,19);
  //Logger.log(hour);
  var beg = time.substring(0,18);
  //Logger.log(beg);
  var end = time.substring(22);
  //Logger.log(end);
  
  var mapObj = Maps.newDirectionFinder();
  mapObj.setOrigin(start_address);
  mapObj.setDestination(end_address);
  var key = 'AIzaSyAkgeQVGDSUeg8nT2W-V3R9NKcgDE-TaZA';
  
  
  // Utilities.sleep(5000);
  
  switch(mode){
    case "distance": // get distance between two locations
        var directions = mapObj.getDirections();
        Logger.log(directions);
  
        var meters = directions.routes[0].legs[0].distance.value;
        Logger.log(meters * 0.000621371);
        return meters * 0.000621371;
      break;

    case "driving time arriving": // get driving time arriving at a certain time
      var now = new Date();
      var arrive = new Date(time);
      mapObj.setArrive(arrive);
      

      var directions = mapObj.getDirections();
      Logger.log(directions);

      var duration = directions.routes[0].legs[0].duration.value;
      var dur_mins = duration / 60;
      
      Logger.log(duration / 60);

      minutes = + minutes;
      minutes = minutes - dur_mins - 1;
      minutes = minutes.toFixed();
      minutes = + minutes;
      if(minutes < 0) {
        hour = + hour;
        hour = hour - 1;
        hour = hour.toString();
        minutes = 60 + minutes; // adds negative number to 60 which makes minutes the correct number of minutes
        minutes = minutes.toString().split(".")[0];
      }
      minutes = minutes.toString();
      if(minutes.length == 1) {
        minutes = "0" + minutes;
      }
      time = beg + hour + ":" + minutes + end;
      
      
      
      var depart = new Date(time);
      var serviceUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+start_address+"&destination="+end_address+"&departure_time="+depart.getTime()+
"&mode="+Maps.DirectionFinder.Mode.DRIVING+"&key="+key;
      Logger.log(serviceUrl);
      var options={
          muteHttpExceptions:true,
          contentType: "application/json",
         };
      var response=UrlFetchApp.fetch(serviceUrl, options);
      if(response.getResponseCode() == 200) {
        var directions = JSON.parse(response.getContentText());
        if (directions !== null){
          Logger.log(directions);
          var duration_in_traffic = directions.routes[0].legs[0].duration_in_traffic.value;
          Logger.log(duration_in_traffic / 60);
          return duration_in_traffic / 60;
          break;
            }
          }
      Logger.log("Error: " + response.getResponseCode() + " From: " + start_address + ", To: " + end_address + ", customDate: " + depart + ", customDate.getTime(): " + depart.getTime() );
      return false; // if the request is invalid
      break;
      
      
      
      
      /*
      var now = new Date();
      var arrive = new Date(time);
      mapObj.setArrive(arrive);

      var directions = mapObj.getDirections();
      Logger.log(directions);
  
      var duration = directions.routes[0].legs[0].duration.value;
      Logger.log(duration / 60);
      return duration / 60;
      break;
      */
      
    case "driving time departing": // get driving time departing at certain time
      var depart = new Date(time);
      var serviceUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+start_address+"&destination="+end_address+"&departure_time="+depart.getTime()+
"&mode="+Maps.DirectionFinder.Mode.DRIVING+"&key="+key;
      Logger.log(serviceUrl);
      var options={
          muteHttpExceptions:true,
          contentType: "application/json",
         };
      var response=UrlFetchApp.fetch(serviceUrl, options);
      if(response.getResponseCode() == 200) {
        var directions = JSON.parse(response.getContentText());
        if (directions !== null){
          Logger.log(directions);
          var duration_in_traffic = directions.routes[0].legs[0].duration_in_traffic.value;
          Logger.log(duration_in_traffic / 60);
          return duration_in_traffic / 60;
          break;
            }
          }
      Logger.log("Error: " + response.getResponseCode() + " From: " + start_address + ", To: " + end_address + ", customDate: " + depart + ", customDate.getTime(): " + depart.getTime() );
      return false; // if the request is invalid
      break;
      
      /*
      var now = new Date();
      var depart = new Date(time);
      mapObj.setDepart(depart);
      
      var directions = mapObj.getDirections();
      Logger.log(directions);
  
      var duration = directions.routes[0].legs[0].duration.value;
      Logger.log(duration / 60);
      return duration / 60;
      break;
      */
    case "transit time arriving": // get transit time (using public transportaion) arriving at a certain time
      var now = new Date();
      var arrive = new Date(time);
      mapObj.setArrive(arrive);
      

      var directions = mapObj.getDirections();
      Logger.log(directions);

      var duration = directions.routes[0].legs[0].duration.value;
      var dur_mins = duration / 60;
      
      Logger.log(duration / 60);

      minutes = + minutes;
      minutes = minutes - dur_mins - 1;
      minutes = minutes.toFixed();
      minutes = + minutes;
      if(minutes < 0) {
        hour = + hour;
        hour = hour - 1;
        hour = hour.toString();
        minutes = 60 + minutes; // adds negative number to 60 which makes minutes the correct number of minutes
        minutes = minutes.toString().split(".")[0];
      }
      minutes = minutes.toString();
      if(minutes.length == 1) {
        minutes = "0" + minutes;
      }
      time = beg + hour + ":" + minutes + end;
      
      
      
      var depart = new Date(time);
      var serviceUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+start_address+"&destination="+end_address+"&departure_time="+depart.getTime()+
"&mode="+Maps.DirectionFinder.Mode.transit+"&key="+key;
      Logger.log(serviceUrl);
      var options={
          muteHttpExceptions:true,
          contentType: "application/json",
         };
      var response=UrlFetchApp.fetch(serviceUrl, options);
      if(response.getResponseCode() == 200) {
        var directions = JSON.parse(response.getContentText());
        if (directions !== null){
          Logger.log(directions);
          var duration_in_traffic = directions.routes[0].legs[0].duration_in_traffic.value;
          Logger.log(duration_in_traffic / 60);
          return duration_in_traffic / 60;
          break;
            }
          }
      Logger.log("Error: " + response.getResponseCode() + " From: " + start_address + ", To: " + end_address + ", customDate: " + depart + ", customDate.getTime(): " + depart.getTime() );
      return false; // if the request is invalid
      break;
      
      
      /*
      mapObj.setMode(Maps.DirectionFinder.Mode.TRANSIT);
      
      var now = new Date();
      var arrive = new Date(time);
      mapObj.setArrive(arrive);

      var directions = mapObj.getDirections();
      Logger.log(directions);
  
      var duration = directions.routes[0].legs[0].duration.value;
      Logger.log(duration / 60);
      return duration / 60;
      break;
      */
      
    case "transit time departing": // get transit time (using public transportaion) departing at a certain time
      var depart = new Date(time);
      var serviceUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+start_address+"&destination="+end_address+"&departure_time="+depart.getTime()+
"&mode="+Maps.DirectionFinder.Mode.transit+"&key="+key;
      Logger.log(serviceUrl);
      var options={
          muteHttpExceptions:true,
          contentType: "application/json",
         };
      var response=UrlFetchApp.fetch(serviceUrl, options);
      if(response.getResponseCode() == 200) {
        var directions = JSON.parse(response.getContentText());
        if (directions !== null){
          Logger.log(directions);
          var duration_in_traffic = directions.routes[0].legs[0].duration_in_traffic.value;
          Logger.log(duration_in_traffic / 60);
          return duration_in_traffic / 60;
          break;
            }
          }
      Logger.log("Error: " + response.getResponseCode() + " From: " + start_address + ", To: " + end_address + ", customDate: " + depart + ", customDate.getTime(): " + depart.getTime() );
      return false; // if the request is invalid
      break;
      
      
      
      /*
      mapObj.setMode(Maps.DirectionFinder.Mode.TRANSIT);
      
      var now = new Date();
      var depart = new Date(time);
      mapObj.setDepart(depart);
      
      var directions = mapObj.getDirections();
      Logger.log(directions);
  
      var duration = directions.routes[0].legs[0].duration.value;
      Logger.log(duration / 60);
      return duration / 60;
      break;
      */
  }

}


function GOOGLEMAPSDRIVE(start_address,end_address,return_type,arriving_departing,time) {
 
  // https://www.chicagocomputerclasses.com/
  // Nov 2017
  // improvements needed
  
  // start_address = "229 Lexington Ave, Cambridge, MA 02138";
  // end_address = "1035 Cambridge Street, Cambridge, MA 02141";
  
  var mapObj = Maps.newDirectionFinder();
  mapObj.setOrigin(start_address);
  mapObj.setDestination(end_address);
  // mapObj.setKey('AIzaSyAkgeQVGDSUeg8nT2W-V3R9NKcgDE-TaZA');
  
  
  var now = new Date();
  var arrive = new Date('November 6, 2019 05:30:00 -0500');
  mapObj.setArrive(arrive);
  
  
  var directions = mapObj.getDirections();
  
  var getTheLeg = directions["routes"][0]["legs"][0];
  
  var meters = getTheLeg["distance"]["value"];
  

  // get duration in seconds
  var duration = getTheLeg["duration"]["value"];
  
  Logger.log(duration);
  Logger.log(directions);
  
  //convert to minutes and return
  return duration / 60;

}
