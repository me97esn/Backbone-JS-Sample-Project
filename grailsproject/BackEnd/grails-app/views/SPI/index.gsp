<!DOCTYPE HTML>
<html>

  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
     <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
	 <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
   <script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	 <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
	 <script src="jquery.tmple.min.js"></script>

	 <script src="application.js"></script>
	 <link rel="stylesheet" href="main.css" type="text/css" media="screen" title="no title" charset="utf-8">
  <script type="text/javascript">
  jQuery.fn.center = function () {
    // this.css("position","absolute");
    var left = ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px";
    this.animate({left: left}, function(){
        $(this).css({position: 'static', margin: '0 auto'});
    });
    return this;
}</script>
  </head>

  <body>
  	<div class="yearHeader">
  		<div class="prevYear">
  			<a id="prevYear" href="#y/2012">prev</a>
  		</div>
  		
  		<div class="nextYear"><a id="nextYear" href="#y/2013">next</a>
  		</div>
  		<div id="currentYear" class="currentYear"><!--The year should be displayed by a javascript function here--></div>
  	</div>

    <div class="activityListView" id="activityListView">
      <div id="activityList" class="activityList">    
      <script id="activityListTmpl" type="text/x-jquery-tmpl">
        <div class="activity">
              <a href="#y/${$('#currentYear').html()}/activity/${id}">
                <div class="activity-name">${name}</div> 
                <div class="activity-amount">${amount}</div>
              </a>
              <div class="expense" id="expenseInActivity${id}"> </div>
              
      </div>
      </script>
    </div>
  </div>
    
    <div id="expenseListView" class="expenseListView">
      <div id="expenseList" class="expenseList">
    <script id="expenseListTmpl" type="text/x-jquery-tmpl">
              
              <a href="#expense/${id}">
                <div class="expense-name">${name}</div> 
                <div class="expense-amount">${amount}</div>
              </a>
              <div class="budgetEntry" id="budgetEntryInExpense${id}"> </div>
      </script>
      </div>
    </div>

    <div id="budgetEntryListView" class="budgetEntryListView">
      <div id="budgetEntryList" class="budgetEntryList">
        <script id="budgetEntryListTmpl" type="text/x-jquery-tmpl">
              
              <a href="#budgetEntry/${id}">
                <div class="budgetEntry-desc"><input type="text" value="${description}" id="#budgetEntry${id}/desc" /></div> 
                <div class="budgetEntry-amount"><input type="text" value="${amount}" id="#budgetEntry${id}/amount" /></div>
              </a>
              
      </script>
      </div>
    </div>
  </body>

</html>