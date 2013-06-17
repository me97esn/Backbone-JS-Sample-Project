
<%@ page import="backend.BudgetEntry" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'budgetEntry.label', default: 'BudgetEntry')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-budgetEntry" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-budgetEntry" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="amount" title="${message(code: 'budgetEntry.amount.label', default: 'Amount')}" />
					
						<g:sortableColumn property="description" title="${message(code: 'budgetEntry.description.label', default: 'Description')}" />
					
						<g:sortableColumn property="name" title="${message(code: 'budgetEntry.name.label', default: 'Name')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${budgetEntryInstanceList}" status="i" var="budgetEntryInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${budgetEntryInstance.id}">${fieldValue(bean: budgetEntryInstance, field: "amount")}</g:link></td>
					
						<td>${fieldValue(bean: budgetEntryInstance, field: "description")}</td>
					
						<td>${fieldValue(bean: budgetEntryInstance, field: "name")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${budgetEntryInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
