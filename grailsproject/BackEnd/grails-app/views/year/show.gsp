
<%@ page import="backend.Year" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'year.label', default: 'Year')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-year" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-year" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list year">
			
				<g:if test="${yearInstance?.activityCollection}">
				<li class="fieldcontain">
					<span id="activityCollection-label" class="property-label"><g:message code="year.activityCollection.label" default="Activity Collection" /></span>
					
						<g:each in="${yearInstance.activityCollection}" var="a">
						<span class="property-value" aria-labelledby="activityCollection-label"><g:link controller="activity" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${yearInstance?.amount}">
				<li class="fieldcontain">
					<span id="amount-label" class="property-label"><g:message code="year.amount.label" default="Amount" /></span>
					
						<span class="property-value" aria-labelledby="amount-label"><g:fieldValue bean="${yearInstance}" field="amount"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${yearInstance?.yearfield}">
				<li class="fieldcontain">
					<span id="yearfield-label" class="property-label"><g:message code="year.yearfield.label" default="Yearfield" /></span>
					
						<span class="property-value" aria-labelledby="yearfield-label"><g:fieldValue bean="${yearInstance}" field="yearfield"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${yearInstance?.id}" />
					<g:link class="edit" action="edit" id="${yearInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
