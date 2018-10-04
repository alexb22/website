var windowHeight = $(window).height();
var windowMiddle = windowHeight / 2;
var windowWidth = $(window).width();
var cards = $('.cards');
var pictureContainer = $('.picture-container');
var topContent = $('.top-content');
var navHeader = $('#header');
var navigation = $('.navigation');
var navigationListItems = $('.navigation a');
var hamburgerIcon = $('#nav-icon > span');
var moveElements = $('.move');
var moveElementHeight = moveElements.eq(0).height();
var portfolioImages = $('.portfolio-img');
var navigationBlock = $('.navigation');
var navigationAnchors = $('.navigation a');
var navElements = $('.navElement');
var flagged = false;

$(document).ready(init);

function init() {
  var j;
  var scrollMagicController = new ScrollMagic.Controller({vertical: true});

  var parallax = TweenLite.to(pictureContainer, 1, {y: "-200px", ease: Linear.easeNone});

  var parallaxScene = new ScrollMagic.Scene({
    triggerElement: '#picture',
    triggerHook: 'onLeave',
    duration: windowHeight * 1.5
  })
  .setTween(parallax)
  .addTo(scrollMagicController);

  var parallaxTopContent = TweenLite.to(topContent, 1, {y: "-100px", ease: Linear.easeNone});

  var parallaxScene = new ScrollMagic.Scene({
    triggerElement: '#picture',
    triggerHook: 'onLeave',
    duration: windowHeight * 1.5
  })
  .setTween(parallaxTopContent)
  .addTo(scrollMagicController);

  for (j=0; j < moveElements.length; j++) {
    var currentElement = moveElements[j];
    var parallaxTween = TweenLite.fromTo(currentElement, 1, {x: -(windowWidth)/2, skewX: -40}, {x : windowWidth / 2, skewX: 40, force3D: true, ease:Linear.easeNone});
    var parallaxTweenReverse = TweenLite.fromTo(currentElement, 1, {x: (windowWidth)/2, skewX: -40}, {x : -(windowWidth / 2), skewX: 40, force3D: true, ease:Linear.easeNone});

    var scene = new ScrollMagic.Scene({
      triggerElement: currentElement,
      triggerHook: 'onEnter',
      duration: windowHeight + moveElementHeight * 2,
      offset: -20
    });
    if (j % 2 == 0) {
      scene.setTween(parallaxTween);
    }
    else {
      scene.setTween(parallaxTweenReverse);
    }
    scene.addTo(scrollMagicController);
  }

  var animateScene = new ScrollMagic.Scene({
    triggerElement: "#experience"
  });
  animateScene.addTo(scrollMagicController);
  
  var experienceTimeline = new TimelineLite();

  animateScene.on('enter', function() {
      experienceTimeline.set($('#Experience'), {className: "+= animated fadeInUp show"});
      var i;
      for (i = 0; i < cards.length; i++) {
        experienceTimeline.set(cards[i], {className: "+=animated fadeInLeft"}, "+=0.3");
      }
    //$('#Experience').addClass("animated fadeInUp show");
  });

  var skillsScene = new ScrollMagic.Scene({
    triggerElement: "#skills",
    triggerHook: 'onEnter',
    offset: 50
  });
  skillsScene.addTo(scrollMagicController);

  var skillsTimeline = new TimelineLite();

  skillsScene.on('enter', function() {
    skillsTimeline.set("#skillsHeading", {className: "+=animated fadeInUp show"});
    skillsTimeline.set("#skillsFirstColumn", {className: "-=notShowing"}, 0.5);
    skillsTimeline.set("#skillsFirstColumn", {className: "+=animated bounceInLeft show"}, 0.5);
    skillsTimeline.set("#skillsSecondColumn", {className: "-=notShowing"}, 0.5);
    skillsTimeline.set("#skillsSecondColumn", {className: "+=animated bounceInRight show"}, 0.5);
    skillsTimeline.set(".bar-filler", {className: "+=fillBar"}, 1.5);
  });

  var educationScene = new ScrollMagic.Scene({
    triggerElement: "#education",
    triggerHook: 'onEnter',
    offset: 50
  });
  educationScene.addTo(scrollMagicController);

  var educationTimeline = new TimelineLite();

  educationScene.on('enter', function() {
    educationTimeline.set("#educationHeading", {className: "+=animated fadeInUp show"});
    educationTimeline.set("#educationCardFirst", {className: "-=notShowing"}, "+=0.3");
    educationTimeline.set("#educationCardFirst", {className: "+=animated zoomInLeft show"});
    educationTimeline.set("#educationCardSecond", {className: "-=notShowing"}, "+=0.3");
    educationTimeline.set("#educationCardSecond", {className: "+=animated zoomInRight show"});
  });

  var h;
  for (h=0; h < portfolioImages.length; h++) {
    var portfolioElement = portfolioImages[h];
    
    var portfolioScene = new ScrollMagic.Scene({
      triggerElement: portfolioElement,
      triggerHook: 'onEnter',
      offset: 50
    });
    portfolioScene.addTo(scrollMagicController);
    portfolioScene.on('enter', function(event) {
      var triggerPortfolioElement = $(event.target.triggerElement());
      var portfolioTimeline = new TimelineLite();
      portfolioTimeline.set(triggerPortfolioElement, {className: "-=notShowing"});
      portfolioTimeline.set(triggerPortfolioElement, {className: "+=animated fadeInUp show"});
    });
  }

  var certScene = new ScrollMagic.Scene({
    triggerElement: "#certifications",
    triggerHook: 'onEnter',
    offset: 50
  });
  certScene.addTo(scrollMagicController);

  var certTimeline = new TimelineLite();

  certScene.on('enter', function() {
    certTimeline.set("#certHeading", {className: "+=animated fadeInUp show"});
    certTimeline.set(".icon-holder", {className: "-=notShowing"}, "+=0.3");
    certTimeline.set(".icon-holder", {className: "+=animated fadeInUpBig show"}, "-=0.05");
  });

  
}

