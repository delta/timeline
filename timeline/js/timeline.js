var color_picked=0;
    var color_picker=[["#02050e","#e5bf6e","#a28a58","#e5bf6e"],["#0b0000","#927b5d","#594020","#927b5d"],["#ded1d3","#93e393","#6fa762","#070921"],["#000000","#b4b4b4","#797979","#fafafa"]/*,["#ecedd8","#cea6b0","#ac3552","#3a1c07"]*/];
    t = setInterval(function(){colour_change('select')},50000);
    function colour_change(call){
          if(call=='select'){
          color_picked++;
          if(color_picked>=color_picker.length)
            color_picked=0;
        }
        temp=color_picked;
        //color_picked=temp;
        $('body').css('background-color',color_picker[temp][0]);
        $('#tagPrimaryPicker label,#tagSecondaryPicker label').css('color',color_picker[temp][3]);
        $('#dateShower,#datePicker div:nth-child(n+2)').css('background-color',color_picker[temp][1]);
        $('#timebox').css('backgroundColor',color_picker[color_picked][1]);
        $('#timebox span').css('backgroundColor',color_picker[color_picked][2]);
        $('#leftspan').css('backgroundColor',color_picker[color_picked][3]);
        $('#rightspan').css('backgroundColor',color_picker[color_picked][3]);
        $('#dateShower,#datePicker div:nth-child(n+2)').css('box-shadow','0px 0px 10px 5px '+color_picker[temp][2]);
      }
      //colour_change("select");
    var initial_click_posx=0;
    var time_wait=300; //sets time for throttle
    var pressit= _.throttle(function(e){if(e.keyCode==37) move1(1); else if(e.keyCode==39) move1(-1); else if(e.keyCode==8) back(); else if(e.keyCode==13&&!currentDay) current_display_block.click();},time_wait);
    var holdclick= _.throttle(function(e){if((e.clientX-initial_click_posx)>=100) move1(-1); else if((e.clientX-initial_click_posx)<=-100) move1(1);},300);
  
    function clickdown(e)
    {
    initial_click_posx=e.clientX;
    document.addEventListener('mousemove',holdclick);
    }
  
    function clickup(e)
    {
    initial_click_posx=0;
    document.removeEventListener('mousemove',holdclick);
    }
    document.addEventListener('keydown',pressit);
