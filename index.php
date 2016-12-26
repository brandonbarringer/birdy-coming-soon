<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Birdy Connect</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<link rel="stylesheet" href="assets/styles/application.min.css">
	<script src="https://use.typekit.net/ykh6gvz.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>
<body>
	<main>
		<div class="logo">
			<img src="assets/visual/svgs/src/birdyConnect-white.svg" alt="">
		</div>
		<h1>Get Connected</h1>
		<p>Find Like-Minded Entrepreneurs From Around the Globe To Co-Found Your Next Project</p>
		<form 	id="subscribe-form"
    			action="http://linkedin.us14.list-manage.com/subscribe/post-json?u=d07487596a4c12164eb401f5a&amp;id=5534d12bdf&c=?"
    			method="get">
			<input type="email" pattern="[^ @]*@[^ @]*" placeholder="yourEmail@example.com" name="EMAIL" required>
			<button type="submit">Stay Informed</button>	
		</form>
		<div id="subscribe-result"></div>
	</main>
	<div class="overlay"></div>
</body>
<script src="assets/scripts/dist/vendor.js"></script>
<script src="assets/scripts/dist/app.min.js"></script>
</html>
