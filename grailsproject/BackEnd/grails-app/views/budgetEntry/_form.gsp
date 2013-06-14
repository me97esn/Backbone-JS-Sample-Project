<%@ page import="backend.BudgetEntry" %>



<div class="fieldcontain ${hasErrors(bean: budgetEntryInstance, field: 'amount', 'error')} required">
	<label for="amount">
		<g:message code="budgetEntry.amount.label" default="Amount" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="amount" value="${fieldValue(bean: budgetEntryInstance, field: 'amount')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: budgetEntryInstance, field: 'description', 'error')} ">
	<label for="description">
		<g:message code="budgetEntry.description.label" default="Description" />
		
	</label>
	<g:textField name="description" value="${budgetEntryInstance?.description}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: budgetEntryInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="budgetEntry.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${budgetEntryInstance?.name}"/>
</div>

