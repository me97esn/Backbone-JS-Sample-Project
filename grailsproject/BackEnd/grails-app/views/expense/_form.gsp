<%@ page import="backend.Expense" %>



<div class="fieldcontain ${hasErrors(bean: expenseInstance, field: 'amount', 'error')} required">
	<label for="amount">
		<g:message code="expense.amount.label" default="Amount" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="amount" value="${fieldValue(bean: expenseInstance, field: 'amount')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: expenseInstance, field: 'budgetEntryCollection', 'error')} ">
	<label for="budgetEntryCollection">
		<g:message code="expense.budgetEntryCollection.label" default="Budget Entry Collection" />
		
	</label>
	<g:select name="budgetEntryCollection" from="${backend.BudgetEntry.list()}" multiple="multiple" optionKey="id" size="5" value="${expenseInstance?.budgetEntryCollection*.id}" class="many-to-many"/>
</div>

<div class="fieldcontain ${hasErrors(bean: expenseInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="expense.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${expenseInstance?.name}"/>
</div>

