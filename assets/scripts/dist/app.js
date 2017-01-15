(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
	$('.back').on('click', '#subscribe-result', function () {
		$('#subscribe-result').hide(700);
		console.log('working');
	});

	ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));
	// Turn the given MailChimp form into an ajax version of it.
	// If resultElement is given, the subscribe result is set as html to
	// that element.
	var fbMessage = '<p>Pour plus d&apos;informations sur le lancement du site, suivez notre page Facebook et n&apos;hésitez pas à nous laisser vos encouragements et suggestions !</p><a href="https://www.facebook.com/Birdy-Connect-1738993203086942/"><button>Voir La Page</button></a>';
	function ajaxMailChimpForm($form, $resultElement) {
		// Hijack the submission. We'll submit the form manually.
		$form.submit(function (e) {

			if (!isValidEmail($form)) {
				var error = "<p>Merci de saisir une adresse e-mail valide.</p>";
				$resultElement.html(error);
			} else {
				e.preventDefault();
				$resultElement.show(700);
				$resultElement.html("Chargement...");
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
				console.log(data.result);
				if (data.result != "success") {
					var message = data.msg || "Désolé, nous ne pouvons pas finaliser votre inscription pour le moment. Merci de réessayer plus tard.";
					if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
						message = "<p>Ouah! Vous devez sûrement être impatient d’en savoir plus, vous êtes déjà enregistré !</p>" + fbMessage;
					}
					if (data.msg && data.msg.indexOf("invalid") >= 0) {
						message = data.msg + '<button class="back">retourner</button>';
					}
					$resultElement.html(message);
				} else {
					$resultElement.html("Merci pour votre inscription !<br>Afin de finaliser votre abonnement, veuillez cliquer sur le lien présent dans l’e-mail que nous venons de vous envoyer." + fbMessage);
				}
			}
		});
	}
})();

},{}]},{},[1]);
