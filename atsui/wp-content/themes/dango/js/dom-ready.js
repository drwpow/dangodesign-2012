$('#contact-form').submit(function(e) {
	e.preventDefault();
	var postdata = $(this).serialize();
	$.ajax({url: '/sendmail.php',
		type: 'POST',
		data: postdata,
		timeout: 20000, // 10 sec timeout
		beforeSend: function() { $('#form-overlay').fadeIn(400);},
		error: function(jqXHR, status, error) { $('#form-overlay').hide();$('#form-status').show().html('<div class="red">Error: message couldn’t be sent. Please try again.</div>')},
		success: function(data) {
			$('#form-overlay').hide();
			if(data == 'sent') {
				$('#form-left, #form-center, #form-right').slideUp(300);
				$('#form-status').show().html('<em>Here’s the mail<br>it never fails<br>it makes me wanna wag my—</em><br><br>Oh. Sorry. Um, your message was sent. I’ll respond as soon as I can!');
			} else {
				$('#form-status').show().html('<div class="red">Error: message couldn’t be sent. Please try again.</div>');
			}
		}
	});
	return false;
});

var domain = '/atsui/wp-content/themes/dango/img/';
$('#lunchrush').html('<div id="special"></div><div id="strike"></div><audio id="sfx"><source src="' + domain + 'lunchrush.mp3" type="audio/mpeg"><source src="' + domain + 'lunchrush.ogg" type="audio/ogg"><embed src="' + domain + 'lunchrush.mp3">"></audio>');

var success = function() {
	$('#lunchrush img').remove();
	$('#lunchrush').css({opacity:0,top:0,left:0}).animate({opacity:1}, 300, function() {
		window.setTimeout(function() {
			$('#lunchrush #strike').after('<img src="' + domain + 'lunchrush.gif?' + (new Date).getTime() + '">');
			document.getElementById('sfx').play();
		}, 500);
		window.setTimeout(function() {
			$('#strike').css({opacity:1});
		}, 1500);
		window.setTimeout(function() {
			$('#special').css({opacity:1});
			$('#strike').css({opacity:0});
		}, 2100);
		window.setTimeout(function() {
			$('#special').animate({opacity:0}, 300);
			window.setTimeout(function() {
				$('#lunchrush').animate({opacity:0}, 400, function() {
					$(this).attr('style', '');
				});
			}, 2000);
		}, 4800);
	});
}

var konami = new Konami(success);