/*    document.addEventListener('mousedown',clickdown);
    document.addEventListener('mouseup',clickup);*/
    document.getElementById('manualYear').addEventListener('change',Dropbox_Change);
    document.getElementById('manualMonth').addEventListener('change',Dropbox_Change);
    document.getElementById('manualDay').addEventListener('change',Dropbox_Change);
    //these variable are assigned only after a user clicks that partiuclar year or month or day...only when the user click 2012 ..currentYear=2012
    var currentDay=null,currentMonth=null,currentYear=null;
    var divs;
    //each div is assosiated to this multiplier...multiplier[n] will give the relative properties of the nth div...like 1/n opacity
    var isImploded = false;
    var multiplier=Array();
    var time = '0.5s';
    //init_buffer is the default buffer of all days and months from 2001 to 2013
    var init_buffer=Array();
    var current_display_block;
    //current buffer is the specific days which the backend replies for our queries...
    var current_buffer;
  //var recieved_primary_tags = ["festember","pragyan","nittfest","timeline"];
  //var recieved_secondary_tags = ["workshop","events","lecture","testing"];
  /* var recieved_reply=[
      {  
        "id":3,
        "content_start":'2013-11-29 10:11:24',
        "content_end":'2013-12-2 12:44:24',
        "primary_hashtag":"festember",
        "secondary_hashtag":"events"
      },
      { 
        "id":5,
        "content_start":'2013-3-9 5:34:24',
        "content_end":'2013-3-13 23:41:24' ,
        "primary_hashtag":"festember",
        "secondary_hashtag":"workshop"
      },
      { 
        "id":1,
        "content_start":'2013-3-12 2:41:24',
        "content_end":'2013-3-15 3:21:24' ,
        "primary_hashtag":"pragyan",
        "secondary_hashtag":"lecture"
      },
      {
        "id":0,
        "content_start":'2012-3-12 1:50:24',
        "content_end":'2012-3-15 9:41:24' ,
        "primary_hashtag":"nittfest",
        "secondary_hashtag":"events"
      },
      {
        "id":4,
        "content_start":'2007-3-12 6:11:24',
        "content_end":'2007-3-15 7:21:24' ,
        "primary_hashtag":"pragyan",
        "secondary_hashtag":"workshop"
      }
    ];*/
    //To create the primary and secondary labels
    function Create_Labels(){
      for(var i=0;i<recieved_primary_tags.length;i++){
        var label = document.createElement('label');
        label.className='tagPrimary';
        label.id="tag"+recieved_primary_tags[i];
        label.innerHTML=recieved_primary_tags[i];
        document.getElementById('tagPrimaryPicker').appendChild(label);
      }
      for(var i=0;i<recieved_secondary_tags.length;i++){
        var label = document.createElement('label');
        label.className='tagSecondary';
        label.id="tag"+recieved_secondary_tags[i];
        label.innerHTML=recieved_secondary_tags[i];
        document.getElementById('tagSecondaryPicker').appendChild(label);
      }
    }
    Create_Labels();
    //Parse_Reply_Backend(recieved_reply);
    set_dateViewer(current_buffer);
    Call_Logic(current_buffer);
    Init();
    //the below function inits the divs with proper multipliers...alter argument can be used to alter the multiplier such that we can change which div is in display by defeault..if alter=0,the middle div is active...so if u want the 2nd on left from middle to be highlighted...give alter = -2
   function Init(alter){
    if(alter==null)
      alter=0;
    divs = document.getElementById('datePicker').getElementsByTagName('div');
    var temp = -1*(divs.length-1)/2;
    temp=Math.ceil(temp);
    for(var i=1;i<divs.length;++i,temp++){
      divs[i].style.left=450+'px';
      divs[i].style.top=320+'px';
      if((temp-alter)<-4||(temp-alter)>4){
         divs[i].style.display='none';
       }

      multiplier[i]=temp-alter;
  }
  move1(0);
  //createCanvas(temp,alter);
  //the below was done for some look issues
  for(var i=2;i<divs.length;++i){
    divs[i].style.display='block';
  }
}
//if user uses dropbox to change the date
function Dropbox_Change(e){
      if(e){
      var changed_variable = this.id=="manualDay"?"day":this.id=="manualMonth"?"month":this.id=="year"?"year":"day";
      var flag1=false,flag2=false,flag3=false;
      if(current_buffer){
        var value = e!='Yo'?this.value:document.getElementById("manualDay").value;
        for(var i=0;i<current_buffer.length;i++){
          if(current_buffer[i][changed_variable]==value){
            if(current_buffer[i]["day"]==document.getElementById("manualDay").value)
              flag1=true;
            if(current_buffer[i]["month"]==document.getElementById("manualMonth").value)
              flag2=true;
            if(current_buffer[i]["year"]==document.getElementById("manualYear").value)
              flag3=true;
          }
        }
    }
    else{
      var date = new Date(document.getElementById("manualYear").value,document.getElementById("manualMonth").value-1,document.getElementById("manualDay").value);
      flag1=true;
      if(document.getElementById("manualDay").value&&document.getElementById("manualMonth").value&&document.getElementById("manualYear").value){
        if(date.getMonth()!=document.getElementById("manualMonth").value-1)
          flag1=false;
    }
      flag2 = document.getElementById("manualMonth").value?true:false;
      flag3 = document.getElementById("manualYear").value?true:false;
    }
    if(e=="Yo"){
      if(!(flag1&&flag2&&flag3)){
        return -1;
      }
    }
      if(!flag1)
        document.getElementById('daynull').selected="selected";
      if(!flag2)
        document.getElementById('monthnull').selected="selected";
      if(!flag3)
        document.getElementById('yearnull').selected="selected";
      else{
        if((flag1&&flag2&&flag3)||(flag3&&flag2)||(flag3&&document.getElementById("manualDay").value=="")){
          currentYear=document.getElementById("manualYear").value;
          if(flag2)
          currentMonth=document.getElementById("manualMonth").value;
          if(flag1||document.getElementById("manualDay").value!="")
            currentDay=document.getElementById("manualDay").value;
          implode();
          if(currentDay){
            $('#timebox').fadeOut();
            Create_TimeLine();
            return 1;
          }
          else{
          Call_Logic(current_buffer);
          Init();
        }
      }
      }
      dropdown_highlighter(document.getElementById('manualYear').value,document.getElementById('manualMonth').value,document.getElementById('manualDay').value);
    }
    }
