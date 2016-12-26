(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
	ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));
	// Turn the given MailChimp form into an ajax version of it.
	// If resultElement is given, the subscribe result is set as html to
	// that element.
	function ajaxMailChimpForm($form, $resultElement) {
		// Hijack the submission. We'll submit the form manually.
		$form.submit(function (e) {

			if (!isValidEmail($form)) {
				var error = "<p>A valid email address must be provided.</p>";
				$resultElement.html(error);
			} else {
				e.preventDefault();
				$resultElement.css({ "display": "flex" }).addClass('fadeIn');
				$resultElement.html("Subscribing...");
				submitSubscribeForm($form, $resultElement);
			}
		});
	}
	// Validate the email address in the form
	function isValidEmail($form) {
		// If email is empty, show error message.
		// contains just one @
		var email = $form.find("input[type='email']").val();
		if (!email || !email.length) {
			return false;
		} else if (email.indexOf("@") == -1) {
			return false;
		}
		return true;
	}
	// Submit the form with an ajax/jsonp request.
	// Based on http://stackoverflow.com/a/15120409/215821
	function submitSubscribeForm($form, $resultElement) {
		$.ajax({
			type: "GET",
			url: $form.attr("action"),
			data: $form.serialize(),
			cache: false,
			dataType: "jsonp",
			jsonp: "c", // trigger MailChimp to return a JSONP response
			contentType: "application/json; charset=utf-8",
			error: function error(_error) {
				console.log(_error);
			},
			success: function success(data) {
				if (data.result != "success") {
					var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
					if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
						message = "<p>You're already subscribed. Thank you.</p>";
					}
					$resultElement.html(message);
				} else {
					$resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
				}
			}
		});
	}
})();

},{}]},{},[1]);
