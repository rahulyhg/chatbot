/**
 * Author: Nizar BOUSEBSI
 * Description: AngularJS directive to process Speech Recognition in your Cordova & Web application.
 * Usage: Add this directive in your Directives folder.
 */

angular.module('app.directives', []).directive('ngSpeechRecognitionStart', function ($timeout, $rootScope) {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attrs) {
			//var recognition = new webkitSpeechRecognition();
			
			var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

			var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
			// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
			// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
			console.log(typeof Windows);
			recognition.continuous = true;
			recognition.interimResults = false;
			ignore_onend = false;
			final_transcript = '';
			//Change the recognition language here.
			recognition.lang = 'en-us';
			
			var recognitionIsAlreadyCalled = false;

			$element.bind('touchstart mousedown', function (event) {
				$scope.isHolded = true;
				//$(this).toggleClass('hover_effect');
				$(this).addClass('hover_effect');
				$timeout(function () {
					if ($scope.isHolded) {
						$scope.$apply(function () {

							if ($attrs.ngSpeechRecognitionStart) {
								$scope.$eval($attrs.ngSpeechRecognitionStart)
								
							}

							if (recognitionIsAlreadyCalled === false) {
								recognitionIsAlreadyCalled = true;
								recognition.start();
								
								recognition.onstart = function() {
									recognizing = true;
									console.log("Started event");
								};
							}
						});
					}
				}, 600);
			});

			$element.bind('touchend mouseup', function (event) {
				$scope.isHolded = false;
				//$(this).toggleClass('hover_effect');
				$(this).removeClass('hover_effect');
                console.log($attrs.ngSpeechRecognitionEnd);
				if ($attrs.ngSpeechRecognitionEnd) {
					
					$scope.$apply(function () {
						//console.log($attrs);
						
						recognition.onerror = function(event) {
							if (event.error == 'no-speech') {
							// start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
							// showInfo('info_no_speech');
							ignore_onend = true;
							console.log("No speech");
							}
							if (event.error == 'audio-capture') {
							// start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
							// showInfo('info_no_microphone');
							ignore_onend = true;
							console.log("No mic");
							}
							if (event.error == 'not-allowed') {
							if (event.timeStamp - start_timestamp < 100) {
								//showInfo('info_blocked');
							} else {
								//showInfo('info_denied');
							}
							ignore_onend = true;
							}
						};
						// recognition.onend = function() {
						// 	recognizing = false;
						// 	if (ignore_onend) {
						// 		console.log("ignore on end");
						// 	return;
						// 	}
						// 	//start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
						// 	if (!final_transcript) {
						// 		console.log("Final trans",final_transcript);
						// 	//showInfo('info_start');
						// 	return;
						// 	}
						// 	//showInfo('');
						// 	if (window.getSelection) {
						// 	window.getSelection().removeAllRanges();
						// 	var range = document.createRange();
						// 	range.selectNode(document.getElementById('final_span'));
						// 	window.getSelection().addRange(range);
						// 	}
						// 	if (create_email) {
						// 	create_email = false;
						// 	createEmail();
						// 	}
						// };
						recognition.onresult = function (event) {
                            console.log("display+--",event);
							if (event.results[0][0].transcript !== undefined) {
								$rootScope.transcript = event.results[0][0].transcript;
                                console.log($rootScope.transcript);
								if (typeof $rootScope.transcript === 'string') {
									 for (var i = event.resultIndex; i < event.results.length; ++i) {
										if (event.results[i].isFinal) {
											final_transcript += event.results[i][0].transcript;
										} else {
											interim_transcript += event.results[i][0].transcript;
										}
									}
                                    $scope.$eval($attrs.ngSpeechRecognitionEnd);
                                     console.log($attrs.ngSpeechRecognitionEnd);
								}
							}
						}
						//recognition.onresult(event);
						recognition.stop();
						recognitionIsAlreadyCalled = false;
					});
				}
			});
		}
	};
})