function getWindowStats() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  windowMiddle = windowHeight / 2;
}

$(window).resize(getWindowStats);

$(".navigation a").hover(function(){
	        $(this).next().addClass("hoverActive");
	        }, function(){
	        $(this).next().removeClass("hoverActive");
});

var cards = document.getElementsByClassName("card");
var i;

for (i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    var panelForwards = new TimelineLite();
    var panelReverse = new TimelineLite();
  	var isPanelActive;
  	if (this.classList.contains("experience-active")) {
  		isPanelActive = true;
  	}
  	else {
  		isPanelActive = false;
  	}
  	var activePanels = document.getElementsByClassName("experience-active");
  	if (activePanels.length > 0) {
  		var j;
  		for (j = 0; j < activePanels.length; j++) {
  			var currentPanel = activePanels[j].nextElementSibling;
  			activePanels[j].classList.remove("experience-active");
  			panelReverse.fromTo(currentPanel, 0.2, {maxHeight: currentPanel.scrollHeight}, {maxHeight: 0});
  		}
  	}
  	if (!isPanelActive) {
  		this.classList.toggle("experience-active");
	    var panel = this.nextElementSibling;
	    if (panel.style.maxHeight > 0){
        panelReverse.fromTo(panel, 0.2, {maxHeight: panel.scrollHeight}, {maxHeight: 0});
	    } else {
        panelForwards.fromTo(panel, 0.2, {maxHeight: 0}, {maxHeight: panel.scrollHeight});
	    }
  	} 
  });

}

var navigationTimeline = new TimelineLite();
var y;
var navIcon = document.getElementById("nav-icon");
navIcon.addEventListener("click", function() {
	navHeader.toggleClass("showing");
	navigation.toggleClass("nav-showing")
	hamburgerIcon.toggleClass("clicked");
  	navigationTimeline.set(navigation, {className: "+=animated fadeInUp"}, "-=0.2");
});