//highlights the possible options in the dropdown menu
function dropdown_highlighter(query_year,query_month,query_day){
  if(current_buffer){
  $('#dateShower option').css('background-color','white');
  if(!(query_year&&query_month&&query_day)){
    for(var i=0;i<current_buffer.length;i++){
      if((query_year==current_buffer[i]["year"]||query_year=='')&&(query_month==current_buffer[i]["month"]||query_month=='')&&(query_day==current_buffer[i]["day"]||query_day=='')){
        document.getElementById('day'+current_buffer[i]["day"]).style.backgroundColor='#99CCFF';
        document.getElementById('month'+current_buffer[i]["month"]).style.backgroundColor='#99CCFF';
        document.getElementById('year'+current_buffer[i]["year"]).style.backgroundColor='#99CCFF';
      }
    }
  }
}
}
//used to change the date on top of datepicker
function change_dateViewer(){
    var string_day="";
    var string_month="";
    var string_year="";
    if(currentDay)
      string_day=currentDay;
    else if(currentMonth)
      string_day=current_display_block.getAttribute("data-meta");
    else
      string_day="null";
    if(currentMonth)
      string_month=currentMonth;
    else if(currentYear)
      string_month=current_display_block.getAttribute("data-meta");
    else
      string_month="null";
    if(currentYear)
      string_year=currentYear;
    else
      string_year=current_display_block.getAttribute("data-meta");
    if(document.getElementById("day"+string_day))
    document.getElementById("day"+string_day).selected="selected";
    if(document.getElementById("month"+string_month))
    document.getElementById("month"+string_month).selected="selected";
    if(document.getElementById("year"+string_year))
    document.getElementById("year"+string_year).selected="selected";
    if(string_year=='null') string_year='';
    if(string_month=='null') string_month='';
    if(string_day=='null') string_day='';
    dropdown_highlighter(string_year,string_month,string_day);
}
//You dont wanna know what the fuck this shit does!!!!!!!!!!!!!
function ParseDate_dateViewer(buffer){
    var temp1_array=Array();
    var temp2_array=Array();
    var temp3_array=Array();
    var day_buffer=Array(),month_buffer=Array(),year_buffer=Array();  
    for(var l=0;l<buffer.length;l++)
        temp1_array.push(buffer[l]["day"]);
    $.each(temp1_array, function(i, el){
    if($.inArray(el,day_buffer) === -1) day_buffer.push(el);
});
    for(var j=0;j<buffer.length;j++)
        temp2_array.push(buffer[j]["month"]);
    $.each(temp2_array, function(i, el){
    if($.inArray(el,month_buffer) === -1) month_buffer.push(el);
});
    for(var k=0;k<buffer.length;k++)
        temp3_array.push(buffer[k]["year"]);
    $.each(temp3_array, function(i, el){
    if($.inArray(el,year_buffer) === -1) year_buffer.push(el);
});
    var max = day_buffer.length>month_buffer.length?day_buffer.length:month_buffer.length>year_buffer.length?month_buffer.length:year_buffer.length;
    for(var x =0;x<max;x++){
      for(var y=0;y<max;y++){
        var temp;
        if(x<day_buffer.length&&y<day_buffer.length&&day_buffer[y]>day_buffer[y+1]){
          temp=day_buffer[y];
          day_buffer[y]=day_buffer[y+1];
          day_buffer[y+1]=temp;
        }
        if(x<month_buffer.length&&y<month_buffer.length&&month_buffer[y]>month_buffer[y+1]){
          temp=month_buffer[y];
          month_buffer[y]=month_buffer[y+1];
          month_buffer[y+1]=temp;
        }
        if(x<year_buffer.length&&y<year_buffer.length&&year_buffer[y]>year_buffer[y+1]){
          temp=year_buffer[y];
          year_buffer[y]=year_buffer[y+1];
          year_buffer[y+1]=temp;
        }
      }
    }
    return [day_buffer,month_buffer,year_buffer];
}
//sets the options for the dateViewer
function set_dateViewer(buffer){
  var day_buffer=Array(),month_buffer=Array(),year_buffer=Array();
    if(buffer==null){
      if(!currentMonth)
        month_buffer.push(null);
      if(!currentDay)
        day_buffer.push(null);
      for(var i=1;i<=31;i++)
        day_buffer.push(i);
      for(var j=1;j<13;j++)
        month_buffer.push(j)
      for(var k=2001;k<=2013;k++)
        year_buffer.push(k);
    }
    else{
      var temp_array = ParseDate_dateViewer(buffer);
      day_buffer=temp_array[0],month_buffer=temp_array[1],year_buffer=temp_array[2];
    }
    for(var i=0;i<day_buffer.length;i++){
      var day = document.createElement('option');
      day.innerHTML = day_buffer[i];
      day.id="day"+day_buffer[i];
      document.getElementById('manualDay').appendChild(day);
    }
    for(var j=0;j<month_buffer.length;j++){
      var month = document.createElement('option');
      month.innerHTML=month_buffer[j];
      month.id="month"+month_buffer[j];
      document.getElementById('manualMonth').appendChild(month);
    }
    for(var k=0;k<year_buffer.length;k++){
      var year = document.createElement('option');
      year.innerHTML=year_buffer[k];
      year.id="year"+year_buffer[k];
      document.getElementById('manualYear').appendChild(year);
    }
}
//move function is used to move or position the divs....we move the divs around by changing their corresponding values in the multiplier...therefore the addition argument...if argument=0 there is no change in position of blocks...if it is =1 then the whole thing displces by 1...the -1 for the other side...it can 2,3,4... 
    function move1(addition){
        //below condition so that it doesnt move when it reaches the end
        if((multiplier[2]==0&&addition==1)||(multiplier[divs.length-1]==0&&addition==-1))
          return;
        if(currentDay){
          arrowTransition(-1*addition);
          return;
        }
    /*    if(addition!=0){
          $('#mycanvas').animate({
            left :('+='+addition*100+'px')
          },time);
      }*/
        for(var i=1;i<divs.length;++i){
          multiplier[i]=multiplier[i]+addition;
          //we are changing the properties of the divs according to their value in the multiplier ml-marginleft mt-margin-top
        var ml = multiplier[i]*130;
        var mt = Math.abs(multiplier[i])*-1*90;
        var angle  = -1*multiplier[i]*20;
        var width = Math.abs(multiplier[i])*-1*20 +100;
        var opacity =1;
        for(var j=Math.abs(multiplier[i]);j!=0;--j)
          opacity/=2;
        if(multiplier[i]>0)
          ml=ml+Math.abs(multiplier[i])*20;
        if(opacity==1)
          current_display_block=divs[i];
        //one thing about move is that u have to feed relative values....relative to the initial position of the div...that is if u want to move a div from 420 to 450..just give .y(30)
        var k=0;
        if(Math.abs(multiplier[i])>2)
          opacity=0;
          move(divs[i])
              .duration(time)
              .x(ml)
              .y(mt)
              .set('opacity',opacity)
              .skew(0,angle)
              .set('width',width)
              .set('height',100)
          .end();
      
    }
    change_dateViewer();
    highlight_tags();
    colour_change();
  }
