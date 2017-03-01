var llistatChromebooksId=[];


//THIS FUNCTION ADD ALL CHROMEBOOKS FROM THE LLISTATCHROMEBOOKS_ID
//TO ORGANITZATION UNIT FOR HOME TIME (programmed by triggers).

function changeOrganitzationUnitForHome() {
  
  //Check lists changes
  CheckChromebooksList();
  //ChangeAction for Organitzation Unit specified by parameter.
  changeAction("/AlumnesHome");
 
 
}

//THIS FUNCTION ADD ALL CHROMEBOOKS FROM THE LLISTATCHROMEBOOKS_ID
//TO ORGANITZATION UNIT FOR SCHOOL TIME (programmed by triggers).

function changeOrganitzationUnitForSchool() {
  
  //Check lists changes
  CheckChromebooksList();
  
  //ChangeAction for Organitzation Unit specified.
  changeAction("/");
  
  }
 

//FUNCTION CHECKS CHROMEBOOK LIST WITH ALL CHROMEBOOKS 
//DEVICES THAT ARE PUSHEDS IN OUR ADMIN CONSOLE. 
//IF EXISTS, CATCH HER ID, IN ORDER TO CHANGE HER ORGANITZATION UNIT.

function CheckChromebooksList(){
  
  
  var ChromebookList = ['SerialNumber_Chromebook1',
                        'SerialNumber_Chromebook2',
                        '...'];
  
 var response = AdminDirectory.Chromeosdevices.list("my_customer"); //The user_admin id is always my_customer (if you want)
  
 for ( i=0; i<response.chromeosdevices.length; i++){

   for (u=0; u<ChromebookList.length; u++){
   
     if (ChromebookList[u] == response.chromeosdevices[i].serialNumber){
     
       llistatChromebooksId[i]= response.chromeosdevices[i].deviceId;
       Logger.log(llistatChromebooksId[i]);
       
       
     } 
   }
 } 
}


//THIS FUNCTION MAKE CHANGES ON GOOGLE ADMIN CONSOLE.
//NEEDS A ORGANITZATION UNIT STRING BY PARAMETER.

function changeAction(OrgUnit){
  
  var response = AdminDirectory.Chromeosdevices.list("my_customer");
  
  for (j=0; j<llistatChromebooksId.length ; j++){
    
    for (u=0; u<response.chromeosdevices.length; u++){
     
      if (llistatChromebooksId[j]==response.chromeosdevices[u].deviceId){
        
        response.chromeosdevices[u].orgUnitPath= OrgUnit;
      
         AdminDirectory.Chromeosdevices.update(
         response.chromeosdevices[u],
         "my_customer", 
         response.chromeosdevices[u].deviceId
         );
        
         Logger.log(response.chromeosdevices[u].serialNumber +" orgUnit changed to "+response.chromeosdevices[u].orgUnitPath);
        
      }
      
    }
  } 
}
