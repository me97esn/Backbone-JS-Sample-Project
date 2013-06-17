<%@ page import="backend.Year" %>



<div class="fieldcontain ${hasErrors(bean: yearInstance, field: 'activityCollection', 'error')} ">
	<label for="activityCollection">
		<g:message code="year.activityCollection.label" default="Activity Collection" />
		
	</label>
	<g:select name="activityCollection" from="${backend.Activity.list()}" multiple="multiple" optionKey="id" size="5" value="${yearInstance?.activityCollection*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: yearInstance, field: 'amount', 'error')} required">
	<label for="amount">
		<g:message code="year.amount.label" default="Amount" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="amount" value="${fieldValue(bean: yearInstance, field: 'amount')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: yearInstance, field: 'yearfield', 'error')} required">
	<label for="yearfield">
		<g:message code="year.yearfield.label" default="Yearfield" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="yearfield" type="number" value="${yearInstance.yearfield}" required=""/>
</div>