//implode is used to converge all the divs and destroy all the divs...use it during the transition from one layer to another
  function implode(){
    for(var i=1;i<divs.length;++i){
      move(divs[i])
              .duration(time)
              .x(0)
              .y(0)
              .set('opacity',0)
              .skew(0,0)
              .set('width',100)
            .end()}
            var datePicker = document.getElementById('datePicker');
            while(datePicker.firstChild.nextSibling.nextSibling)
              datePicker.removeChild(datePicker.firstChild.nextSibling.nextSibling);
      return;
  }
  //new divs for the new layer is created by this function....buffer are used for default or custom divs
  function Call_Logic(buffer){
    if(buffer==null){
      create_default_init_buffer();
      buffer=init_buffer;
    }
    else{
      //everything inside this is working fine...dont touch it...if something is wrong with it..ask me!
      var temp2=Array();
      for(var i=0;i<buffer.length-1;++i){
        var temp="continue";
        if(!currentYear&&buffer[i]["year"]!=buffer[i+1]["year"])
          temp="year";
        else if(currentYear&&!currentMonth&&buffer[i]["year"]==currentYear&&(buffer[i]["year"]!=buffer[i+1]["year"]||buffer[i]["month"]!=buffer[i+1]["month"]))
          temp="month";
        else if(currentMonth&&!currentDay&&buffer[i]["year"]==currentYear&&buffer[i]["month"]==currentMonth&&(buffer[i]["year"]!=buffer[i+1]["year"]||buffer[i]["month"]!=buffer[i+1]["month"]||buffer[i]["day"]!=buffer[i+1]["day"]))
          temp="day";
        if(temp=="continue")
            continue;
          temp2.push(buffer[i][temp]);
    }
      buffer=temp2;
    }
    //animation call
    createDivs(buffer);
}
  function createDivs(buffer){
    
    var datePicker = document.getElementById('datePicker');
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    for(var i=0;i<buffer.length;i++){
      var Div = document.createElement('div');
      var temp=document.createAttribute('data-meta');
      temp.value=buffer[i];
      Div.setAttributeNode(temp);
      var label = document.createElement('label');
      if(!currentYear||currentMonth)
      label.innerHTML=buffer[i];
      else
      label.innerHTML=months[buffer[i]-1];
      Div.appendChild(label);
      datePicker.appendChild(Div);
      Div.onclick = function(){
         this.style.zIndex=50;
         implode();
        if(!currentYear){
          currentYear=this.getAttribute('data-meta');
          Call_Logic(current_buffer);
          Init();
        }
        else if(!currentMonth){
          currentMonth=this.getAttribute('data-meta');
          Call_Logic(current_buffer);
          Init();
        }
        else{
          currentDay=this.getAttribute('data-meta');
          //Call_Logic(current_buffer);
          Create_TimeLine();
        }
      }
    }
  }
  function Create_TimeLine(){
    var timebox = document.createElement('div');
    timebox.id='timebox';
    timebox.style.width = '960px';
    timebox.style.height='300px';
    timebox.style.backgroundColor='black';
    timebox.style.position='absolute';
    timebox.style.bottom ='0px';
    timebox.style.display='none';
    timebox.style.left='20px';
    timebox.style.borderRadius='0px';
    for(var i=0;i<=22;i++){
      var timeMarker = document.createElement('span');
      timeMarker.className='timeMarker';
      timeMarker.style.left=(i+1)*40+'px';
      timebox.appendChild(timeMarker);
    }
    var datePicker = document.getElementById('datePicker');
    for(var j=0;j<=24;j++){
      var label = document.createElement('label');
      if(j>9)
        label.innerHTML=j;
      else
        label.innerHTML='0'+j;
      label.style.fontSize='12px';
      label.style.position='absolute';
      label.style.bottom='300px';
      label.zIndex=50;
      label.style.left=13+40*j+'px';
      label.style.color=color_picker[color_picked][2];
      datePicker.appendChild(label);
    }
    datePicker.appendChild(timebox);
    createSpans();
    $('#timebox').css('backgroundColor',color_picker[color_picked][1]);
    $('#timebox span').css('backgroundColor',color_picker[color_picked][2]);
    var leftspan = document.createElement('span');
    leftspan.style.width ='18px';
    leftspan.id='leftspan';
    leftspan.style.height ='300px';
    leftspan.style.position='absolute';
    leftspan.style.left='0px';
    leftspan.style.bottom='0px';
    leftspan.style.opacity='0.3';
    leftspan.style.cursor='pointer';
    var img = document.createElement('img');
    img.src='images/left-arrow.gif';
    img.style.position='absolute';
    img.style.top='132px';
    leftspan.appendChild(img);
    datePicker.appendChild(leftspan);
    $("#leftspan").click(function(){
      arrowTransition(-1);
    });
    var rightspan = document.createElement('span');
    rightspan.style.width ='18px';
    rightspan.id='rightspan';
    rightspan.style.height ='300px';
    rightspan.style.position='absolute';
    rightspan.style.right='0px';
    rightspan.style.bottom='0px';
    rightspan.style.opacity='0.3';
    rightspan.style.cursor='pointer';
    var img = document.createElement('img');
    img.src='images/right-arrow.gif';
    img.style.position='absolute';
    img.style.top='132px';
    rightspan.appendChild(img);
    datePicker.appendChild(rightspan);
    $("#rightspan").click(function(){
      arrowTransition(1);
    });
    $('#leftspan').css('backgroundColor',color_picker[color_picked][3]);
    $('#rightspan').css('backgroundColor',color_picker[color_picked][3]);
    $('#timebox').fadeIn();
  }
  function arrowTransition(temp){
      var date = new Date(currentYear,currentMonth-1,currentDay);
      date.setDate(date.getDate()+temp);
      var string = temp==1?"rightspan":"leftspan";
      if(!(document.getElementById('year'+date.getFullYear())&&document.getElementById('month'+parseInt(date.getMonth()+1))&&document.getElementById('day'+date.getDate()))){
        $('#'+string).css('backgroundColor','red');
        t = setTimeout(function(){$('#leftspan,#rightspan').css('backgroundColor',color_picker[color_picked][3]);},100);
        return;
      }
      document.getElementById('year'+date.getFullYear()).selected="selected";
      document.getElementById('month'+parseInt(date.getMonth()+1)).selected="selected";
      document.getElementById('day'+date.getDate()).selected="selected";
        var status = Dropbox_Change('Yo');
        if(status==-1){
          $('#'+string).css('backgroundColor','red');
          t = setTimeout(function(){$('#leftspan,#rightspan').css('backgroundColor',color_picker[color_picked][3]);},100);
          date.setDate(date.getDate()-temp);
          document.getElementById('year'+date.getFullYear()).selected="selected";
          document.getElementById('month'+parseInt(date.getMonth()+1)).selected="selected";
          document.getElementById('day'+date.getDate()).selected="selected";
        }
  }
  function createSpans(){
    var buffer=Array();
    if(current_buffer){
    var temp=Array();
      for(j=0;j<current_buffer.length-1;j++){
        if(jQuery.inArray(current_buffer[j]['id'],temp)!=-1)
          continue;
        temp.push(current_buffer[j]['id']);
        for (var i = recieved_reply.length - 1; i >= 0; i--) {
          console.log(recieved_reply[i]["id"]+","+current_buffer[j]["content-id"]);
          if(recieved_reply[i]["id"]==current_buffer[j]["content-id"]){
            buffer.push(recieved_reply[i]);
            break;
          }
        };
      }
    }
    else
      buffer = recieved_reply;
    var ht=0;
    for(var i=0;i<buffer.length;i++){
        var t1 = buffer[i]["content_start"].split(/[- :]/);
        var Startdate = new Date(t1[0], t1[1]-1, t1[2], t1[3], t1[4], t1[5]);
        var t2 = buffer[i]["content_end"].split(/[- :]/);
        var Enddate = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
      if(currentYear==Startdate.getFullYear()&&currentMonth==Startdate.getMonth()+1&&currentDay==Startdate.getDate()){
        if(currentYear==Enddate.getFullYear()&&currentMonth==Enddate.getMonth()+1&&currentDay==Enddate.getDate()){
            GenerateSpan('current',buffer[i],ht,t1[3],t1[4],t2[3],t2[4]);
            ht++;
        }
        else{
            GenerateSpan('start',buffer[i],ht,t1[3],t1[4]);
            ht++;
        }
      }
      else if(currentYear==Enddate.getFullYear()&&currentMonth==Enddate.getMonth()+1&&currentDay==Enddate.getDate()){
            GenerateSpan('ends',buffer[i],ht,t2[3],t2[4]);
            ht++;
      }
      else if(currentYear>=Startdate.getFullYear()&&currentMonth>=Startdate.getMonth()+1&&currentDay>Startdate.getDate()){
        if(currentYear<=Enddate.getFullYear()&&(currentMonth<=Enddate.getMonth()+1)&&currentDay<Enddate.getDate()){
          GenerateSpan('full',buffer[i],ht);
          ht++;
        }

      }
    }
    //GenerateSpan('full',buffer[i-1],ht);
  }
  function GenerateSpan(option,data,height,hour,mint,ohour,omint){
      var span = document.createElement('span');
      span.className='timeboxspan';
      span.innerHTML=data["title"]+'   ';
      for(var i=0;i<data["primary_hashtag"].length;i++)
        span.innerHTML=span.innerHTML+'#'+data["primary_hashtag"][i]+' ';
      for(var i=0;i<data["secondary_hashtag"].length;i++)
        span.innerHTML=span.innerHTML+'#'+data["secondary_hashtag"][i]+' ';
      if(hour!=null)
      var temp1=(parseInt(hour)+parseInt(mint/60))*40;
      if(ohour!=null)
        var temp2=(parseInt(ohour)+parseInt(omint/60))*40;
      if(option=='current'){
        span.style.width=(temp2-temp1)+'px';
        span.style.left=temp1+'px';
      }
      else if(option=='start'){
        span.style.width=(960-temp1)+'px';
        span.style.left=temp1+'px';
      }
      else if(option=='ends'){
        span.style.width=temp1+'px';
        span.style.left='0px';
      }
      else{
        span.style.width='960px';
        span.style.left='0px';
      }
      $(span).hover(function(){this.style.opacity='1'},function(){this.style.opacity='0.8'});
      $(span).click(function(){
        document.getElementById('lightbox-title').innerHTML=data["title"];
        document.getElementById('lightbox-time').innerHTML = data["content_start"]+' to '+data["content_end"];
        for(var i=0;i<data["primary_hashtag"].length;i++)
           document.getElementById('lightbox-tags').innerHTML+='#'+data["primary_hashtag"][i]+' ';
        for(var i=0;i<data["secondary_hashtag"].length;i++)
           document.getElementById('lightbox-tags').innerHTML+='#'+data["secondary_hashtag"][i]+' ';
         document.getElementById('lightbox-description').innerHTML=data["content_desc"];
        document.getElementById('lightbox').style.opacity=0;
        document.getElementById('lightbox').style.display='block';
         $(lightbox).animate({
          opacity:0.8,
          height:window.innerHeight
         });
      });
      span.style.top=height*32+'px';
      if(height==0)
        span.style.top='10px';
      document.getElementById('timebox').appendChild(span);
  }
  $('#lightbox').click(function(){
    document.getElementById('lightbox-title').innerHTML='';
    document.getElementById('lightbox-description').innerHTML='';
    document.getElementById('lightbox-time').innerHTML = '';
    document.getElementById('lightbox-tags').innerHTML='';
    $(lightbox).animate({
          opacity:0,
          height:0
         });
  });
  var position_buffer;
  //back is used to go back one layer
  function back(){
  position_buffer = currentDay?currentDay:currentMonth?currentMonth:currentYear?currentYear:null; 
    if(currentDay)
          currentDay=null;      
    else{
      if(currentMonth)
          currentMonth=null;      
      else{
        if(currentYear)
          currentYear=null;            
        else{
          return;
        }
      }
    }
    implode();
    Call_Logic(current_buffer);
    if(position_buffer){
        var alter=0;
        var temp = -1*(divs.length+1)/2;
        temp=Math.ceil(temp);
        temp=Math.abs(temp);
        current_block_temp=divs[temp];
        while(1&&current_block_temp){
        if(parseInt(position_buffer)>parseInt(current_block_temp.getAttribute('data-meta'))){
          current_block_temp=current_block_temp.nextSibling;
          alter++;
        }
        else if(parseInt(position_buffer)<parseInt(current_block_temp.getAttribute('data-meta'))){
          current_block_temp=current_block_temp.previousSibling;
          alter--;
        }
        else
          break;
      }
      if(!current_block_temp)
        alter=0;
    }
    Init(alter);
  }
  //this is used to create the init_buffer with proper values like leap year and 31,30 shits
  function create_default_init_buffer(specific){
    init_buffer=Array();
    if((!currentYear&&specific==null)||specific=="year"){
      for(var i=2001;i<=2013;i++)
        init_buffer.push(i);
    }
    else if((!currentMonth&&specific==null)||specific=="month"){
      for(var i=1;i<=12;++i)
        init_buffer.push(i);
    }
    else if(!currentDay){
      var temp=[0,31,28,31,30,31,30,31,31,30,31,30,31];
      for (var i = 1; i <=temp[currentMonth]; i++) 
        init_buffer.push(i);
      if(currentYear%4==0&&currentMonth==2)
        init_buffer.push(29);
    }
  }
  
  function Parse_Reply_Backend(recieved_reply){
      current_buffer=[];
      var temp=0;
      for(var i=0;i<recieved_reply.length;++i){
        var t = recieved_reply[i]["content_start"].split(/[- :]/);
        var start = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        var t = recieved_reply[i]["content_end"].split(/[- :]/);
        var end = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        while(start.getFullYear()!=end.getFullYear()||start.getMonth()!=end.getMonth()||start.getDate()!=(end.getDate()+1)){
            current_buffer[temp]={};
            current_buffer[temp]["year"]=start.getFullYear();
            current_buffer[temp]["month"]=start.getMonth()+1;
            current_buffer[temp]["day"]=start.getDate();
            current_buffer[temp]["id"]=i;
            current_buffer[temp]["content-id"]=recieved_reply[i]["id"];
            temp++;
        start.setDate(start.getDate()+1);
      }
      }
      for(var i=0;i<temp;++i){
        for(var j=0;j<temp-1;++j){
          var date1 = new Date(current_buffer[j]["year"],current_buffer[j]["month"],current_buffer[j]["day"]);
          var date2 = new Date(current_buffer[j+1]["year"],current_buffer[j+1]["month"],current_buffer[j+1]["day"]);
          var temp3={};
          if(date1>date2){
            temp3 = current_buffer[j];
            current_buffer[j]=current_buffer[j+1];
            current_buffer[j+1]=temp3;
          }
        }
      }
      current_buffer[temp]={};
      current_buffer[temp]["year"]=current_buffer[temp]["month"]=current_buffer[temp]["day"]=null;
    
  }  
  var IS_PRIMARY_TAG_CHOSEN=false;
  var IS_SECONDARY_TAG_CHOSEN=false;
  //highlights the tags inside a particular date pattern....
  function highlight_tags(){
    var bool = false;
    if(!current_buffer){
      bool=true;
      Parse_Reply_Backend(recieved_reply);
    }
    $("#tagPrimaryPicker label,#tagSecondaryPicker label").css("font-size","20px");
    $("#tagPrimaryPicker label,#tagSecondaryPicker label").css("text-shadow","0 0 0.0em "+color_picker[color_picked][2]);
    $("#tagPrimaryPicker label,#tagSecondaryPicker label").css("opacity","1");
    if(IS_PRIMARY_TAG_CHOSEN||IS_SECONDARY_TAG_CHOSEN)
      return;
    if(currentYear){
      if(currentMonth){
        for(var i=0;i<current_buffer.length;i++){
          if(currentMonth==current_buffer[i]["month"]&&currentYear==current_buffer[i]["year"]&&current_display_block.getAttribute("data-meta")==current_buffer[i]["day"]){
            for(var z=0;z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length||z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length;z++){
              if(z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length){
                document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).style.fontSize="25px";
                $("#tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
              if(z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length){
                document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).style.fontSize="25px";
                $("#tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
            }
          }
          else{
           if(currentMonth==current_buffer[i]["month"]&&currentYear==current_buffer[i]["year"]&&currentDay==current_buffer[i]["day"]){
            $("#tagPrimaryPicker label").css("opacity","0.5");
            $("#tagSecondaryPicker label").css("opacity","0.5");
            for(var z=0;z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length||z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length;z++){
              if(z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length){
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]); 
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).css("opacity","1"); 
            document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).style.fontSize="25px";
          }
              if(z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length){
            document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).style.fontSize="25px";
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]); 
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).css("opacity","1"); 
            }
          }
          }
        }
        }
      }
      else{
        for(var i=0;i<current_buffer.length;i++){
          if(currentYear==current_buffer[i]["year"]&&current_display_block.getAttribute("data-meta")==current_buffer[i]["month"]){
            for(var z=0;z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length||z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length;z++){
              if(z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length){
                document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).style.fontSize="25px";
                $("#tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
                if(z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length){
                  document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).style.fontSize="25px";
                  $("#tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
                  }
          }
        }
      }
    }
    else{
      for(var i=0;i<current_buffer.length;i++){
          if(current_display_block.getAttribute("data-meta")==current_buffer[i]["year"]){
        for(var z=0;z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length||z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length;z++){
              if(z<recieved_reply[current_buffer[i]["id"]]["primary_hashtag"].length){
            document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).style.fontSize="25px";
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["primary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
            if(z<recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"].length){
            document.getElementById("tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).style.fontSize="25px";
            $("#tag"+recieved_reply[current_buffer[i]["id"]]["secondary_hashtag"][z]).css("text-shadow","0 0 0.4em "+color_picker[color_picked][2]);}
          }
          }
        }
    }
    if(bool)
      current_buffer=null;
  
  }
  var primary_tags_search = Array();
  var secondary_tags_search = Array();
  $("#tagPrimaryPicker label").click(search_Tag);
  $("#tagSecondaryPicker label").click(search_Tag);
  var temporary_date_hold=Array();
  //if user clicks the primary tag
  function search_Tag(){
    var temporary= current_buffer;
    tags_search = Array();
    var key="";
      var tags = this.className=="tagPrimary"?document.getElementById("tagPrimaryPicker"):document.getElementById("tagSecondaryPicker");
      tags = tags.getElementsByTagName("label");
      key=this.className=="tagPrimary"?"primary_hashtag":"secondary_hashtag";
    if(this.style.fontWeight!="bold"){
      this.style.fontWeight="bold";
      this.style.textDecoration="overline";
  }
    else{
      this.style.fontWeight="";
      this.style.textDecoration="";   
    }
    for(var i=0;i<tags.length;i++){
      if(tags[i].style.fontWeight=="bold")
        tags_search.push(tags[i].id);
    }
    var temporary_array=[];
     if(tags_search.length!=0){
        for(var i=0;i<recieved_reply.length;i++){
            for(var j=0;j<tags_search.length;j++){
              if(jQuery.inArray(tags_search[j].substr(3,tags_search[j].length),recieved_reply[i][key])!=-1)
                break;
           } 
           if(j==tags_search.length)
            continue;
            if(IS_SECONDARY_TAG_CHOSEN&&key=="primary_hashtag"){
              for(var l=0;l<secondary_tags_search.length;l++){
                if(jQuery.inArray(secondary_tags_search[l]["secondary_hashtag"],recieved_reply[i]["secondary_hashtag"])!=-1)   {
                  temporary_array.push(recieved_reply[i]);
                  break;
                }
              }
            }
            else if(IS_PRIMARY_TAG_CHOSEN&&key=="secondary_hashtag"){
              for(var l=0;l<primary_tags_search.length;l++){
                if(jQuery.inArray(primary_tags_search[l]["primary_hashtag"][0],recieved_reply[i]["primary_hashtag"])!=-1) {
                  temporary_array.push(recieved_reply[i]);
                  break;
                }
              }
            }
            else
              temporary_array.push(recieved_reply[i]);
            
          }
      }
      if(key=="primary_hashtag")
        primary_tags_search=temporary_array;
      else
        secondary_tags_search=temporary_array;
      currentYear=currentMonth=currentDay=null;
      if(temporary_array.length==0){
        current_buffer=null;
        IS_PRIMARY_TAG_CHOSEN = key=="primary_hashtag"?false:IS_PRIMARY_TAG_CHOSEN?true:false;
        IS_SECONDARY_TAG_CHOSEN = key=="secondary_hashtag"?false:IS_SECONDARY_TAG_CHOSEN?true:false;
        if(IS_PRIMARY_TAG_CHOSEN)
          document.getElementById('PNULLTAG').click();
        else if(IS_SECONDARY_TAG_CHOSEN)
          document.getElementById("SNULLTAG").click();
      }
      else{
        Parse_Reply_Backend(temporary_array);
        var i=0;
        IS_PRIMARY_TAG_CHOSEN = key=="primary_hashtag"?true:IS_PRIMARY_TAG_CHOSEN?true:false;
        IS_SECONDARY_TAG_CHOSEN = key=="secondary_hashtag"?true:IS_SECONDARY_TAG_CHOSEN?true:false;
      }
      var flag = true;
      if(temporary!=null&&current_buffer!=null){
        if(temporary.length==current_buffer.length&&temporary_array.length==0){
          for(var i=0;i<temporary.length;i++){
            if(temporary[i]["content-id"]!=current_buffer[i]["content-id"]){
            flag=false;
          }
          }
        }
        else
          flag=false;
      }
      else
        flag=false;
      if(flag){
        this.style.fontWeight="";
        this.style.textDecoration="";
        this.style.color='red';
        t = setTimeout(function(){
          $("#tagPrimaryPicker label,#tagSecondaryPicker label").css("color",color_picker[color_picked][3]);
        },100);
      }
      else{
        implode();
        $('#dateShower select').empty();
        set_dateViewer(current_buffer);
        Call_Logic(current_buffer);
        Init();
      }
  }
  //for create the canvas for miniature timeline
  /*function createCanvas(middle,alter){
    var COLOUR_CODE = {"festember":"red","pragyan":"blue","midfest":"green"};
    var canvas = document.getElementById('mycanvas');
    var divs = document.getElementById('datePicker').getElementsByTagName('div');
    var div = current_display_block;
    canvas.width=(divs.length-2)*100;
    canvas.width=canvas.width;
    //var difference = parseInt(canvas.width)-parseInt(window.innerWidth-50);
    //console.log(divs.length-2+':'+canvas.width+':'+difference);
    var mid_pos =(middle-1)*100;
    var temp = parseInt(window.innerWidth-50)/2-mid_pos;
      canvas.style.left = temp+'px';
    var stackArray=[];
    if(!current_buffer){
      var temp = currentYear==null?0:currentMonth==null?1:3;
      for(var j=0;j<divs.length;j++){
          stackArray[j]=0;
          for(var i=0;i<recieved_reply.length;i++){
            var t = recieved_reply[i]["content_start"].split(/[- :]/);
            //console.log(t[temp]+divs[i].getAttribute('data-meta'));
            if(divs[j].getAttribute('data-meta')==t[temp]){
              if((currentYear!=null&&currentYear!=t[0]))
                continue;
              if((currentYear==t[0]&&currentMonth!=null&&currentMonth!=t[1]))
                continue;
              //console.log(t[1]);
              //console.log(j-2);
              var ctx=canvas.getContext("2d");
              ctx.fillStyle=COLOUR_CODE[recieved_reply[i]["primary_hashtag"]];
              ctx.fillRect((j-2)*100+3*(stackArray[j])+20,0,2,20);
              stackArray[j]++;
          }
      }
    }
    }
  }*/
  //Quick tips:
  //if u want to create divs and u have a buffer like the one in the example...first create the divs with the buffer....so Call_Logic(buffer)
  //cool...now u have to Init these divs with Init()...if u want a specific div to be selected by default...set alter accordingly Init(alter)
  //So the divs are up n for running...before going to next layer...make sure u implode the divs
  //And if u make a change without commenting...I WILL FIND YOU AND I WILL IMPLODE YOU!.
  //Happy Hacking!
  $(document).ready(function() {
    var valueToKeep;
    $("#dateShower select").keypress(function (event) {
      if(event.keyCode==37||event.keyCode==39)
        $(this).val(valueToKeep);
    });
    $("#dateShower select").keydown(function (event) {
      if(event.keyCode==37||event.keyCode==39){
    event.preventDefault();
        valueToKeep = $(this).val();
      }
  });         
});
  window.onresize = function(){
    document.getElementById("datePicker").style.top=window.innerHeight-520+'px';
    //document.getElementById("miniature_timeline").style.top=window.innerHeight-520+'px';
  }
  //document.getElementById("miniature_timeline").style.top=window.innerHeight-520+'px';
 // document.getElementById("miniature_timeline").style.width=window.innerWidth-50+'px';
  document.getElementById("datePicker").style.top=window.innerHeight-520+'px';
  $(window).load(function(){
            $("#tagSecondaryPicker").mCustomScrollbar({
               theme:"light-thin",
               horizontalScroll:true,
               verticalScroll:true
              });
            $("#tagPrimaryPicker").mCustomScrollbar({
               horizontalScroll:true,
               verticalScroll:true,
                theme:"light-thin"
              });
        });