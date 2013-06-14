<%@ page import="backend.Activity" %>



<div class="fieldcontain ${hasErrors(bean: activityInstance, field: 'amount', 'error')} required">
	<label for="amount">
		<g:message code="activity.amount.label" default="Amount" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="amount" value="${fieldValue(bean: activityInstance, field: 'amount')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: activityInstance, field: 'expenseCollection', 'error')} ">
	<label for="expenseCollection">
		<g:message code="activity.expenseCollection.label" default="Expense Collection" />
		
	</label>
	<g:select name="expenseCollection" from="${backend.Expense.list()}" multiple="multiple" optionKey="id" size="5" value="${activityInstance?.expenseCollection*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: activityInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="activity.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${activityInstance?.name}"/>
</div>

